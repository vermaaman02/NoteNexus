import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { notesService, userService } from '../services/api.js';
import { 
  Upload, 
  FileText, 
  Download, 
  Heart, 
  Bookmark, 
  TrendingUp, 
  Calendar,
  Eye,
  Trash2
} from 'lucide-react';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
`;

const WelcomeContent = styled.div`
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    opacity: 0.9;
    font-size: 1.1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  &.uploads {
    background: #10b981;
  }

  &.downloads {
    background: #3b82f6;
  }

  &.likes {
    background: #ef4444;
  }

  &.saved {
    background: #8b5cf6;
  }
`;

const StatInfo = styled.div`
  h3 {
    font-size: 2rem;
    margin: 0;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ActionCard = styled(Link)`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 0.5rem 0;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const ActionIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;

  &.upload {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &.browse {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
`;

const NotesSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const NoteCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  transition: border-color 0.3s;

  &:hover {
    border-color: #667eea;
  }
`;

const NoteTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
`;

const NoteSubject = styled.div`
  color: #667eea;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const NoteMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #666;
`;

const NoteActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: background-color 0.3s;

  &.view {
    background: #e0e7ff;
    color: #667eea;

    &:hover {
      background: #c7d2fe;
    }
  }

  &.delete {
    background: #fee2e2;
    color: #ef4444;

    &:hover {
      background: #fecaca;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;

  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    margin-bottom: 1rem;
  }
`;

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    notesUploaded: 0,
    notesSaved: 0,
    totalDownloads: 0,
    totalLikes: 0
  });
  const [recentNotes, setRecentNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsResponse, notesResponse] = await Promise.all([
        userService.getStats(),
        notesService.getUserNotes()
      ]);

      setStats(statsResponse.data.stats);
      setRecentNotes(notesResponse.data.notes.slice(0, 6)); // Show only recent 6
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId, noteTitle) => {
    if (window.confirm(`Are you sure you want to delete "${noteTitle}"?`)) {
      try {
        await notesService.deleteNote(noteId);
        toast.success('Note deleted successfully');
        fetchDashboardData(); // Refresh data
      } catch (error) {
        toast.error('Failed to delete note');
      }
    }
  };

  if (loading) {
    return (
      <DashboardContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            Loading dashboard...
          </div>
        </Container>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Container>
        <WelcomeSection>
          <WelcomeContent>
            <h1>Welcome back, {user?.name}!</h1>
            <p>Here's what's happening with your notes today.</p>
          </WelcomeContent>
        </WelcomeSection>

        <StatsGrid>
          <StatCard>
            <StatIcon className="uploads">
              <FileText size={24} />
            </StatIcon>
            <StatInfo>
              <h3>{stats.notesUploaded}</h3>
              <p>Notes Uploaded</p>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon className="downloads">
              <Download size={24} />
            </StatIcon>
            <StatInfo>
              <h3>{stats.totalDownloads}</h3>
              <p>Total Downloads</p>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon className="likes">
              <Heart size={24} />
            </StatIcon>
            <StatInfo>
              <h3>{stats.totalLikes}</h3>
              <p>Total Likes</p>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon className="saved">
              <Bookmark size={24} />
            </StatIcon>
            <StatInfo>
              <h3>{stats.notesSaved}</h3>
              <p>Notes Saved</p>
            </StatInfo>
          </StatCard>
        </StatsGrid>

        <QuickActions>
          <ActionCard to="/upload">
            <ActionIcon className="upload">
              <Upload size={24} />
            </ActionIcon>
            <h3>Upload Notes</h3>
            <p>Share your notes with fellow students</p>
          </ActionCard>

          <ActionCard to="/">
            <ActionIcon className="browse">
              <Eye size={24} />
            </ActionIcon>
            <h3>Browse Notes</h3>
            <p>Discover notes from other students</p>
          </ActionCard>
        </QuickActions>

        <NotesSection>
          <SectionTitle>
            <TrendingUp size={20} />
            Your Recent Uploads
          </SectionTitle>

          {recentNotes.length > 0 ? (
            <NotesGrid>
              {recentNotes.map((note) => (
                <NoteCard key={note._id}>
                  <NoteTitle>{note.title}</NoteTitle>
                  <NoteSubject>{note.subject}</NoteSubject>
                  <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                    {note.description.length > 100 
                      ? `${note.description.substring(0, 100)}...` 
                      : note.description
                    }
                  </p>
                  <NoteMeta>
                    <div>
                      <Calendar size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                      {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      {note.downloads} downloads • {note.likes?.length || 0} likes
                    </div>
                  </NoteMeta>
                  <NoteActions>
                    <Link to={`/note/${note._id}`}>
                      <ActionButton className="view">
                        <Eye size={14} />
                        View
                      </ActionButton>
                    </Link>
                    <ActionButton 
                      className="delete"
                      onClick={() => handleDeleteNote(note._id, note.title)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </ActionButton>
                  </NoteActions>
                </NoteCard>
              ))}
            </NotesGrid>
          ) : (
            <EmptyState>
              <h3>No notes uploaded yet</h3>
              <p>Start sharing your knowledge with fellow students!</p>
              <Link to="/upload">
                <ActionButton style={{ background: '#667eea', color: 'white', padding: '0.75rem 1.5rem' }}>
                  <Upload size={16} />
                  Upload Your First Note
                </ActionButton>
              </Link>
            </EmptyState>
          )}
        </NotesSection>
      </Container>
    </DashboardContainer>
  );
};

export default Dashboard;
