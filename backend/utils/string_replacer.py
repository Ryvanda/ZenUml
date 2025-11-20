import os
from pathlib import Path
from typing import List, Dict

class StringReplacer:
    """Replaces old identifiers with new ones"""
    
    REPLACEMENTS = {
        'ZenUML': 'Ascend',
        'zenuml': 'ascend',
        'ZENUML': 'ASCEND',
        'Zen UML': 'Ascend',
        'zen-uml': 'ascend',
        'zen_uml': 'ascend'
    }
    
    EXCLUDE_DIRS = {'.git', '__pycache__', 'node_modules', '.venv', 'venv', '.env'}
    EXCLUDE_FILES = {'.pyc', '.pyo', '.pyd', '.so', '.dll', '.exe'}
    
    def __init__(self, root_path: str, dry_run: bool = True):
        self.root_path = Path(root_path)
        self.dry_run = dry_run
        self.changes: List[Dict] = []
    
    def replace_all(self) -> List[Dict]:
        """Replace all old identifiers"""
        for file_path in self._get_files():
            self._replace_in_file(file_path)
        return self.changes
    
    def _get_files(self):
        """Get all files to process"""
        for root, dirs, files in os.walk(self.root_path):
            dirs[:] = [d for d in dirs if d not in self.EXCLUDE_DIRS]
            
            for file in files:
                if not any(file.endswith(ext) for ext in self.EXCLUDE_FILES):
                    yield Path(root) / file
    
    def _replace_in_file(self, file_path: Path):
        """Replace identifiers in a single file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except (UnicodeDecodeError, PermissionError):
            return
        
        original_content = content
        
        for old, new in self.REPLACEMENTS.items():
            content = content.replace(old, new)
        
        if content != original_content:
            self.changes.append({
                'file': str(file_path.relative_to(self.root_path)),
                'status': 'dry_run' if self.dry_run else 'replaced'
            })
            
            if not self.dry_run:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
    
    def report(self) -> str:
        """Generate replacement report"""
        if not self.changes:
            return "No changes needed."
        
        mode = "DRY RUN - " if self.dry_run else ""
        report = f"{mode}Would replace in {len(self.changes)} files:\n\n"
        
        for change in self.changes:
            report += f"  {change['file']}\n"
        
        return report
