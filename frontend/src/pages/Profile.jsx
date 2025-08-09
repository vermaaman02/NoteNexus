import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { userService } from '../services/api.js';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Building, 
  Calendar,
  Edit3,
  Save,
  X,
  FileText,
  Download,
  Heart,
  Bookmark
} from 'lucide-react';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px 16px 0 0;
  text-align: center;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 2.5rem;
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ProfileEmail = styled.p`
  opacity: 0.9;
  font-size: 1.1rem;
`;

const ProfileContent = styled.div`
  background: white;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
`;

const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  color: ${props => props.active ? '#667eea' : '#666'};
  border-bottom: 2px solid ${props => props.active ? '#667eea' : 'transparent'};

  &:hover {
    background: #f9fafb;
  }
`;

const TabContent = styled.div`
  padding: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border-left: 4px solid #667eea;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ProfileForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

  &:disabled {
    background: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
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

  &:disabled {
    background: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  grid-column: 1 / -1;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.primary {
    background: #667eea;
    color: white;

    &:hover {
      background: #5a6fd8;
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const NotesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NoteItem = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #667eea;
`;

const NoteTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const NoteInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;

  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }
`;

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    notesUploaded: 0,
    notesSaved: 0,
    totalDownloads: 0,
    totalLikes: 0
  });
  const [savedNotes, setSavedNotes] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    college: user?.college || '',
    course: user?.course || '',
    semester: user?.semester || ''
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const [statsResponse, savedNotesResponse] = await Promise.all([
        userService.getStats(),
        userService.getSavedNotes()
      ]);

      setStats(statsResponse.data.stats);
      setSavedNotes(savedNotesResponse.data.notes);
    } catch (error) {
      toast.error('Failed to load profile data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await userService.updateProfile(formData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || '',
      college: user?.college || '',
      course: user?.course || '',
      semester: user?.semester || ''
    });
    setIsEditing(false);
  };

  const renderProfileTab = () => (
    <div>
      <StatsGrid>
        <StatCard>
          <StatNumber>{stats.notesUploaded}</StatNumber>
          <StatLabel>Notes Uploaded</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.totalDownloads}</StatNumber>
          <StatLabel>Total Downloads</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.totalLikes}</StatNumber>
          <StatLabel>Total Likes</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>{stats.notesSaved}</StatNumber>
          <StatLabel>Notes Saved</StatLabel>
        </StatCard>
      </StatsGrid>

      <ProfileForm onSubmit={handleSaveProfile}>
        <FormGroup>
          <Label>
            <User size={18} />
            Full Name
          </Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            <Mail size={18} />
            Email
          </Label>
          <Input
            type="email"
            value={user?.email || ''}
            disabled
          />
        </FormGroup>

        <FormGroup>
          <Label>
            <Building size={18} />
            College/University
          </Label>
          <Input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            <GraduationCap size={18} />
            Course/Program
          </Label>
          <Input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            <Calendar size={18} />
            Semester
          </Label>
          <Select
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="">Select Semester</option>
            {[1,2,3,4,5,6,7,8].map(sem => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </Select>
        </FormGroup>

        <ButtonGroup>
          {!isEditing ? (
            <Button className="primary" type="button" onClick={() => setIsEditing(true)}>
              <Edit3 size={18} />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button className="primary" type="submit" disabled={loading}>
                <Save size={18} />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button className="secondary" type="button" onClick={handleCancelEdit}>
                <X size={18} />
                Cancel
              </Button>
            </>
          )}
        </ButtonGroup>
      </ProfileForm>
    </div>
  );

  const renderSavedNotesTab = () => (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Saved Notes</h2>
      {savedNotes.length > 0 ? (
        <NotesList>
          {savedNotes.map((note) => (
            <NoteItem key={note._id}>
              <NoteTitle>{note.title}</NoteTitle>
              <p style={{ color: '#666', margin: '0.5rem 0' }}>{note.subject}</p>
              <NoteInfo>
                <span>By {note.uploadedBy?.name}</span>
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
              </NoteInfo>
            </NoteItem>
          ))}
        </NotesList>
      ) : (
        <EmptyState>
          <h3>No saved notes yet</h3>
          <p>Notes you save will appear here for easy access</p>
        </EmptyState>
      )}
    </div>
  );

  return (
    <ProfileContainer>
      <Container>
        <ProfileHeader>
          <Avatar>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
          <ProfileName>{user?.name}</ProfileName>
          <ProfileEmail>{user?.email}</ProfileEmail>
        </ProfileHeader>

        <ProfileContent>
          <TabContainer>
            <Tab 
              active={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')}
            >
              Profile Information
            </Tab>
            <Tab 
              active={activeTab === 'saved'} 
              onClick={() => setActiveTab('saved')}
            >
              Saved Notes
            </Tab>
          </TabContainer>

          <TabContent>
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'saved' && renderSavedNotesTab()}
          </TabContent>
        </ProfileContent>
      </Container>
    </ProfileContainer>
  );
};

export default Profile;
