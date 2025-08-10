import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Mail, Lock, Eye, EyeOff, BookOpen, Users, Download, Star } from 'lucide-react';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  font-family: 'Inter', sans-serif;
`;

const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  
  @media (max-width: 768px) {
    flex: none;
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  max-width: 480px;
  z-index: 10;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
`;

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 48px;
  line-height: 1.5;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

const FeatureDescription = styled.p`
  opacity: 0.8;
  font-size: 1rem;
`;

const LoginCard = styled.div`
  background: white;
  padding: 48px;
  border-radius: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(226, 232, 240, 0.8);
  width: 100%;
  max-width: 460px;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const LoginTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 8px;
`;

const LoginSubtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  font-size: 14px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  z-index: 10;
  transition: color 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
  font-family: 'Inter', sans-serif;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }

  &:focus + ${InputIcon} {
    color: #667eea;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #a0aec0;
  transition: color 0.3s ease;

  &:hover {
    color: #667eea;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 16px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.25);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px 0 rgba(102, 126, 234, 0.35);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 24px;
  color: #6b7280;
  font-size: 16px;

  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;

    &:hover {
      color: #5a67d8;
    }
  }
`;

const MobileFeatures = styled.div`
  display: none;
  margin-top: 32px;
  gap: 16px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const MobileFeature = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Login successful! Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LeftPanel>
        <ContentWrapper>
          <Logo>
            <LogoIcon>
              <BookOpen size={24} />
            </LogoIcon>
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>NoteNexus</span>
          </Logo>
          
          <Title>Welcome to NoteNexus</Title>
          <Subtitle>
            The ultimate platform for college students to share, discover, and access study notes.
          </Subtitle>
          
          <FeatureList>
            <Feature>
              <FeatureIcon>
                <Users size={28} />
              </FeatureIcon>
              <FeatureContent>
                <FeatureTitle>Collaborative Learning</FeatureTitle>
                <FeatureDescription>Share notes with fellow students and build a community of learners</FeatureDescription>
              </FeatureContent>
            </Feature>
            
            <Feature>
              <FeatureIcon>
                <Download size={28} />
              </FeatureIcon>
              <FeatureContent>
                <FeatureTitle>Easy Access</FeatureTitle>
                <FeatureDescription>Download and access notes anytime, anywhere from any device</FeatureDescription>
              </FeatureContent>
            </Feature>
            
            <Feature>
              <FeatureIcon>
                <Star size={28} />
              </FeatureIcon>
              <FeatureContent>
                <FeatureTitle>Quality Content</FeatureTitle>
                <FeatureDescription>Curated notes from top students across various subjects</FeatureDescription>
              </FeatureContent>
            </Feature>
          </FeatureList>
        </ContentWrapper>
      </LeftPanel>

      <RightPanel>
        <div>
          <LoginCard>
            <LoginHeader>
              <LoginTitle>Sign In</LoginTitle>
              <LoginSubtitle>Welcome back! Please sign in to your account</LoginSubtitle>
            </LoginHeader>

            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Label>Email Address</Label>
                <InputWrapper>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                  <InputIcon>
                    <Mail size={20} />
                  </InputIcon>
                </InputWrapper>
              </InputGroup>

              <InputGroup>
                <Label>Password</Label>
                <InputWrapper>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <InputIcon>
                    <Lock size={20} />
                  </InputIcon>
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </PasswordToggle>
                </InputWrapper>
              </InputGroup>

              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LoadingSpinner />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </SubmitButton>
            </Form>

            <LinkText>
              Don't have an account?{' '}
              <Link to="/register">Create one here</Link>
            </LinkText>
          </LoginCard>

          <MobileFeatures>
            <MobileFeature>
              <Users style={{ color: '#667eea' }} size={24} />
              <div>
                <div style={{ fontWeight: 600 }}>Collaborative Learning</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>Share notes with students</div>
              </div>
            </MobileFeature>
            
            <MobileFeature>
              <Download style={{ color: '#667eea' }} size={24} />
              <div>
                <div style={{ fontWeight: 600 }}>Easy Access</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>Download anytime, anywhere</div>
              </div>
            </MobileFeature>
          </MobileFeatures>
        </div>
      </RightPanel>
    </LoginContainer>
  );
};

export default Login;
