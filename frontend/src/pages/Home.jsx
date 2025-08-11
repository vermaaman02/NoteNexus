import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { notesService } from '../services/api';
import { Search, Download, Eye, BookOpen, Users, Star, Upload, Shield, Globe, ArrowRight, Play, CheckCircle } from 'lucide-react';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: #0f0f23;
  color: white;
  font-family: 'Inter', sans-serif;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 0;
  z-index: 1000;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
`;

const LogoIcon = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    width: 35px;
    height: 35px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const LogoText = styled.span`
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  letter-spacing: -0.5px;
`;

const NavCenter = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: white;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavButton = styled(Link)`
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
  }
  
  &.secondary {
    color: #e2e8f0;
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }
  }
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%);
  position: relative;
  padding: 120px 0 80px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  position: relative;
  z-index: 10;

  h1 {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.1;
  }

  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #94a3b8;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    .subtitle {
      font-size: 1.2rem;
    }
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const StatsSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    gap: 2rem;
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  .number {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }
  
  .label {
    color: #94a3b8;
    font-size: 1rem;
  }
`;

const FeaturesSection = styled.div`
  padding: 100px 0;
  background: linear-gradient(135deg, #1a1a3e 0%, #0f0f23 100%);
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.25rem;
  color: #94a3b8;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(102, 126, 234, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
`;

const FeatureDescription = styled.p`
  color: #94a3b8;
  line-height: 1.6;
  font-size: 1rem;
`;

const SearchSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  margin-top: 4rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
`;

const SearchTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: white;
`;

const SearchForm = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }
`;

const SearchButton = styled.button`
  padding: 16px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`;

const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const NoteCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(102, 126, 234, 0.4);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const NoteTitle = styled.h4`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const NoteDetails = styled.div`
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const NoteTag = styled.span`
  background: rgba(102, 126, 234, 0.2);
  color: #a5b4fc;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const NoteActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(102, 126, 234, 0.3);
    border-color: rgba(102, 126, 234, 0.5);
  }
`;

const Footer = styled.footer`
  background: #0a0a1a;
  padding: 3rem 0 2rem;
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  color: #94a3b8;
`;

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalNotes: 0,
    totalUsers: 0,
    totalDownloads: 0,
    activeToday: 0
  });

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await notesService.getAllNotes({ page: 1, limit: 6 });
      setNotes(response.data.notes);
      
      // Calculate real statistics from the data
      const totalNotes = response.data.pagination?.total || notes.length;
      const totalDownloads = notes.reduce((sum, note) => sum + (note.downloads || 0), 0);
      const uniqueUploaders = new Set(notes.map(note => note.uploadedBy?._id)).size;
      
      setStats({
        totalNotes,
        totalUsers: uniqueUploaders,
        totalDownloads,
        activeToday: notes.filter(note => {
          const today = new Date().toDateString();
          const noteDate = new Date(note.createdAt).toDateString();
          return today === noteDate;
        }).length
      });
    } catch (error) {
      toast.error('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleSearch = () => {
    // Redirect to login for full search functionality
  };

  const handleDownload = async (noteId, fileName) => {
    toast.info('Please sign in to download notes');
  };

  return (
    <HomeContainer>
      <Navbar>
        <NavContent>
          <Logo>
            <LogoIcon>
              <BookOpen size={22} color="white" />
            </LogoIcon>
            <LogoText>NoteNexus</LogoText>
          </Logo>
          
          <NavCenter>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
          </NavCenter>
          
          <NavButtons>
            <NavButton to="/login" className="secondary">Login</NavButton>
            <NavButton to="/register" className="primary">Sign Up</NavButton>
          </NavButtons>
        </NavContent>
      </Navbar>

      <HeroSection>
        <HeroContent>
          <h1>Transform Your Study Experience</h1>
          <p className="subtitle">
            Join thousands of students sharing knowledge, accessing premium notes, 
            and achieving academic excellence together.
          </p>
          
          <HeroButtons>
            <PrimaryButton to="/register">
              <ArrowRight size={20} />
              Start Learning Now
            </PrimaryButton>
            <SecondaryButton>
              <Play size={20} />
              Watch Demo
            </SecondaryButton>
          </HeroButtons>

          <StatsSection>
            <StatItem>
              <div className="number">{stats.totalNotes}</div>
              <div className="label">Notes Available</div>
            </StatItem>
            <StatItem>
              <div className="number">{stats.totalUsers}</div>
              <div className="label">Contributors</div>
            </StatItem>
            <StatItem>
              <div className="number">{stats.totalDownloads}</div>
              <div className="label">Downloads</div>
            </StatItem>
            <StatItem>
              <div className="number">{stats.activeToday}</div>
              <div className="label">Added Today</div>
            </StatItem>
          </StatsSection>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Why Choose NoteNexus?</SectionTitle>
        <SectionSubtitle>
          Experience the most comprehensive platform for academic collaboration and success
        </SectionSubtitle>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <Users size={40} />
            </FeatureIcon>
            <FeatureTitle>Collaborative Community</FeatureTitle>
            <FeatureDescription>
              Connect with thousands of students worldwide. Share knowledge, 
              exchange ideas, and build lasting academic relationships.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Shield size={40} />
            </FeatureIcon>
            <FeatureTitle>Quality Assured</FeatureTitle>
            <FeatureDescription>
              All notes are verified by our expert team. Access only high-quality, 
              accurate, and comprehensive study materials.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Globe size={40} />
            </FeatureIcon>
            <FeatureTitle>Global Access</FeatureTitle>
            <FeatureDescription>
              Access your notes from anywhere, anytime. Sync across devices 
              and never miss an important study session.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Upload size={40} />
            </FeatureIcon>
            <FeatureTitle>Easy Upload</FeatureTitle>
            <FeatureDescription>
              Upload your notes in seconds. Support for multiple file formats 
              including PDF, Word, PowerPoint, and images.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Star size={40} />
            </FeatureIcon>
            <FeatureTitle>Premium Features</FeatureTitle>
            <FeatureDescription>
              Advanced search, bookmarking, offline access, and AI-powered 
              study recommendations to boost your performance.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <CheckCircle size={40} />
            </FeatureIcon>
            <FeatureTitle>Verified Content</FeatureTitle>
            <FeatureDescription>
              All content is reviewed and verified. Get access to notes from 
              top-performing students and expert contributors.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>

        <SearchSection>
          <SearchTitle>Explore Available Notes</SearchTitle>
          <SearchForm>
            <SearchInput
              type="text"
              placeholder="Search notes by title, subject, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <SearchButton onClick={handleSearch}>
              <Search size={18} />
              Search
            </SearchButton>
          </SearchForm>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
              <div style={{ fontSize: '1.2rem' }}>Loading amazing notes...</div>
            </div>
          ) : (
            <NotesGrid>
              {notes.slice(0, 6).map((note) => (
                <NoteCard key={note._id}>
                  <NoteTitle>{note.title}</NoteTitle>
                  <NoteDetails>
                    <NoteTag>{note.course}</NoteTag>
                    <NoteTag>Semester {note.semester}</NoteTag>
                    <NoteTag>{note.subject}</NoteTag>
                  </NoteDetails>
                  <FeatureDescription style={{ marginBottom: '1rem' }}>
                    {note.description.substring(0, 100)}...
                  </FeatureDescription>
                  <NoteActions>
                    <ActionButton onClick={() => handleDownload(note._id, note.fileName)}>
                      <Download size={16} />
                      Download
                    </ActionButton>
                    <ActionButton>
                      <Eye size={16} />
                      Preview
                    </ActionButton>
                  </NoteActions>
                </NoteCard>
              ))}
            </NotesGrid>
          )}

          {notes.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <PrimaryButton to="/login">
                View All Notes
                <ArrowRight size={20} />
              </PrimaryButton>
            </div>
          )}
        </SearchSection>
      </FeaturesSection>

      <Footer>
        <FooterContent>
          <Logo style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            <LogoIcon>
              <BookOpen size={22} color="white" />
            </LogoIcon>
            <LogoText>NoteNexus</LogoText>
          </Logo>
          <p>© 2025 NoteNexus. Empowering students worldwide through collaborative learning.</p>
        </FooterContent>
      </Footer>
    </HomeContainer>
  );
};

export default Home;
