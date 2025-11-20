export const BRANDING = {
  APP_NAME: 'Ascend',
  PRODUCT_NAME: 'Ascend Diagrams',
  TAGLINE: 'Diagram with Confidence',
  DESCRIPTION: 'The modern UML diagramming tool for teams',
  COMPANY_NAME: 'Ascend',
  SUPPORT_EMAIL: 'support@ascend.app',
  WEBSITE: 'https://ascend.app',
  
  COLORS: {
    PRIMARY: '#6B46C1',
    DARK: '#1E1B4B',
    SECONDARY: '#8B5CF6',
    LIGHT: '#F3E8FF',
    SUCCESS: '#10B981',
    ERROR: '#EF4444',
    WARNING: '#F59E0B',
    INFO: '#3B82F6'
  },
  
  SOCIAL: {
    TWITTER: 'https://twitter.com/ascendapp',
    GITHUB: 'https://github.com/ascendapp',
    LINKEDIN: 'https://linkedin.com/company/ascendapp'
  },
  
  LINKS: {
    PRIVACY: 'https://ascend.app/privacy',
    TERMS: 'https://ascend.app/terms',
    DOCS: 'https://docs.ascend.app',
    BLOG: 'https://blog.ascend.app',
    CONTACT: 'https://ascend.app/contact'
  }
};

export const FEATURE_FLAGS = {
  ASCEND_REBRAND: process.env.REACT_APP_FEATURE_ASCEND_REBRAND === 'true',
  I18N_ENABLED: process.env.REACT_APP_I18N_ENABLED === 'true',
  NEW_LOGO: process.env.REACT_APP_NEW_LOGO === 'true'
};
