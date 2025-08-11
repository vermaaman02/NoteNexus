// Comprehensive theme system for NoteNexus
export const theme = {
  // Colors - Bold and attractive theme with Blue 600 and Purple 500
  colors: {
    primary: {
      main: '#1976D2', // Blue 600
      light: '#42A5F5', // Blue 400
      dark: '#0D47A1' // Blue 900
    },
    secondary: {
      main: '#9C27B0', // Purple 500
      light: '#BA68C8', // Purple 300
      dark: '#7B1FA2' // Purple 700
    },
    accent: {
      main: '#f093fb',
      light: '#fbb6ce',
      dark: '#ed64a6'
    },
    background: {
      primary: '#0f0f23',
      secondary: '#1a1a3e',
      tertiary: '#2d1b69',
      card: 'rgba(255, 255, 255, 0.05)',
      cardHover: 'rgba(255, 255, 255, 0.08)'
    },
    text: {
      primary: '#ffffff',
      secondary: '#e2e8f0',
      muted: '#94a3b8',
      disabled: '#64748b'
    },
    border: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.2)',
      focus: '#1976D2'
    }
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #1976D2 0%, #9C27B0 100%)',
    secondary: 'linear-gradient(135deg, #BA68C8 0%, #42A5F5 100%)',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%)',
    backgroundAlt: 'linear-gradient(135deg, #1a1a3e 0%, #0f0f23 100%)',
    text: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    logoIcon: 'linear-gradient(45deg, #1976D2 0%, #9C27B0 50%, #BA68C8 100%)'
  },

  // Typography
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    h1: {
      mobile: '2.25rem',
      tablet: '3rem',
      desktop: '3.5rem',
      xl: '4rem'
    },
    h2: {
      mobile: '2rem',
      tablet: '2.5rem',
      desktop: '2.75rem',
      xl: '3rem'
    },
    h3: {
      mobile: '1.5rem',
      tablet: '1.75rem',
      desktop: '2rem'
    },
    h4: {
      mobile: '1.25rem',
      tablet: '1.375rem',
      desktop: '1.5rem'
    },
    body: {
      mobile: '0.95rem',
      tablet: '1rem',
      desktop: '1rem'
    },
    small: {
      mobile: '0.85rem',
      tablet: '0.9rem',
      desktop: '0.9rem'
    }
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
    section: {
      mobile: '3rem',
      tablet: '4rem',
      desktop: '5rem'
    },
    container: {
      mobile: '1rem',
      tablet: '1.5rem',
      desktop: '2rem'
    }
  },

  // Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    default: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    primary: '0 8px 25px rgba(25, 118, 210, 0.3)',
    primaryHover: '0 12px 40px rgba(25, 118, 210, 0.4)',
    card: '0 20px 40px rgba(0, 0, 0, 0.3)'
  },

  // Border radius
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    full: '50%'
  },

  // Transitions
  transitions: {
    fast: '0.15s ease',
    default: '0.3s ease',
    slow: '0.45s ease',
    bounce: '0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  // Z-index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  }
};

// Media query helpers
export const mediaQueries = {
  xs: `@media (max-width: ${theme.breakpoints.sm})`,
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`,
  xxl: `@media (min-width: ${theme.breakpoints.xxl})`,
  mobile: `@media (max-width: ${theme.breakpoints.md})`,
  tablet: `@media (min-width: ${theme.breakpoints.md}) and (max-width: ${theme.breakpoints.lg})`,
  desktop: `@media (min-width: ${theme.breakpoints.lg})`
};

// Common component styles
export const commonStyles = {
  // Container
  container: `
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.container.mobile};
    
    ${mediaQueries.md} {
      padding: 0 ${theme.spacing.container.tablet};
    }
    
    ${mediaQueries.lg} {
      padding: 0 ${theme.spacing.container.desktop};
    }
  `,

  // Grid systems
  gridResponsive: `
    display: grid;
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    
    ${mediaQueries.sm} {
      grid-template-columns: repeat(2, 1fr);
    }
    
    ${mediaQueries.lg} {
      grid-template-columns: repeat(3, 1fr);
      gap: ${theme.spacing.xl};
    }
  `,

  // Flex utilities
  flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  flexBetween: `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  flexColumn: `
    display: flex;
    flex-direction: column;
  `,

  flexResponsive: `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
    
    ${mediaQueries.md} {
      flex-direction: row;
      gap: ${theme.spacing.lg};
    }
  `,

  // Card styles
  card: `
    background: ${theme.colors.background.card};
    border: 1px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.xl};
    backdrop-filter: blur(20px);
    transition: all ${theme.transitions.default};
    
    &:hover {
      transform: translateY(-5px);
      border-color: ${theme.colors.primary.main}40;
      box-shadow: ${theme.shadows.card};
    }
  `,

  // Button styles
  buttonPrimary: `
    background: ${theme.gradients.primary};
    border: none;
    color: ${theme.colors.text.primary};
    border-radius: ${theme.borderRadius.md};
    font-weight: 600;
    cursor: pointer;
    transition: all ${theme.transitions.bounce};
    box-shadow: ${theme.shadows.primary};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.primaryHover};
    }
    
    &:active {
      transform: translateY(0);
    }
  `,

  buttonSecondary: `
    background: ${theme.colors.background.card};
    border: 1px solid ${theme.colors.border.medium};
    color: ${theme.colors.text.secondary};
    border-radius: ${theme.borderRadius.md};
    font-weight: 500;
    cursor: pointer;
    transition: all ${theme.transitions.default};
    
    &:hover {
      background: ${theme.colors.background.cardHover};
      color: ${theme.colors.text.primary};
    }
  `,

  // Input styles
  input: `
    width: 100%;
    border: 2px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.md};
    background: ${theme.colors.background.card};
    color: ${theme.colors.text.primary};
    font-family: ${theme.typography.fontFamily};
    transition: all ${theme.transitions.default};
    
    &::placeholder {
      color: ${theme.colors.text.disabled};
    }
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.border.focus};
      box-shadow: 0 0 0 3px ${theme.colors.primary.main}20;
      transform: translateY(-1px);
      background: ${theme.colors.background.cardHover};
    }
  `,

  // Typography helpers
  gradientText: `
    background: ${theme.gradients.text};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `,

  // Responsive typography
  responsiveText: (sizes) => `
    font-size: ${sizes.mobile};
    
    ${mediaQueries.md} {
      font-size: ${sizes.tablet || sizes.mobile};
    }
    
    ${mediaQueries.lg} {
      font-size: ${sizes.desktop || sizes.tablet || sizes.mobile};
    }
    
    ${mediaQueries.xl} {
      font-size: ${sizes.xl || sizes.desktop || sizes.tablet || sizes.mobile};
    }
  `
};

export default theme;
