import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Target, Heart, Award, Globe, ArrowLeft } from 'lucide-react';
import styled from 'styled-components';

const AboutContainer = styled.div`
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(102, 126, 234, 0.3);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
`;

const CardDescription = styled.p`
  color: #94a3b8;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StorySection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 3rem;
  margin: 3rem 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StoryContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #e2e8f0;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  .highlight {
    color: #a5b4fc;
    font-weight: 600;
  }
`;

const TeamSection = styled.div`
  text-align: center;
  margin-top: 4rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TeamName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
`;

const TeamRole = styled.p`
  color: #a5b4fc;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const TeamDescription = styled.p`
  color: #94a3b8;
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
          <h1>About NoteNexus</h1>
          <p className="subtitle">
            Revolutionizing how students share knowledge and collaborate in their academic journey. 
            Built by students, for students.
          </p>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Container>
          <SectionTitle>Our Mission</SectionTitle>
          <Grid>
            <Card>
              <CardIcon>
                <Target size={30} />
              </CardIcon>
              <CardTitle>Democratize Education</CardTitle>
              <CardDescription>
                Making quality educational resources accessible to every student, 
                regardless of their background or financial situation.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>
                <Users size={30} />
              </CardIcon>
              <CardTitle>Build Community</CardTitle>
              <CardDescription>
                Creating a supportive ecosystem where students help each other succeed 
                through knowledge sharing and collaboration.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>
                <Award size={30} />
              </CardIcon>
              <CardTitle>Ensure Quality</CardTitle>
              <CardDescription>
                Maintaining high standards for all shared content through community 
                verification and expert review processes.
              </CardDescription>
            </Card>
          </Grid>

          <StorySection>
            <SectionTitle>Our Story</SectionTitle>
            <StoryContent>
              <p>
                NoteNexus was born from a simple observation: <span className="highlight">students were struggling to access quality study materials</span> 
                and often felt isolated in their academic journey. As college students ourselves, we experienced firsthand 
                the challenges of finding reliable notes, understanding complex topics, and preparing for exams.
              </p>
              <p>
                We realized that <span className="highlight">every student has something valuable to contribute</span> - whether it's 
                well-organized lecture notes, creative study guides, or insightful explanations of difficult concepts. 
                The problem wasn't a lack of knowledge, but rather the absence of a platform to connect students 
                and facilitate seamless knowledge sharing.
              </p>
              <p>
                That's when we decided to build NoteNexus - <span className="highlight">a comprehensive platform where students can upload, 
                share, and access educational resources</span> from peers across different universities and courses. 
                Our goal is to create a vibrant academic community where collaboration leads to collective success.
              </p>
              <p>
                Today, NoteNexus serves students from multiple universities, offering a diverse collection of 
                notes, study guides, and educational materials. <span className="highlight">We're not just a file-sharing platform; 
                we're building the future of collaborative learning.</span>
              </p>
            </StoryContent>
          </StorySection>

          <SectionTitle>Core Values</SectionTitle>
          <Grid>
            <Card>
              <CardIcon>
                <Heart size={30} />
              </CardIcon>
              <CardTitle>Student-First</CardTitle>
              <CardDescription>
                Every decision we make prioritizes the needs and success of students. 
                We listen to feedback and continuously improve based on your experiences.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>
                <Globe size={30} />
              </CardIcon>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>
                Knowledge should have no barriers. We're committed to making our platform 
                accessible to students worldwide, regardless of their circumstances.
              </CardDescription>
            </Card>

            <Card>
              <CardIcon>
                <BookOpen size={30} />
              </CardIcon>
              <CardTitle>Academic Integrity</CardTitle>
              <CardDescription>
                We promote ethical learning practices and respect for intellectual property 
                while fostering a culture of honest academic collaboration.
              </CardDescription>
            </Card>
          </Grid>

          <TeamSection>
            <SectionTitle>The Team Behind NoteNexus</SectionTitle>
            <TeamGrid>
              <TeamCard>
                <TeamName>Development Team</TeamName>
                <TeamRole>Full-Stack Developers</TeamRole>
                <TeamDescription>
                  Passionate developers committed to building a robust, scalable platform 
                  that serves the academic community with cutting-edge technology.
                </TeamDescription>
              </TeamCard>

              <TeamCard>
                <TeamName>Student Community</TeamName>
                <TeamRole>Beta Testers & Contributors</TeamRole>
                <TeamDescription>
                  Amazing students from various universities who provide feedback, 
                  test features, and contribute high-quality educational content.
                </TeamDescription>
              </TeamCard>

              <TeamCard>
                <TeamName>Academic Advisors</TeamName>
                <TeamRole>Education Experts</TeamRole>
                <TeamDescription>
                  Experienced educators who guide our content quality standards 
                  and help ensure academic excellence across the platform.
                </TeamDescription>
              </TeamCard>
            </TeamGrid>
          </TeamSection>
        </Container>
      </ContentSection>
    </AboutContainer>
  );
};

export default About;
