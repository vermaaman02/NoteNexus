import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesService } from '../services/api.js';
import { Upload, FileText, X } from 'lucide-react';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const UploadContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const UploadCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &.error {
    border-color: #ef4444;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &.error {
    border-color: #ef4444;
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &.error {
    border-color: #ef4444;
  }
`;

const FileUploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;

  &:hover {
    border-color: #667eea;
    background-color: #f8fafc;
  }

  &.drag-over {
    border-color: #667eea;
    background-color: #ede9fe;
  }

  &.has-file {
    border-color: #10b981;
    background-color: #ecfdf5;
  }

  &.error {
    border-color: #ef4444;
    background-color: #fef2f2;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UploadIconContainer = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  background: #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const FileInfo = styled.div`
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FileDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .file-icon {
    color: #667eea;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fee2e2;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const UploadPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    course: ''
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const navigate = useNavigate();

  // Computer Science subjects
  const csSubjects = [
    'Data Structures and Algorithms',
    'Database Management Systems',
    'Operating Systems',
    'Computer Networks',
    'Software Engineering',
    'Object Oriented Programming',
    'Web Development',
    'Machine Learning',
    'Artificial Intelligence',
    'Computer Graphics',
    'Cyber Security',
    'Cloud Computing',
    'Mobile App Development',
    'Compiler Design',
    'Theory of Computation',
    'Discrete Mathematics',
    'Computer Architecture',
    'Human Computer Interaction',
    'Data Mining',
    'Internet of Things (IoT)',
    'Blockchain Technology',
    'Digital Image Processing',
    'Natural Language Processing',
    'Distributed Systems',
    'Information Systems'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileSelect = (selectedFile) => {
    const allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.txt', '.jpg', '.jpeg', '.png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!selectedFile) return;

    const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      setErrors(prev => ({ ...prev, file: 'Please select a valid file type (PDF, DOC, DOCX, PPT, PPTX, TXT, or image files)' }));
      return;
    }

    if (selectedFile.size > maxSize) {
      setErrors(prev => ({ ...prev, file: 'File size must be less than 10MB' }));
      return;
    }

    setFile(selectedFile);
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const removeFile = () => {
    setFile(null);
    setErrors(prev => ({ ...prev, file: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!file) newErrors.file = 'Please select a file to upload';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const uploadData = new FormData();
      
      // Append form data
      uploadData.append('title', formData.title);
      uploadData.append('subject', formData.subject);
      uploadData.append('course', formData.course);
      
      // Add default values for required backend fields
      uploadData.append('description', `Notes for ${formData.subject}`);
      uploadData.append('semester', '1');
      uploadData.append('college', 'Computer Science Department');
      
      // Append file
      uploadData.append('noteFile', file);

      await notesService.uploadNote(uploadData);
      
      toast.success('Note uploaded successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Upload error:', error);
      console.error('Upload error response:', error.response?.data);
      
      let errorMessage = 'Failed to upload note. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        errorMessage = error.response.data.errors;
      } else if (error.response?.status === 401) {
        errorMessage = 'Please login again to upload notes';
      } else if (error.response?.status === 413) {
        errorMessage = 'File size too large. Please use a smaller file (max 10MB)';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UploadContainer>
      <Container>
        <UploadCard>
          <Title>Upload New Note</Title>
          
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Title *</Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter note title"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Subject *</Label>
              <Select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={errors.subject ? 'error' : ''}
              >
                <option value="">Select Subject</option>
                {csSubjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </Select>
              {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Course *</Label>
              <Select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className={errors.course ? 'error' : ''}
              >
                <option value="">Select Course</option>
                <option value="Bachelor of Computer Science">Bachelor of Computer Science</option>
                <option value="Bachelor of Technology (Computer Science)">Bachelor of Technology (Computer Science)</option>
                <option value="Master of Computer Science">Master of Computer Science</option>
                <option value="Master of Technology (Computer Science)">Master of Technology (Computer Science)</option>
                <option value="Bachelor of Computer Applications">Bachelor of Computer Applications</option>
                <option value="Master of Computer Applications">Master of Computer Applications</option>
                <option value="Diploma in Computer Science">Diploma in Computer Science</option>
                <option value="PhD in Computer Science">PhD in Computer Science</option>
              </Select>
              {errors.course && <ErrorMessage>{errors.course}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Upload File *</Label>
              <FileUploadArea
                className={`${dragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''} ${errors.file ? 'error' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
              >
                <FileInput
                  id="file-input"
                  type="file"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                />
                
                {file ? (
                  <FileInfo>
                    <FileDetails>
                      <FileText className="file-icon" size={20} />
                      <div>
                        <div>{file.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#666' }}>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </FileDetails>
                    <RemoveButton type="button" onClick={(e) => { e.stopPropagation(); removeFile(); }}>
                      <X size={16} />
                    </RemoveButton>
                  </FileInfo>
                ) : (
                  <>
                    <UploadIconContainer>
                      <Upload size={48} />
                    </UploadIconContainer>
                    <h3>Click to upload or drag and drop</h3>
                    <p>PDF, DOC, DOCX, PPT, PPTX, TXT, or image files (max 10MB)</p>
                  </>
                )}
              </FileUploadArea>
              {errors.file && <ErrorMessage>{errors.file}</ErrorMessage>}
            </FormGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Uploading...' : 'Upload Note'}
            </SubmitButton>
          </Form>
        </UploadCard>
      </Container>
    </UploadContainer>
  );
};

export default UploadPage;
