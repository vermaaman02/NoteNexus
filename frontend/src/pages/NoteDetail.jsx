import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { notesService, userService } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  Download, 
  Heart, 
  Bookmark, 
  Calendar, 
  User, 
  FileText, 
  Tag,
  ArrowLeft,
  Share2
} from 'lucide-react';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const DetailContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  margin-bottom: 2rem;
  font-size: 1rem;
  transition: color 0.3s;

  &:hover {
    color: #5a6fd8;
  }
`;

const NoteCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const NoteHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
`;

const NoteTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const NoteSubject = styled.div`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 1rem;
`;

const HeaderMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  opacity: 0.9;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const NoteContent = styled.div`
  padding: 2rem;
`;

const Description = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 2rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoCard = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #667eea;
`;

const InfoTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoContent = styled.div`
  color: #666;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const TagChip = styled.span`
  background: #e0e7ff;
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  
  &.download {
    background: #10b981;
    color: white;

    &:hover {
      background: #059669;
      transform: translateY(-2px);
    }
  }

  &.like {
    background: ${props => props.liked ? '#ef4444' : '#fee2e2'};
    color: ${props => props.liked ? 'white' : '#ef4444'};

    &:hover {
      background: #ef4444;
      color: white;
      transform: translateY(-2px);
    }
  }

  &.save {
    background: ${props => props.saved ? '#8b5cf6' : '#ede9fe'};
    color: ${props => props.saved ? 'white' : '#8b5cf6'};

    &:hover {
      background: #8b5cf6;
      color: white;
      transform: translateY(-2px);
    }
  }

  &.share {
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
      transform: translateY(-2px);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const UploaderInfo = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1rem;
`;

const UploaderTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UploaderDetails = styled.div`
  color: #666;
  
  p {
    margin-bottom: 0.5rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.1rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ef4444;
  
  h2 {
    margin-bottom: 1rem;
  }
`;

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const fetchNoteDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notesService.getNoteById(id);
      const noteData = response.data.note;
      setNote(noteData);
      setLikesCount(noteData.likes?.length || 0);
      
      if (isAuthenticated && user) {
        setLiked(noteData.likes?.includes(user.id) || false);
        // Check if note is saved (would need additional API call)
      }
    } catch (error) {
      setError('Failed to load note details');
    } finally {
      setLoading(false);
    }
  }, [id, isAuthenticated, user]);

  useEffect(() => {
    fetchNoteDetails();
  }, [fetchNoteDetails]);

  const handleDownload = async () => {
    try {
      const response = await notesService.downloadNote(note._id);
      
      // Create download link
      const link = document.createElement('a');
      link.href = `http://localhost:5000${response.data.downloadUrl}`;
      link.download = response.data.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Download started!');
      
      // Update download count in UI
      setNote(prev => ({
        ...prev,
        downloads: prev.downloads + 1
      }));
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to like notes');
      return;
    }

    try {
      const response = await notesService.likeNote(note._id);
      setLiked(response.data.liked);
      setLikesCount(response.data.likesCount);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Failed to like note');
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to save notes');
      return;
    }

    try {
      const response = await userService.saveNote(note._id);
      setSaved(response.data.saved);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Failed to save note');
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  };

  if (loading) {
    return (
      <DetailContainer>
        <Container>
          <LoadingContainer>
            Loading note details...
          </LoadingContainer>
        </Container>
      </DetailContainer>
    );
  }

  if (error || !note) {
    return (
      <DetailContainer>
        <Container>
          <ErrorContainer>
            <h2>Error</h2>
            <p>{error || 'Note not found'}</p>
            <ActionButton onClick={() => navigate('/')} style={{ marginTop: '1rem' }}>
              Go Back Home
            </ActionButton>
          </ErrorContainer>
        </Container>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <Container>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </BackButton>

        <NoteCard>
          <NoteHeader>
            <NoteTitle>{note.title}</NoteTitle>
            <NoteSubject>{note.subject}</NoteSubject>
            <HeaderMeta>
              <MetaItem>
                <Calendar size={16} />
                {new Date(note.createdAt).toLocaleDateString()}
              </MetaItem>
              <MetaItem>
                <FileText size={16} />
                {note.fileName}
              </MetaItem>
              <MetaItem>
                <Download size={16} />
                {note.downloads} downloads
              </MetaItem>
              <MetaItem>
                <Heart size={16} />
                {likesCount} likes
              </MetaItem>
            </HeaderMeta>
          </NoteHeader>

          <NoteContent>
            <Description>
              {note.description}
            </Description>

            <InfoGrid>
              <InfoCard>
                <InfoTitle>
                  <FileText size={18} />
                  Course Details
                </InfoTitle>
                <InfoContent>
                  <p><strong>Course:</strong> {note.course}</p>
                  <p><strong>Semester:</strong> {note.semester}</p>
                  <p><strong>College:</strong> {note.college}</p>
                </InfoContent>
              </InfoCard>

              <InfoCard>
                <InfoTitle>
                  <FileText size={18} />
                  File Information
                </InfoTitle>
                <InfoContent>
                  <p><strong>File Name:</strong> {note.fileName}</p>
                  <p><strong>File Type:</strong> {note.fileType}</p>
                  <p><strong>File Size:</strong> {(note.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                </InfoContent>
              </InfoCard>
            </InfoGrid>

            {note.tags && note.tags.length > 0 && (
              <div>
                <h3 style={{ marginBottom: '1rem', color: '#333' }}>Tags</h3>
                <TagsContainer>
                  {note.tags.map((tag, index) => (
                    <TagChip key={index}>
                      <Tag size={14} />
                      {tag}
                    </TagChip>
                  ))}
                </TagsContainer>
              </div>
            )}

            <UploaderInfo>
              <UploaderTitle>
                <User size={18} />
                Uploaded by
              </UploaderTitle>
              <UploaderDetails>
                <p><strong>Name:</strong> {note.uploadedBy?.name}</p>
                <p><strong>College:</strong> {note.uploadedBy?.college}</p>
                <p><strong>Course:</strong> {note.uploadedBy?.course}</p>
              </UploaderDetails>
            </UploaderInfo>
          </NoteContent>

          <ActionsContainer>
            <ActionButton className="download" onClick={handleDownload}>
              <Download size={18} />
              Download Note
            </ActionButton>

            <ActionButton 
              className="like" 
              liked={liked} 
              onClick={handleLike}
            >
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
              {liked ? 'Liked' : 'Like'} ({likesCount})
            </ActionButton>

            <ActionButton 
              className="save" 
              saved={saved} 
              onClick={handleSave}
            >
              <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'Saved' : 'Save'}
            </ActionButton>

            <ActionButton className="share" onClick={handleShare}>
              <Share2 size={18} />
              Share
            </ActionButton>
          </ActionsContainer>
        </NoteCard>
      </Container>
    </DetailContainer>
  );
};

export default NoteDetail;
