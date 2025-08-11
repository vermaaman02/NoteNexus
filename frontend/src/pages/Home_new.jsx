import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BookOpen, ArrowRight, Play } from 'lucide-react';

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
  
  @media (min-width: ${theme.breakpoints.lg}) {
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
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
    margin-left: 0;
    margin-right: 0;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  
  @media (min-width: ${theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    justify-content: flex-start;
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

const Home = () => {
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
                Join thousands of students sharing knowledge, accessing premium notes, 
                and achieving academic excellence together.
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
    </div>
  );
};

export default Home;
