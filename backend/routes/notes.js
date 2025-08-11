const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const User = require('../models/User');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// @route   POST /api/notes/upload
// @desc    Upload a new note
// @access  Private
router.post('/upload', auth, upload.single('noteFile'), [
  body('title').notEmpty().withMessage('Title is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('course').notEmpty().withMessage('Course is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array().map(err => err.msg).join(', ')
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const { title, subject, course, description, semester, college, tags } = req.body;

    // Provide defaults for optional fields
    const noteData = {
      title: title.trim(),
      subject: subject.trim(),
      course: course.trim(),
      description: description || `Notes for ${subject}`,
      semester: semester ? parseInt(semester) : 1,
      college: college || 'Computer Science Department',
      fileUrl: `/uploads/${req.file.filename}`,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: path.extname(req.file.originalname),
      uploadedBy: req.user._id
    };

    // Parse tags if provided
    let parsedTags = [];
    if (tags) {
      parsedTags = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags;
      noteData.tags = parsedTags;
    }
    // Create new note
    const note = new Note(noteData);

    console.log('Creating note with data:', noteData);
    await note.save();

    // Add note to user's uploaded notes
    await User.findByIdAndUpdate(req.user._id, {
      $push: { notesUploaded: note._id }
    });

    // Populate user info for response
    await note.populate('uploadedBy', 'name email college course');

    res.status(201).json({
      message: 'Note uploaded successfully',
      note
    });
  } catch (error) {
    console.error('Note upload error:', error);
    console.error('Request body:', req.body);
    console.error('Request file:', req.file);
    console.error('User:', req.user?._id);
    
    // Delete uploaded file if note creation fails
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (fileError) {
        console.error('Error deleting file:', fileError);
      }
    }
    
    // Send specific error message
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
    
    res.status(500).json({ 
      message: 'Server error during note upload',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// @route   GET /api/notes
// @desc    Get all notes with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      course,
      semester,
      subject,
      college,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isApproved: true, isPublic: true };

    if (course) filter.course = new RegExp(course, 'i');
    if (semester) filter.semester = parseInt(semester);
    if (subject) filter.subject = new RegExp(subject, 'i');
    if (college) filter.college = new RegExp(college, 'i');

    // Search in title, description, and tags
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') },
        { subject: new RegExp(search, 'i') }
      ];
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const notes = await Note.find(filter)
      .populate('uploadedBy', 'name college course')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Note.countDocuments(filter);

    res.json({
      notes,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        hasNext: parseInt(page) < Math.ceil(total / parseInt(limit)),
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ message: 'Server error while fetching notes' });
  }
});

// @route   GET /api/notes/:id
// @desc    Get single note by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('uploadedBy', 'name email college course semester');

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ note });
  } catch (error) {
    console.error('Get note error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid note ID' });
    }
    res.status(500).json({ message: 'Server error while fetching note' });
  }
});

// @route   POST /api/notes/:id/download
// @desc    Download a note and increment download count
// @access  Public
router.post('/:id/download', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Increment download count
    note.downloads += 1;
    await note.save();

    // Get file path
    const filePath = path.join(__dirname, '..', note.fileUrl);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.json({
      message: 'Download count updated',
      downloadUrl: note.fileUrl,
      fileName: note.fileName
    });
  } catch (error) {
    console.error('Download note error:', error);
    res.status(500).json({ message: 'Server error during download' });
  }
});

// @route   POST /api/notes/:id/like
// @desc    Like/unlike a note
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const userIndex = note.likes.indexOf(req.user._id);

    if (userIndex > -1) {
      // Unlike
      note.likes.splice(userIndex, 1);
      await note.save();
      res.json({ message: 'Note unliked', liked: false, likesCount: note.likes.length });
    } else {
      // Like
      note.likes.push(req.user._id);
      await note.save();
      res.json({ message: 'Note liked', liked: true, likesCount: note.likes.length });
    }
  } catch (error) {
    console.error('Like note error:', error);
    res.status(500).json({ message: 'Server error while liking note' });
  }
});

// @route   GET /api/notes/my/uploads
// @desc    Get current user's uploaded notes
// @access  Private
router.get('/my/uploads', auth, async (req, res) => {
  try {
    const notes = await Note.find({ uploadedBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'name college course');

    res.json({ notes });
  } catch (error) {
    console.error('Get user notes error:', error);
    res.status(500).json({ message: 'Server error while fetching user notes' });
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note (only by uploader)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if user is the uploader
    if (note.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', note.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Note.findByIdAndDelete(req.params.id);

    // Remove from user's uploaded notes
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { notesUploaded: req.params.id }
    });

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ message: 'Server error while deleting note' });
  }
});

module.exports = router;
