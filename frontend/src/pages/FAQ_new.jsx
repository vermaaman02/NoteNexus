import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
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

const FAQContainer = styled.div`
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

const FAQSection = styled.section`
  padding: 2rem 0 4rem;
`;

const FAQItem = styled.div`
  background: ${theme.colors.background.card};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all ${theme.transitions.default};
  
  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  color: ${theme.colors.text.primary};
  font-size: 1.125rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all ${theme.transitions.default};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 2rem;
    font-size: 1.25rem;
  }
`;

const FAQAnswer = styled.div`
  padding: 0 1.5rem 1.5rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  transition: all ${theme.transitions.default};
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 2rem 2rem;
    font-size: 1.125rem;
  }
`;

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "What is NoteNexus?",
      answer: "NoteNexus is a collaborative learning platform where students can share and access high-quality study materials, notes, and educational resources across various subjects and academic levels."
    },
    {
      question: "How do I create an account?",
      answer: "Simply click on the 'Sign Up' button on our homepage, fill in your details including your name, email, and password, and you'll be ready to start exploring our vast library of educational content."
    },
    {
      question: "Is NoteNexus free to use?",
      answer: "Yes! NoteNexus offers a comprehensive free tier that allows you to access thousands of notes and study materials. We also offer premium features for enhanced functionality and exclusive content."
    },
    {
      question: "How can I upload my own notes?",
      answer: "After creating an account and logging in, navigate to the 'Upload' section where you can easily share your notes with the community. All uploads are reviewed to ensure quality and accuracy."
    },
    {
      question: "What file formats are supported?",
      answer: "We support various file formats including PDF, DOCX, PPTX, and images (JPG, PNG). All files are processed to ensure optimal viewing and downloading experience for all users."
    },
    {
      question: "How do I search for specific topics?",
      answer: "Use our advanced search feature to find notes by subject, topic, university, or keywords. You can also filter results by file type, upload date, and user ratings to find exactly what you need."
    },
    {
      question: "Can I download notes for offline use?",
      answer: "Absolutely! All notes on NoteNexus can be downloaded for offline studying. Simply click the download button on any note, and it will be saved to your device for convenient access anytime."
    },
    {
      question: "How do you ensure content quality?",
      answer: "We have a dedicated review team that verifies all uploaded content. Additionally, our community rating system helps identify the most helpful and accurate materials, ensuring you get the best study resources."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take privacy seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent, and you have full control over your privacy settings."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach our support team through the contact form on our website, send us an email at support@notenexus.com, or use the live chat feature available on our platform during business hours."
    }
  ];

  return (
    <FAQContainer>
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
            <Title>Frequently Asked Questions</Title>
            <Subtitle>
              Find answers to common questions about NoteNexus and how to make the most of our platform
            </Subtitle>
          </HeroContent>
        </Container>
      </HeroSection>

      <FAQSection>
        <Container>
          {faqData.map((faq, index) => (
            <FAQItem key={index}>
              <FAQQuestion onClick={() => toggleItem(index)}>
                {faq.question}
                {openItems.has(index) ? 
                  <ChevronUp size={24} color={theme.colors.primary} /> : 
                  <ChevronDown size={24} color={theme.colors.text.secondary} />
                }
              </FAQQuestion>
              {openItems.has(index) && (
                <FAQAnswer>
                  {faq.answer}
                </FAQAnswer>
              )}
            </FAQItem>
          ))}
        </Container>
      </FAQSection>
    </FAQContainer>
  );
};

export default FAQ;
