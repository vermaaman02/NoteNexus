import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Target, Heart, Award, Globe, ArrowLeft } from 'lucide-react';
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 2rem;
  }
`;

const HeroSection = styled.section`
  padding: 120px 0 80px;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, ${theme.colors.primary}20 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${theme.colors.secondary}20 0%, transparent 50%);
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
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

const Section = styled.section`
  padding: 4rem 0;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 6rem 0;
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

const Grid = styled.div`
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

const Card = styled.div`
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

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${theme.gradients.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${theme.colors.text.primary};
`;

const CardText = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
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
          <HeroContent>
            <Title>About NoteNexus</Title>
            <Subtitle>
              Empowering students worldwide through collaborative learning and knowledge sharing
            </Subtitle>
          </HeroContent>
        </Container>
      </HeroSection>

      <Section>
        <Container>
          <SectionTitle>Our Mission</SectionTitle>
          <SectionSubtitle>
            To create a world where every student has access to quality education resources and can contribute to a global learning community
          </SectionSubtitle>
          
          <Grid>
            <Card>
              <CardIcon>
                <Target size={30} color="white" />
              </CardIcon>
              <CardTitle>Quality Education</CardTitle>
              <CardText>
                We believe in providing high-quality, verified educational content that helps students achieve their academic goals and beyond.
              </CardText>
            </Card>
            
            <Card>
              <CardIcon>
                <Users size={30} color="white" />
              </CardIcon>
              <CardTitle>Community First</CardTitle>
              <CardText>
                Our platform thrives on the collective knowledge and contributions of students, educators, and learners from around the world.
              </CardText>
            </Card>
            
            <Card>
              <CardIcon>
                <Globe size={30} color="white" />
              </CardIcon>
              <CardTitle>Global Access</CardTitle>
              <CardText>
                Breaking down geographical barriers to ensure that quality education resources are accessible to students everywhere.
              </CardText>
            </Card>
          </Grid>
        </Container>
      </Section>

      <Section style={{ backgroundColor: theme.colors.background.secondary }}>
        <Container>
          <SectionTitle>Our Values</SectionTitle>
          
          <Grid>
            <Card>
              <CardIcon>
                <Heart size={30} color="white" />
              </CardIcon>
              <CardTitle>Collaboration</CardTitle>
              <CardText>
                We foster an environment where students help each other succeed through knowledge sharing and mutual support.
              </CardText>
            </Card>
            
            <Card>
              <CardIcon>
                <Award size={30} color="white" />
              </CardIcon>
              <CardTitle>Excellence</CardTitle>
              <CardText>
                We maintain high standards for all content and continuously strive to improve the learning experience for our community.
              </CardText>
            </Card>
            
            <Card>
              <CardIcon>
                <BookOpen size={30} color="white" />
              </CardIcon>
              <CardTitle>Innovation</CardTitle>
              <CardText>
                We leverage cutting-edge technology to create innovative solutions that make learning more engaging and effective.
              </CardText>
            </Card>
          </Grid>
        </Container>
      </Section>
    </AboutContainer>
  );
};

export default About;
