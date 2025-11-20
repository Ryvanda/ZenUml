import os
import re
from pathlib import Path
from typing import List, Dict, Tuple

class RebrandScanner:
    """Scans codebase for old ZenUML identifiers"""
    
    OLD_IDENTIFIERS = {
        'ZenUML': 'Ascend',
        'zenuml': 'ascend',
        'ZENUML': 'ASCEND',
        'Zen UML': 'Ascend',
        'zen-uml': 'ascend',
        'zen_uml': 'ascend'
    }
    
    EXCLUDE_DIRS = {'.git', '__pycache__', 'node_modules', '.venv', 'venv', '.env'}
    EXCLUDE_FILES = {'.pyc', '.pyo', '.pyd', '.so', '.dll', '.exe'}
    
    def __init__(self, root_path: str):
        self.root_path = Path(root_path)
        self.results: List[Dict] = []
    
    def scan(self) -> List[Dict]:
        """Scan all files for old identifiers"""
        for file_path in self._get_files():
            self._scan_file(file_path)
        return self.results
    
    def _get_files(self):
        """Get all files to scan"""
        for root, dirs, files in os.walk(self.root_path):
            dirs[:] = [d for d in dirs if d not in self.EXCLUDE_DIRS]
            
            for file in files:
                if not any(file.endswith(ext) for ext in self.EXCLUDE_FILES):
                    yield Path(root) / file
    
    def _scan_file(self, file_path: Path):
        """Scan a single file for old identifiers"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except (UnicodeDecodeError, PermissionError):
            return
        
        for old_id, new_id in self.OLD_IDENTIFIERS.items():
            matches = list(re.finditer(re.escape(old_id), content))
            
            for match in matches:
                line_num = content[:match.start()].count('\n') + 1
                self.results.append({
                    'file': str(file_path.relative_to(self.root_path)),
                    'line': line_num,
                    'old': old_id,
                    'new': new_id,
                    'context': self._get_context(content, match.start(), match.end())
                })
    
    def _get_context(self, content: str, start: int, end: int, chars: int = 50) -> str:
        """Get context around match"""
        ctx_start = max(0, start - chars)
        ctx_end = min(len(content), end + chars)
        return content[ctx_start:ctx_end].replace('\n', ' ')
    
    def report(self) -> str:
        """Generate scan report"""
        if not self.results:
            return "✓ No old identifiers found!"
        
        report = f"Found {len(self.results)} occurrences:\n\n"
        
        by_file = {}
        for result in self.results:
            file = result['file']
            if file not in by_file:
                by_file[file] = []
            by_file[file].append(result)
        
        for file, matches in sorted(by_file.items()):
            report += f"\n{file}:\n"
            for match in matches:
                report += f"  Line {match['line']}: {match['old']} → {match['new']}\n"
                report += f"    Context: ...{match['context']}...\n"
        
        return report
