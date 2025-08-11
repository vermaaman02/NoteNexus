import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronDown, ChevronUp, ArrowLeft, HelpCircle, Users, Shield, Download, Upload, Search, Star } from 'lucide-react';
import styled from 'styled-components';

const FAQContainer = styled.div`
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

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  color: #e2e8f0;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%);
  padding: 120px 0 80px;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.1;
  }

  .subtitle {
    font-size: 1.25rem;
    color: #94a3b8;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
  }
`;

const ContentSection = styled.div`
  padding: 80px 0;
  background: linear-gradient(135deg, #1a1a3e 0%, #0f0f23 100%);
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const CategoryCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    border-color: rgba(102, 126, 234, 0.3);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  &.active {
    border-color: rgba(102, 126, 234, 0.5);
    background: rgba(102, 126, 234, 0.1);
  }
`;

const CategoryIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
`;

const CategoryCount = styled.p`
  color: #94a3b8;
  font-size: 0.9rem;
`;

const FAQSection = styled.div`
  margin-top: 2rem;
`;

const FAQItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(102, 126, 234, 0.3);
  }
`;

const FAQQuestion = styled.div`
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const QuestionText = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0;
  flex: 1;
`;

const FAQAnswer = styled.div`
  padding: 0 1.5rem 1.5rem;
  color: #94a3b8;
  line-height: 1.6;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    margin-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  .highlight {
    color: #a5b4fc;
    font-weight: 600;
  }
`;

const faqData = {
  general: [
    {
      question: "What is NoteNexus?",
      answer: "NoteNexus is a comprehensive note-sharing platform designed specifically for college students. It allows you to upload, share, and access high-quality study materials from students across different universities and courses. Our platform fosters academic collaboration and helps students succeed together."
    },
    {
      question: "Is NoteNexus free to use?",
      answer: "Yes! NoteNexus is completely free for all students. You can upload notes, download materials, and access all platform features without any charges. Our mission is to democratize education by making quality study resources accessible to everyone."
    },
    {
      question: "Do I need to register to use NoteNexus?",
      answer: "While you can browse available notes without an account, <span class='highlight'>registration is required to upload notes, download materials, and access advanced features</span> like bookmarking, personalized recommendations, and community interactions."
    },
    {
      question: "Which universities and courses are supported?",
      answer: "NoteNexus supports students from all universities and academic institutions worldwide. Our platform covers a wide range of subjects including Engineering, Computer Science, Business, Medicine, Arts, Sciences, and many more. We continuously expand our course coverage based on community needs."
    }
  ],
  upload: [
    {
      question: "How do I upload my notes?",
      answer: "Uploading notes is simple: <ol><li>Sign in to your account</li><li>Click the 'Upload' button in the navigation</li><li>Fill in the note details (title, subject, course, semester)</li><li>Add a description and select your file</li><li>Click 'Upload' to share with the community</li></ol> Your notes will be available immediately after upload."
    },
    {
      question: "What file formats are supported?",
      answer: "We support various file formats to accommodate different types of study materials: <ul><li><span class='highlight'>PDF</span> - Most commonly used for notes and documents</li><li><span class='highlight'>DOC/DOCX</span> - Microsoft Word documents</li><li><span class='highlight'>PPT/PPTX</span> - PowerPoint presentations</li><li><span class='highlight'>JPG/PNG</span> - Images of handwritten notes</li><li><span class='highlight'>TXT</span> - Plain text files</li></ul>"
    },
    {
      question: "Is there a file size limit?",
      answer: "Yes, to ensure optimal performance for all users, we have a <span class='highlight'>maximum file size limit of 50MB per upload</span>. This accommodates most study materials while maintaining fast download speeds. If your file is larger, consider compressing it or splitting it into smaller sections."
    },
    {
      question: "Can I edit or delete my uploaded notes?",
      answer: "Absolutely! You have full control over your uploaded content. You can edit note details, update descriptions, and delete notes from your dashboard at any time. However, <span class='highlight'>we recommend being thoughtful about deletions</span> as other students might be depending on your materials."
    }
  ],
  download: [
    {
      question: "How do I download notes?",
      answer: "Downloading is straightforward: <ol><li>Browse or search for the notes you need</li><li>Click on the note title to view details</li><li>Click the 'Download' button</li><li>The file will be saved to your device</li></ol> All downloads are tracked to help identify popular and useful content."
    },
    {
      question: "Do I need to credit the original author?",
      answer: "While not mandatory, <span class='highlight'>we strongly encourage giving credit to original authors</span> when using their notes for presentations or further sharing. This promotes a respectful academic community and encourages more students to contribute quality content."
    },
    {
      question: "Can I download notes for offline use?",
      answer: "Yes! Once you download notes, they're saved to your device and can be accessed offline. This is perfect for studying in areas with limited internet connectivity or when you want to focus without distractions."
    },
    {
      question: "Is there a download limit?",
      answer: "Currently, there are no download limits for registered users. You can download as many notes as you need for your studies. We believe in unlimited access to educational resources to support your academic success."
    }
  ],
  quality: [
    {
      question: "How do you ensure note quality?",
      answer: "We maintain quality through multiple measures: <ul><li><span class='highlight'>Community ratings</span> - Users can rate and review notes</li><li><span class='highlight'>Peer verification</span> - Notes are reviewed by other students</li><li><span class='highlight'>Expert moderation</span> - Academic advisors review flagged content</li><li><span class='highlight'>Upload guidelines</span> - Clear standards for content quality</li></ul>"
    },
    {
      question: "What if I find incorrect or poor-quality notes?",
      answer: "We have a robust reporting system: <ul><li>Use the 'Report' button on any note</li><li>Select the issue type (accuracy, quality, inappropriate content)</li><li>Our moderation team reviews reports within 24 hours</li><li>Corrective actions are taken based on community feedback</li></ul> Your reports help maintain platform quality for everyone."
    },
    {
      question: "Can I rate and review notes?",
      answer: "Yes! Rating and reviewing notes is encouraged as it helps other students find the best materials. You can: <ul><li>Give star ratings (1-5 stars)</li><li>Write detailed reviews about usefulness</li><li>Suggest improvements to authors</li><li>Bookmark notes for future reference</li></ul>"
    },
    {
      question: "Are there any content guidelines?",
      answer: "Yes, we have clear content guidelines to maintain academic integrity: <ul><li>Notes must be original or properly attributed</li><li>No copyrighted material without permission</li><li>Content should be educational and relevant</li><li>Respectful language and professional presentation</li><li>No exam questions or answer keys</li></ul>"
    }
  ],
  account: [
    {
      question: "How do I create an account?",
      answer: "Creating an account is quick and easy: <ol><li>Click 'Sign Up' in the navigation</li><li>Provide your email and create a password</li><li>Fill in your profile information (name, university, course)</li><li>Verify your email address</li><li>Start uploading and downloading notes!</li></ol> Your account gives you access to all platform features."
    },
    {
      question: "Can I change my profile information?",
      answer: "Absolutely! You can update your profile anytime by going to your account settings. You can change your name, university, course, profile picture, and other details. <span class='highlight'>Keeping your profile updated helps us provide better recommendations</span> and connect you with relevant content."
    },
    {
      question: "Is my personal information secure?",
      answer: "Security is our top priority. We implement industry-standard security measures: <ul><li>Encrypted data transmission (HTTPS)</li><li>Secure password hashing</li><li>Regular security audits</li><li>Privacy-first approach - minimal data collection</li><li>No sharing of personal information with third parties</li></ul>"
    },
    {
      question: "How do I reset my password?",
      answer: "If you forget your password: <ol><li>Go to the login page</li><li>Click 'Forgot Password'</li><li>Enter your registered email address</li><li>Check your email for reset instructions</li><li>Follow the link to create a new password</li></ol> If you don't receive the email, check your spam folder or contact support."
    }
  ],
  technical: [
    {
      question: "What browsers are supported?",
      answer: "NoteNexus works on all modern web browsers: <ul><li><span class='highlight'>Chrome</span> (recommended)</li><li><span class='highlight'>Firefox</span></li><li><span class='highlight'>Safari</span></li><li><span class='highlight'>Edge</span></li><li><span class='highlight'>Opera</span></li></ul> We recommend keeping your browser updated for the best experience."
    },
    {
      question: "Can I use NoteNexus on mobile devices?",
      answer: "Yes! NoteNexus is fully responsive and works great on mobile devices and tablets. You can browse, search, and download notes on any device. While uploading is possible on mobile, we recommend using a desktop for the best upload experience."
    },
    {
      question: "Why is my upload/download slow?",
      answer: "Speed can be affected by several factors: <ul><li>File size - larger files take longer</li><li>Internet connection speed</li><li>Server load during peak hours</li><li>Browser performance</li></ul> Try refreshing the page, checking your connection, or attempting the action during off-peak hours."
    },
    {
      question: "Who can I contact for technical support?",
      answer: "If you experience technical issues: <ul><li>Check our FAQ section first</li><li>Try refreshing your browser</li><li>Clear browser cache and cookies</li><li>Contact our support team through the platform</li><li>Report bugs through the feedback system</li></ul> We typically respond to support requests within 24 hours."
    }
  ]
};

