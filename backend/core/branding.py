"""Branding configuration for Ascend"""

class BrandingConfig:
    """Centralized branding constants"""
    
    APP_NAME = "Ascend"
    PRODUCT_NAME = "Ascend Diagrams"
    TAGLINE = "Diagram with Confidence"
    DESCRIPTION = "The modern UML diagramming tool for teams"
    COMPANY_NAME = "Ascend"
    
    COLORS = {
        "primary": "#6B46C1",
        "dark": "#1E1B4B",
        "secondary": "#8B5CF6",
        "light": "#F3E8FF",
        "success": "#10B981",
        "error": "#EF4444",
        "warning": "#F59E0B",
        "info": "#3B82F6"
    }
    
    SOCIAL = {
        "twitter": "https://twitter.com/ascendapp",
        "github": "https://github.com/ascendapp",
        "linkedin": "https://linkedin.com/company/ascendapp"
    }
    
    LINKS = {
        "privacy": "https://ascend.app/privacy",
        "terms": "https://ascend.app/terms",
        "docs": "https://docs.ascend.app",
        "blog": "https://blog.ascend.app",
        "contact": "https://ascend.app/contact"
    }
    
    SUPPORT_EMAIL = "support@ascend.app"
    WEBSITE = "https://ascend.app"

def get_branding():
    """Get branding configuration"""
    return {
        "appName": BrandingConfig.APP_NAME,
        "productName": BrandingConfig.PRODUCT_NAME,
        "tagline": BrandingConfig.TAGLINE,
        "description": BrandingConfig.DESCRIPTION,
        "companyName": BrandingConfig.COMPANY_NAME,
        "colors": BrandingConfig.COLORS,
        "social": BrandingConfig.SOCIAL,
        "links": BrandingConfig.LINKS,
        "supportEmail": BrandingConfig.SUPPORT_EMAIL,
        "website": BrandingConfig.WEBSITE
    }
