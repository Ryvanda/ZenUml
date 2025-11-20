export const ENV_MIGRATIONS = {
  'REACT_APP_ZENUML_API_URL': 'REACT_APP_ASCEND_API_URL',
  'REACT_APP_ZENUML_LOGO': 'REACT_APP_ASCEND_LOGO',
  'REACT_APP_ZENUML_BRAND': 'REACT_APP_ASCEND_BRAND'
};

export function migrateEnvironmentVariables(envObj) {
  const migrated = { ...envObj };
  
  Object.entries(ENV_MIGRATIONS).forEach(([oldKey, newKey]) => {
    if (oldKey in migrated && !(newKey in migrated)) {
      migrated[newKey] = migrated[oldKey];
      delete migrated[oldKey];
    }
  });
  
  return migrated;
}

export function validateEnvironment() {
  const required = [
    'REACT_APP_BACKEND_URL',
    'REACT_APP_I18N_ENABLED',
    'REACT_APP_NEW_LOGO'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
  
  return missing.length === 0;
}
