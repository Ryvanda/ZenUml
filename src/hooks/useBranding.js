import { useMemo } from 'react';
import { BRANDING, FEATURE_FLAGS } from '../constants/branding';

export function useBranding() {
  const branding = useMemo(() => ({
    appName: BRANDING.APP_NAME,
    productName: BRANDING.PRODUCT_NAME,
    tagline: BRANDING.TAGLINE,
    description: BRANDING.DESCRIPTION,
    companyName: BRANDING.COMPANY_NAME,
    colors: BRANDING.COLORS,
    social: BRANDING.SOCIAL,
    links: BRANDING.LINKS,
    isNewBrand: FEATURE_FLAGS.ASCEND_REBRAND,
    isNewLogo: FEATURE_FLAGS.NEW_LOGO,
    i18nEnabled: FEATURE_FLAGS.I18N_ENABLED
  }), []);

  return branding;
}
