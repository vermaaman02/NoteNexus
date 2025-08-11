import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ArrowLeft, Share, Download, Heart } from 'lucide-react';
import styled from 'styled-components';

// Responsive theme system
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

const AboutContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.primary};
  color: ${theme.colors.text.primary};
  font-family: 'Inter', sans-serif;
`;

const Navbar = styled.nav`
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
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${theme.gradients.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  padding: 8px 16px;
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.default};
  
  &:hover {
    color: ${theme.colors.text.primary};
    background: rgba(255, 255, 255, 0.05);
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 2rem;
  }
`;

const HeroSection = styled.section`
  padding: 120px 0 80px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: ${theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 4rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const ContentSection = styled.section`
  padding: 2rem 0 4rem;
`;

const ContentCard = styled.div`
  background: ${theme.colors.background.card};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${theme.colors.text.primary};
`;

const Text = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  background: ${theme.colors.background.card};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: 1.5rem;
  text-align: center;
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${theme.gradients.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${theme.colors.text.primary};
`;

const FeatureText = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const About = () => {
  return (
    <AboutContainer>
      <Navbar>
        <NavContent>
          <Logo>
            <LogoIcon>
              <BookOpen size={24} color="white" />
            </LogoIcon>
            NoteNexus
          </Logo>
          <BackButton to="/">
            <ArrowLeft size={20} />
            Back to Home
          </BackButton>
        </NavContent>
      </Navbar>

      <HeroSection>
        <Container>
          <Title>About NoteNexus</Title>
          <Subtitle>
            A simple platform where students can share and discover study materials
          </Subtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <ContentCard>
            <SectionTitle>What is NoteNexus?</SectionTitle>
            <Text>
              NoteNexus is a growing online platform designed for students who want to share their study materials 
              and learn from others. We believe that knowledge sharing makes education better for everyone.
            </Text>
            <Text>
              Whether you're looking for notes on a specific topic or want to help other students by sharing 
              your own materials, NoteNexus provides a simple and organized way to do it.
            </Text>
          </ContentCard>

          <ContentCard>
            <SectionTitle>Our Mission</SectionTitle>
            <Text>
              To create a supportive community where students can easily share knowledge, collaborate on studies, 
              and help each other succeed academically. We focus on building a platform that's simple to use 
              and genuinely helpful for students.
            </Text>
          </ContentCard>

          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>
                <Share size={24} color="white" />
              </FeatureIcon>
              <FeatureTitle>Share Knowledge</FeatureTitle>
              <FeatureText>
                Upload your study notes and help fellow students learn from your work.
              </FeatureText>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <Download size={24} color="white" />
              </FeatureIcon>
              <FeatureTitle>Access Materials</FeatureTitle>
              <FeatureText>
                Download study materials shared by other students across various subjects.
              </FeatureText>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <Heart size={24} color="white" />
              </FeatureIcon>
              <FeatureTitle>Support Community</FeatureTitle>
              <FeatureText>
                Be part of a growing community that values collaboration and mutual support.
              </FeatureText>
            </FeatureCard>
          </FeatureGrid>
        </Container>
      </ContentSection>
    </AboutContainer>
  );
};

export default About;