const categoryInfo = {
  general: { icon: HelpCircle, title: "General", count: "4 questions" },
  upload: { icon: Upload, title: "Uploading Notes", count: "4 questions" },
  download: { icon: Download, title: "Downloading", count: "4 questions" },
  quality: { icon: Star, title: "Quality & Safety", count: "4 questions" },
  account: { icon: Users, title: "Account & Profile", count: "4 questions" },
  technical: { icon: Shield, title: "Technical Support", count: "4 questions" }
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState({});

  const toggleFAQ = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <FAQContainer>
      <Navbar>
        <NavContent>
          <Logo>
            <LogoIcon>
              <BookOpen size={22} color="white" />
            </LogoIcon>
            <LogoText>NoteNexus</LogoText>
          </Logo>
          <BackButton to="/">
            <ArrowLeft size={18} />
            Back to Home
          </BackButton>
        </NavContent>
      </Navbar>

      <HeroSection>
        <HeroContent>
          <h1>Frequently Asked Questions</h1>
          <p className="subtitle">
            Find answers to common questions about using NoteNexus. 
            Can't find what you're looking for? Contact our support team!
          </p>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Container>
          <CategoryGrid>
            {Object.entries(categoryInfo).map(([key, info]) => {
              const IconComponent = info.icon;
              return (
                <CategoryCard
                  key={key}
                  className={activeCategory === key ? 'active' : ''}
                  onClick={() => setActiveCategory(key)}
                >
                  <CategoryIcon>
                    <IconComponent size={24} />
                  </CategoryIcon>
                  <CategoryTitle>{info.title}</CategoryTitle>
                  <CategoryCount>{info.count}</CategoryCount>
                </CategoryCard>
              );
            })}
          </CategoryGrid>

          <FAQSection>
            {faqData[activeCategory]?.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion onClick={() => toggleFAQ(index)}>
                  <QuestionText>{faq.question}</QuestionText>
                  {openItems[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </FAQQuestion>
                {openItems[index] && (
                  <FAQAnswer>
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </FAQAnswer>
                )}
              </FAQItem>
            ))}
          </FAQSection>
        </Container>
      </ContentSection>
    </FAQContainer>
  );
};

export default FAQ;
