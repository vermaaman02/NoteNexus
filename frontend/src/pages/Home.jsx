import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BookOpen, ArrowRight, Play, Users, Download, Star, TrendingUp, Shield, Zap, Globe, Award, Heart, Eye, Clock, BookOpenCheck } from 'lucide-react';

// Theme object
const theme = {
  colors: {
    background: {
      primary: '#0f0f23',
      secondary: '#1a1a2e',
      card: '#16213e'
    },
    text: {
      primary: '#ffffff',
      secondary: '#e2e8f0',
      muted: '#94a3b8'
    },
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    accent: '#f59e0b',
    border: '#374151'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
    secondary: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem'
  },
  shadows: {
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  transitions: {
    default: '0.3s ease'
  }
};

// Styled Components
const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${theme.colors.border};
  padding: 1rem 0;
  z-index: 1000;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 2rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 700;
  
  @media (min-width: ${theme.breakpoints.md}) {
    gap: 12px;
    font-size: 1.5rem;
  }
`;

const LogoIcon = styled.div`
  width: 35px;
  height: 35px;
  background: linear-gradient(45deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 50%, #f093fb 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 15px ${theme.colors.primary}50;
  
  @media (min-width: ${theme.breakpoints.md}) {
    width: 45px;
    height: 45px;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    @media (min-width: ${theme.breakpoints.md}) {
      width: 35px;
      height: 35px;
    }
  }
  
  svg {
    width: 18px;
    height: 18px;
    z-index: 10;
    
    @media (min-width: ${theme.breakpoints.md}) {
      width: 22px;
      height: 22px;
    }
  }
`;

const LogoText = styled.span`
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  letter-spacing: -0.5px;
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const NavCenter = styled.div`
  display: none;
  gap: 2rem;
  align-items: center;
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  
  @media (min-width: ${theme.breakpoints.md}) {
    gap: 1rem;
  }
`;

const NavButton = styled(Link)`
  padding: 8px 16px;
  border-radius: ${theme.borderRadius.sm};
  text-decoration: none;
  font-weight: 500;
  transition: all ${theme.transitions.default};
  color: ${theme.colors.text.secondary};
  border: 1px solid transparent;
  
  &:hover {
    color: ${theme.colors.text.primary};
    border-color: ${theme.colors.border};
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 10px 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 2rem;
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 0 3rem;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 2rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: ${theme.colors.background.primary};
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding-top: 100px;
    padding-bottom: 4rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, ${theme.colors.primary}20 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${theme.colors.secondary}20 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, ${theme.colors.accent}10 0%, transparent 50%);
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  width: 100%;
  
  @media (min-width: ${theme.breakpoints.lg}) {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const HeroText = styled.div`
  margin-bottom: 2rem;
  
  @media (min-width: ${theme.breakpoints.lg}) {
    margin-bottom: 0;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, ${theme.colors.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 3.5rem;
    margin-bottom: 2rem;
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${theme.colors.text.secondary};
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 1.25rem;
    margin-bottom: 2.5rem;
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  
  @media (min-width: ${theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  position: relative;
  overflow: hidden;
  font-size: 1rem;
  min-width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.primary {
    background: ${theme.gradients.primary};
    color: ${theme.colors.text.primary};
    box-shadow: ${theme.shadows.lg};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.xl};
    }
  }
  
  &.secondary {
    background: transparent;
    color: ${theme.colors.text.secondary};
    border: 2px solid ${theme.colors.border};
    
    &:hover {
      border-color: ${theme.colors.primary};
      color: ${theme.colors.primary};
    }
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 14px 28px;
    font-size: 1.1rem;
    min-width: 160px;
  }
`;

// Statistics Section
const StatsSection = styled.section`
  padding: 4rem 0;
  background: ${theme.colors.background.secondary};
  border-top: 1px solid ${theme.colors.border};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
  }
`;

const StatCard = styled.div`
  text-align: center;
  
  .number {
    font-size: 2.5rem;
    font-weight: 800;
    background: ${theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
    
    @media (min-width: ${theme.breakpoints.md}) {
      font-size: 3rem;
    }
  }
  
  .label {
    color: ${theme.colors.text.secondary};
    font-size: 0.9rem;
    font-weight: 500;
    
    @media (min-width: ${theme.breakpoints.md}) {
      font-size: 1rem;
    }
  }
`;

// Features Section
const FeaturesSection = styled.section`
  padding: 6rem 0;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 8rem 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: ${theme.colors.text.primary};
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 3rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${theme.colors.text.secondary};
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 1.25rem;
    margin-bottom: 4rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  background: ${theme.colors.background.card};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  padding: 2rem;
  text-align: center;
  transition: all ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary};
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${theme.gradients.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${theme.colors.text.primary};
`;

const FeatureText = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

// Notes Preview Section
const NotesSection = styled.section`
  padding: 6rem 0;
  background: ${theme.colors.background.secondary};
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 8rem 0;
  }
`;

const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const NoteCard = styled.div`
  background: ${theme.colors.background.card};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  transition: all ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primary};
  }
`;

const NoteHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${theme.colors.border};
`;

const NoteTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const NoteSubject = styled.span`
  background: ${theme.colors.primary}30;
  color: ${theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${theme.borderRadius.xl};
  font-size: 0.75rem;
  font-weight: 500;
`;

const NoteContent = styled.div`
  padding: 1.5rem;
`;

const NoteDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const NoteStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: ${theme.colors.text.muted};
`;

const NoteActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem 1rem;
  background: transparent;
  color: ${theme.colors.text.secondary};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.8rem;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
  
  &.primary {
    background: ${theme.gradients.primary};
    color: white;
    border-color: transparent;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.lg};
    }
  }
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  padding: 6rem 0;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 8rem 0;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TestimonialCard = styled.div`
  background: ${theme.colors.background.card};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  padding: 2rem;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-size: 3rem;
    color: ${theme.colors.primary};
    font-weight: bold;
    line-height: 1;
  }
