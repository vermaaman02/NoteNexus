import styled from 'styled-components';
import { theme, mediaQueries, commonStyles } from './theme';

// Layout Components
export const Container = styled.div`
  ${commonStyles.container}
`;

export const Grid = styled.div`
  ${commonStyles.gridResponsive}
`;

export const Flex = styled.div`
  ${commonStyles.flexBetween}
`;

export const FlexColumn = styled.div`
  ${commonStyles.flexColumn}
`;

export const FlexCenter = styled.div`
  ${commonStyles.flexCenter}
`;

export const FlexResponsive = styled.div`
  ${commonStyles.flexResponsive}
`;

// Navigation Components
export const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${theme.colors.border.light};
  padding: 1rem 0;
  z-index: ${theme.zIndex.fixed};
`;

export const NavContent = styled.div`
  ${commonStyles.container}
  ${commonStyles.flexBetween}
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${theme.typography.body.mobile};
  font-weight: 700;
  
  ${mediaQueries.md} {
    gap: 12px;
    font-size: ${theme.typography.h4.mobile};
  }
`;

export const LogoIcon = styled.div`
  width: 35px;
  height: 35px;
  background: ${theme.gradients.logoIcon};
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 15px ${theme.colors.primary.main}50;
  
  ${mediaQueries.md} {
    width: 45px;
    height: 45px;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: ${theme.borderRadius.full};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    ${mediaQueries.md} {
      width: 35px;
      height: 35px;
    }
  }
  
  svg {
    width: 18px;
    height: 18px;
    z-index: 10;
    
    ${mediaQueries.md} {
      width: 22px;
      height: 22px;
    }
  }
`;

export const LogoText = styled.span`
  ${commonStyles.gradientText}
  font-weight: 800;
  letter-spacing: -0.5px;
  
  ${mediaQueries.xs} {
    display: none;
  }
`;

export const NavCenter = styled.div`
  display: none;
  gap: 2rem;
  align-items: center;
  
  ${mediaQueries.md} {
    display: flex;
  }
`;

export const NavButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  
  ${mediaQueries.md} {
    gap: 1rem;
  }
`;

// Button Components
export const Button = styled.button`
  ${commonStyles.buttonPrimary}
  padding: 12px 20px;
  font-size: ${theme.typography.small.mobile};
  
  ${mediaQueries.md} {
    padding: 14px 24px;
    font-size: ${theme.typography.body.mobile};
  }
  
  ${mediaQueries.lg} {
    padding: 16px 28px;
    font-size: ${theme.typography.body.desktop};
  }
`;

export const ButtonSecondary = styled.button`
  ${commonStyles.buttonSecondary}
  padding: 12px 20px;
  font-size: ${theme.typography.small.mobile};
  
  ${mediaQueries.md} {
    padding: 14px 24px;
    font-size: ${theme.typography.body.mobile};
  }
  
  ${mediaQueries.lg} {
    padding: 16px 28px;
    font-size: ${theme.typography.body.desktop};
  }
`;

export const ButtonLarge = styled(Button)`
  padding: 14px 28px;
  font-size: ${theme.typography.body.mobile};
  width: 100%;
  justify-content: center;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  ${mediaQueries.sm} {
    width: auto;
    padding: 16px 32px;
    font-size: ${theme.typography.body.desktop};
  }
`;

// Card Components
export const Card = styled.div`
  ${commonStyles.card}
  padding: 1.5rem;
  
  ${mediaQueries.md} {
    padding: 2rem;
  }
  
  ${mediaQueries.lg} {
    padding: 2.5rem;
  }
`;

export const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${theme.gradients.primary};
  border-radius: ${theme.borderRadius.lg};
  ${commonStyles.flexCenter}
  margin-bottom: 1.25rem;
  
  ${mediaQueries.md} {
    width: 80px;
    height: 80px;
    border-radius: ${theme.borderRadius.xl};
    margin-bottom: 1.5rem;
  }
  
  svg {
    width: 30px;
    height: 30px;
    color: ${theme.colors.text.primary};
    
    ${mediaQueries.md} {
      width: 40px;
      height: 40px;
    }
  }
`;

export const CardTitle = styled.h3`
  ${commonStyles.responsiveText(theme.typography.h4)}
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${theme.colors.text.primary};
`;

export const CardDescription = styled.p`
  color: ${theme.colors.text.muted};
  line-height: 1.6;
  ${commonStyles.responsiveText(theme.typography.body)}
`;

// Typography Components
export const Heading1 = styled.h1`
  ${commonStyles.responsiveText(theme.typography.h1)}
  ${commonStyles.gradientText}
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  
  ${mediaQueries.md} {
    margin-bottom: 1.5rem;
  }
`;

export const Heading2 = styled.h2`
  ${commonStyles.responsiveText(theme.typography.h2)}
  ${commonStyles.gradientText}
  font-weight: 800;
  margin-bottom: 1rem;
  
  ${mediaQueries.md} {
    margin-bottom: 1.5rem;
  }
`;

export const Heading3 = styled.h3`
  ${commonStyles.responsiveText(theme.typography.h3)}
  font-weight: 700;
  color: ${theme.colors.text.primary};
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  ${commonStyles.responsiveText(theme.typography.body)}
  color: ${theme.colors.text.muted};
  line-height: 1.6;
  margin-bottom: 2rem;
  
  ${mediaQueries.md} {
    margin-bottom: 3rem;
  }
