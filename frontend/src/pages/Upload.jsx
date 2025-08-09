import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesService } from '../services/api.js';
import { Upload as UploadIcon, FileText, X, Plus } from 'lucide-react';
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

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
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

const UploadIcon_ = styled.div`
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

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  background: #e0e7ff;
  color: #667eea;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TagInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  flex: 1;
`;

const AddTagButton = styled.button`
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    background: #5a6fd8;
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

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    course: '',
    semester: '',
    college: ''
  });
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const navigate = useNavigate();

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

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags(prev => [...prev, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.semester) newErrors.semester = 'Semester is required';
    if (!formData.college.trim()) newErrors.college = 'College is required';
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
      Object.keys(formData).forEach(key => {
        uploadData.append(key, formData[key]);
      });
      
      // Append file
      uploadData.append('noteFile', file);
      
      // Append tags
      if (tags.length > 0) {
        uploadData.append('tags', tags.join(','));
      }

      await notesService.uploadNote(uploadData);
      
      toast.success('Note uploaded successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload note');
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
              <Label>Description *</Label>
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what this note covers"
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
            </FormGroup>

            <Row>
              <FormGroup>
                <Label>Subject *</Label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g., Mathematics, Physics"
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Course *</Label>
                <Input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                  className={errors.course ? 'error' : ''}
                />
                {errors.course && <ErrorMessage>{errors.course}</ErrorMessage>}
              </FormGroup>
            </Row>

            <Row>
              <FormGroup>
                <Label>Semester *</Label>
                <Select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className={errors.semester ? 'error' : ''}
                >
                  <option value="">Select Semester</option>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </Select>
                {errors.semester && <ErrorMessage>{errors.semester}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>College *</Label>
                <Input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  placeholder="College/University name"
                  className={errors.college ? 'error' : ''}
                />
                {errors.college && <ErrorMessage>{errors.college}</ErrorMessage>}
              </FormGroup>
            </Row>

            <FormGroup>
              <Label>Tags (Optional)</Label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <TagInput
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <AddTagButton type="button" onClick={addTag}>
                  <Plus size={16} />
                  Add
                </AddTagButton>
              </div>
              <TagsContainer>
                {tags.map((tag, index) => (
                  <Tag key={index}>
                    {tag}
                    <X size={14} style={{ cursor: 'pointer' }} onClick={() => removeTag(tag)} />
                  </Tag>
                ))}
              </TagsContainer>
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
                    <UploadIcon_>
                      <UploadIcon size={24} />
                    </UploadIcon_>
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

export default Upload;