`;

const TestimonialText = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin: 1rem 0;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: ${theme.gradients.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const AuthorInfo = styled.div`
  .name {
    color: ${theme.colors.text.primary};
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .role {
    color: ${theme.colors.text.muted};
    font-size: 0.8rem;
  }
`;

// CTA Section
const CTASection = styled.section`
  padding: 6rem 0;
  background: ${theme.colors.background.secondary};
  text-align: center;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 8rem 0;
  }
`;

const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 3rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.125rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 1.25rem;
    margin-bottom: 3rem;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  
  @media (min-width: ${theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
  }
`;

// Footer
const Footer = styled.footer`
  background: ${theme.colors.background.primary};
  border-top: 1px solid ${theme.colors.border};
  padding: 3rem 0 2rem;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  .copyright {
    color: ${theme.colors.text.muted};
    font-size: 0.9rem;
  }
`;

const Home = () => {
  // Realistic data for a new platform
  const stats = {
    totalNotes: "250+",
    activeUsers: "1,200+", 
    downloads: "5,500+",
    universities: "25+"
  };

  const features = [
    {
      icon: <BookOpen size={30} color="white" />,
      title: "Growing Library",
      description: "Access curated study materials across various subjects. Our collection is growing daily with quality content from students and educators."
    },
    {
      icon: <Users size={30} color="white" />,
      title: "Student Community", 
      description: "Connect with fellow students, share your notes, and collaborate in study groups. Build your academic network."
    },
    {
      icon: <Shield size={30} color="white" />,
      title: "Moderated Content",
      description: "All uploads are reviewed by our team and community to ensure quality and accuracy before being published."
    },
    {
      icon: <Zap size={30} color="white" />,
      title: "Easy Discovery",
      description: "Find relevant study materials quickly with our search and filtering system based on subject, topic, and user ratings."
    },
    {
      icon: <Globe size={30} color="white" />,
      title: "Always Available",
      description: "Access your study materials anytime, anywhere. Download content for offline studying when you need it most."
    },
    {
      icon: <Award size={30} color="white" />,
      title: "Quality Focus",
      description: "We prioritize quality over quantity. Every piece of content is carefully reviewed and rated by the community."
    }
  ];

  const sampleNotes = [
    {
      title: "Introduction to Calculus",
      subject: "Mathematics",
      description: "Basic concepts of limits, derivatives, and integrals with step-by-step examples for beginners.",
      author: "Mathematics Student",
      university: "Local University",
      downloads: 47,
      rating: 4.2,
      pages: 28
    },
    {
      title: "Basic Chemistry Concepts",
      subject: "Chemistry", 
      description: "Fundamental chemistry principles including atomic structure, bonding, and basic reactions.",
      author: "Chemistry Student",
      university: "State University",
      downloads: 63,
      rating: 4.0,
      pages: 35
    },
    {
      title: "Programming Basics - Python",
      subject: "Computer Science",
      description: "Introduction to Python programming with basic syntax, loops, and functions for beginners.",
      author: "CS Student",
      university: "Tech College",
      downloads: 89,
      rating: 4.5,
      pages: 42
    },
    {
      title: "Essay Writing Guide", 
      subject: "English",
      description: "Tips and techniques for writing effective essays including structure, argument development, and citations.",
      author: "English Student", 
      university: "Liberal Arts College",
      downloads: 56,
      rating: 4.1,
      pages: 22
    },
    {
      title: "Basic Economics Principles",
      subject: "Economics",
      description: "Introduction to supply and demand, market structures, and basic economic theories.",
      author: "Economics Student",
      university: "Business School",
      downloads: 38,
      rating: 3.9,
      pages: 31
    },
    {
      title: "Biology Study Guide",
      subject: "Biology",
      description: "Cell structure, basic genetics, and human body systems overview for introductory courses.",
      author: "Biology Student",
      university: "Science College", 
      downloads: 72,
      rating: 4.3,
      pages: 45
    }
  ];

  const testimonials = [
    {
      name: "Alex S.",
      role: "Computer Science Student",
      avatar: "AS",
      text: "As a new platform, NoteNexus is already helping me find study materials I need. The community is supportive and the content quality is good."
    },
    {
      name: "Maria L.", 
      role: "Biology Major",
      avatar: "ML",
      text: "I've shared some of my notes here and received helpful feedback. It's nice to contribute to a growing academic community."
    },
    {
      name: "David K.",
      role: "Math Student", 
      avatar: "DK",
      text: "The platform is user-friendly and I've found some helpful study guides. Looking forward to seeing more content as it grows."
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary 
    }}>
      <NavContainer>
        <NavContent>
          <Logo>
            <LogoIcon>
              <BookOpen size={22} color="white" />
            </LogoIcon>
            <LogoText>NoteNexus</LogoText>
          </Logo>
          
          <NavCenter>
            <NavButton to="/about">About</NavButton>
            <NavButton to="/faq">FAQ</NavButton>
          </NavCenter>
          
          <NavButtons>
            <NavButton to="/login">Login</NavButton>
            <NavButton 
              to="/register" 
              style={{
                background: theme.gradients.primary,
                color: 'white',
                borderColor: 'transparent'
              }}
            >
              Sign Up
            </NavButton>
          </NavButtons>
        </NavContent>
      </NavContainer>

      <HeroSection>
        <Container>
          <HeroContent>
            <HeroText>
              <HeroTitle>Transform Your Study Experience</HeroTitle>
              <HeroSubtitle>
                Join a growing community of students sharing knowledge, collaborating on studies, 
                and supporting each other's academic journey.
              </HeroSubtitle>
              
              <HeroButtons>
                <Button 
                  className="primary" 
                  onClick={() => window.location.href = '/register'}
                >
                  <ArrowRight size={20} style={{ marginRight: '8px' }} />
                  Start Learning Now
                </Button>
                <Button className="secondary">
                  <Play size={20} style={{ marginRight: '8px' }} />
                  Watch Demo
                </Button>
              </HeroButtons>
            </HeroText>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* Statistics Section */}
      <StatsSection>
        <Container>
          <StatsGrid>
            <StatCard>
              <div className="number">{stats.totalNotes}</div>
              <div className="label">Study Materials</div>
            </StatCard>
            <StatCard>
              <div className="number">{stats.activeUsers}</div>
              <div className="label">Active Students</div>
            </StatCard>
            <StatCard>
              <div className="number">{stats.downloads}</div>
              <div className="label">Downloads</div>
            </StatCard>
            <StatCard>
              <div className="number">{stats.universities}</div>
              <div className="label">Universities</div>
            </StatCard>
          </StatsGrid>
        </Container>
      </StatsSection>

      {/* Features Section */}
      <FeaturesSection>
        <Container>
          <SectionTitle>What We Offer</SectionTitle>
          <SectionSubtitle>
            A growing platform focused on building a quality academic community
          </SectionSubtitle>
          
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>
                  {feature.icon}
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureText>{feature.description}</FeatureText>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      {/* Recent Notes Section */}
      <NotesSection>
        <Container>
          <SectionTitle>Recent Study Materials</SectionTitle>
          <SectionSubtitle>
            Browse some of the latest contributions from our student community
          </SectionSubtitle>
          
          <NotesGrid>
            {sampleNotes.map((note, index) => (
              <NoteCard key={index}>
                <NoteHeader>
                  <NoteTitle>{note.title}</NoteTitle>
                  <NoteSubject>{note.subject}</NoteSubject>
                </NoteHeader>
                <NoteContent>
                  <NoteDescription>{note.description}</NoteDescription>
                  <NoteStats>
                    <span><Download size={14} /> {note.downloads.toLocaleString()} downloads</span>
                    <span><Star size={14} /> {note.rating}/5.0</span>
                    <span><BookOpenCheck size={14} /> {note.pages} pages</span>
                  </NoteStats>
                  <NoteActions>
                    <ActionButton>
                      <Eye size={16} />
                      Preview
                    </ActionButton>
                    <ActionButton className="primary">
                      <Download size={16} />
                      Download
                    </ActionButton>
                  </NoteActions>
                </NoteContent>
              </NoteCard>
            ))}
          </NotesGrid>
        </Container>
      </NotesSection>

      {/* Testimonials Section */}
      <TestimonialsSection>
        <Container>
          <SectionTitle>Early User Feedback</SectionTitle>
          <SectionSubtitle>
            What our growing community of students has to say
          </SectionSubtitle>
          
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>
                  <AuthorAvatar>{testimonial.avatar}</AuthorAvatar>
                  <AuthorInfo>
                    <div className="name">{testimonial.name}</div>
                    <div className="role">{testimonial.role}</div>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </Container>
      </TestimonialsSection>

      {/* Call to Action Section */}
      <CTASection>
        <Container>
          <CTAContent>
            <CTATitle>Join Our Growing Community</CTATitle>
            <CTAText>
              Be part of a student community that's building something meaningful together. 
              Share your knowledge and learn from others.
            </CTAText>
            <CTAButtons>
              <Button 
                className="primary"
                onClick={() => window.location.href = '/register'}
                style={{ minWidth: '200px', fontSize: '1.1rem', padding: '16px 32px' }}
              >
                <ArrowRight size={20} style={{ marginRight: '8px' }} />
                Get Started Free
              </Button>
              <Button 
                className="secondary"
                style={{ minWidth: '200px', fontSize: '1.1rem', padding: '16px 32px' }}
              >
                <Heart size={20} style={{ marginRight: '8px' }} />
                Explore Features
              </Button>
            </CTAButtons>
          </CTAContent>
        </Container>
      </CTASection>

      {/* Footer */}
      <Footer>
        <Container>
          <FooterContent>
            <Logo>
              <LogoIcon>
                <BookOpen size={24} color="white" />
              </LogoIcon>
              <LogoText>NoteNexus</LogoText>
            </Logo>
            <div className="copyright">
              © 2025 NoteNexus. A growing platform for student collaboration and knowledge sharing.
            </div>
          </FooterContent>
        </Container>
      </Footer>
    </div>
  );
};

export default Home;
