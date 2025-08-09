const express = require('express');
const User = require('../models/User');
const Note = require('../models/Note');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('notesUploaded', 'title subject createdAt downloads likes')
      .populate('notesSaved', 'title subject createdAt uploadedBy');

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, college, course, semester } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (college) updateData.college = college;
    if (course) updateData.course = course;
    if (semester) updateData.semester = semester;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
});

// @route   POST /api/users/save-note/:noteId
// @desc    Save/unsave a note
// @access  Private
router.post('/save-note/:noteId', auth, async (req, res) => {
  try {
    const { noteId } = req.params;

    // Check if note exists
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const user = await User.findById(req.user._id);
    const noteIndex = user.notesSaved.indexOf(noteId);

    if (noteIndex > -1) {
      // Unsave note
      user.notesSaved.splice(noteIndex, 1);
      await user.save();
      res.json({ message: 'Note removed from saved list', saved: false });
    } else {
      // Save note
      user.notesSaved.push(noteId);
      await user.save();
      res.json({ message: 'Note saved successfully', saved: true });
    }
  } catch (error) {
    console.error('Save note error:', error);
    res.status(500).json({ message: 'Server error while saving note' });
  }
});

// @route   GET /api/users/saved-notes
// @desc    Get user's saved notes
// @access  Private
router.get('/saved-notes', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'notesSaved',
        populate: {
          path: 'uploadedBy',
          select: 'name college course'
        }
      });

    res.json({ notes: user.notesSaved });
  } catch (error) {
    console.error('Get saved notes error:', error);
    res.status(500).json({ message: 'Server error while fetching saved notes' });
  }
});

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Get upload stats
    const uploadedNotesCount = user.notesUploaded.length;
    const savedNotesCount = user.notesSaved.length;
    
    // Get total downloads for user's notes
    const userNotes = await Note.find({ uploadedBy: req.user._id });
    const totalDownloads = userNotes.reduce((sum, note) => sum + note.downloads, 0);
    
    // Get total likes for user's notes
    const totalLikes = userNotes.reduce((sum, note) => sum + note.likes.length, 0);

    res.json({
      stats: {
        notesUploaded: uploadedNotesCount,
        notesSaved: savedNotesCount,
        totalDownloads,
        totalLikes,
        memberSince: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error while fetching stats' });
  }
});

module.exports = router;
