import os
from typing import Dict

class EnvironmentMigrator:
    """Migrates environment variables from old to new names"""
    
    MIGRATIONS = {
        'ZENUML_API_URL': 'ASCEND_API_URL',
        'ZENUML_LOGO': 'ASCEND_LOGO',
        'ZENUML_BRAND': 'ASCEND_BRAND',
        'ZENUML_DB_NAME': 'ASCEND_DB_NAME',
        'ZENUML_APP_NAME': 'ASCEND_APP_NAME'
    }
    
    @staticmethod
    def migrate_env_file(env_file_path: str, dry_run: bool = True) -> Dict[str, str]:
        """Migrate .env file"""
        if not os.path.exists(env_file_path):
            return {'status': 'error', 'message': f'{env_file_path} not found'}
        
        with open(env_file_path, 'r') as f:
            lines = f.readlines()
        
        new_lines = []
        migrated = {}
        
        for line in lines:
            new_line = line
            for old_key, new_key in EnvironmentMigrator.MIGRATIONS.items():
                if line.startswith(old_key + '='):
                    new_line = line.replace(old_key, new_key)
                    migrated[old_key] = new_key
                    break
            new_lines.append(new_line)
        
        if not dry_run and migrated:
            with open(env_file_path, 'w') as f:
                f.writelines(new_lines)
        
        return {
            'status': 'success',
            'migrated': migrated,
            'dry_run': dry_run
        }
    
    @staticmethod
    def validate_env(required_vars: list) -> Dict[str, any]:
        """Validate required environment variables"""
        missing = []
        present = []
        
        for var in required_vars:
            if var in os.environ:
                present.append(var)
            else:
                missing.append(var)
        
        return {
            'present': present,
            'missing': missing,
            'valid': len(missing) == 0
        }