`;

export const Text = styled.p`
  ${commonStyles.responsiveText(theme.typography.body)}
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

// Section Components
export const Section = styled.section`
  padding: ${theme.spacing.section.mobile} 0;
  
  ${mediaQueries.md} {
    padding: ${theme.spacing.section.tablet} 0;
  }
  
  ${mediaQueries.lg} {
    padding: ${theme.spacing.section.desktop} 0;
  }
`;

export const HeroSection = styled(Section)`
  background: ${theme.gradients.background};
  text-align: center;
  position: relative;
  overflow: hidden;
  padding-top: calc(${theme.spacing.section.mobile} + 80px);
  
  ${mediaQueries.md} {
    padding-top: calc(${theme.spacing.section.tablet} + 80px);
  }
  
  ${mediaQueries.lg} {
    padding-top: calc(${theme.spacing.section.desktop} + 80px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, ${theme.colors.primary.main}20 0%, transparent 70%);
  }
`;

export const ContentSection = styled(Section)`
  background: ${theme.gradients.backgroundAlt};
`;

// Input Components
export const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
  
  ${mediaQueries.md} {
    margin-bottom: 1.5rem;
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${theme.colors.text.secondary};
  margin-bottom: 8px;
  font-size: ${theme.typography.small.mobile};
  
  ${mediaQueries.md} {
    font-size: ${theme.typography.small.desktop};
  }
`;

export const Input = styled.input`
  ${commonStyles.input}
  padding: 14px 14px 14px 44px;
  font-size: ${theme.typography.body.mobile};
  
  ${mediaQueries.md} {
    padding: 16px 16px 16px 48px;
    font-size: ${theme.typography.body.desktop};
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.text.muted};
  z-index: 10;
  transition: color ${theme.transitions.default};
  
  ${mediaQueries.md} {
    left: 16px;
  }
`;

// Form Components
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  
  ${mediaQueries.md} {
    gap: 1.5rem;
  }
`;

export const FormCard = styled(Card)`
  color: ${theme.colors.text.primary};
  max-width: 460px;
  width: 100%;
`;

// Search Components
export const SearchSection = styled.div`
  ${commonStyles.card}
  ${commonStyles.container}
  padding: 1.5rem;
  margin-top: 3rem;
  
  ${mediaQueries.md} {
    padding: 2rem;
    margin-top: 4rem;
  }
`;

export const SearchForm = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-direction: column;
  
  ${mediaQueries.sm} {
    flex-direction: row;
  }
`;

export const SearchInput = styled(Input)`
  flex: 1;
  min-width: 250px;
  padding: 14px 18px;
  
  ${mediaQueries.md} {
    padding: 16px 20px;
  }
`;

export const SearchButton = styled(Button)`
  width: 100%;
  justify-content: center;
  
  ${mediaQueries.sm} {
    width: auto;
  }
`;

// Grid Components for Notes/Items
export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  margin-top: 2rem;
  
  ${mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  ${mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ItemCard = styled(Card)`
  padding: 1.25rem;
  
  ${mediaQueries.md} {
    padding: 1.5rem;
  }
`;

// Stats Components
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  ${mediaQueries.sm} {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    margin-top: 3rem;
    max-width: none;
  }
  
  ${mediaQueries.md} {
    gap: 3rem;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  
  .number {
    font-size: 2rem;
    font-weight: 800;
    ${commonStyles.gradientText}
    margin-bottom: 0.5rem;
    
    ${mediaQueries.md} {
      font-size: 2.5rem;
    }
  }
  
  .label {
    color: ${theme.colors.text.muted};
    font-size: 0.9rem;
    
    ${mediaQueries.md} {
      font-size: 1rem;
    }
  }
`;

// Footer Components
export const Footer = styled.footer`
  background: #0a0a1a;
  padding: 2rem 0 1.5rem;
  margin-top: 3rem;
  border-top: 1px solid ${theme.colors.border.light};
  
  ${mediaQueries.md} {
    padding: 3rem 0 2rem;
    margin-top: 4rem;
  }
`;

export const FooterContent = styled.div`
  ${commonStyles.container}
  text-align: center;
  color: ${theme.colors.text.muted};
  
  p {
    font-size: 0.9rem;
    
    ${mediaQueries.md} {
      font-size: 1rem;
    }
  }
`;

// Utility Components
export const Spacer = styled.div`
  height: ${props => props.size || '1rem'};
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

// Loading Components
export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${theme.colors.text.primary};
  border-top: 2px solid transparent;
  border-radius: ${theme.borderRadius.full};
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default {
  Container,
  Grid,
  Flex,
  FlexColumn,
  FlexCenter,
  FlexResponsive,
  NavContainer,
  NavContent,
  Logo,
  LogoIcon,
  LogoText,
  NavCenter,
  NavButtons,
  Button,
  ButtonSecondary,
  ButtonLarge,
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  Heading1,
  Heading2,
  Heading3,
  Subtitle,
  Text,
  Section,
  HeroSection,
  ContentSection,
  InputGroup,
  Label,
  Input,
  InputIcon,
  Form,
  FormCard,
  SearchSection,
  SearchForm,
  SearchInput,
  SearchButton,
  ItemsGrid,
  ItemCard,
  StatsGrid,
  StatItem,
  Footer,
  FooterContent,
  Spacer,
  VisuallyHidden,
  LoadingSpinner
};
