import React from 'react';
import { AscendLogo } from './AscendLogo';
import { AscendLogoMark } from './AscendLogoMark';
import { FEATURE_FLAGS } from '../constants/branding';

export function LogoSwitcher({ variant = 'full', size = 'md', className = '' }) {
  if (!FEATURE_FLAGS.NEW_LOGO) {
    return <div className={`logo-placeholder ${className}`}>ZenUML</div>;
  }

  if (variant === 'mark') {
    return <AscendLogoMark size={size} className={className} />;
  }

  return <AscendLogo variant={variant} size={size} className={className} />;
}
