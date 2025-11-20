#!/usr/bin/env python3
"""
Ascend Rebrand Migration Script
Automates the migration from ZenUML to Ascend
"""

import sys
import argparse
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from utils.rebrand_scanner import RebrandScanner
from utils.string_replacer import StringReplacer
from utils.env_migrator import EnvironmentMigrator

def main():
    parser = argparse.ArgumentParser(description='Ascend Rebrand Migration')
    parser.add_argument('--scan', action='store_true', help='Scan for old identifiers')
    parser.add_argument('--replace', action='store_true', help='Replace old identifiers')
    parser.add_argument('--migrate-env', action='store_true', help='Migrate .env file')
    parser.add_argument('--dry-run', action='store_true', default=True, help='Dry run (default)')
    parser.add_argument('--execute', action='store_true', help='Execute changes (disable dry-run)')
    parser.add_argument('--root', default='.', help='Root directory to scan')
    parser.add_argument('--env-file', default='.env', help='Path to .env file')
    
    args = parser.parse_args()
    
    dry_run = not args.execute
    
    if args.scan:
        print("🔍 Scanning for old identifiers...\n")
        scanner = RebrandScanner(args.root)
        scanner.scan()
        print(scanner.report())
    
    if args.replace:
        print("🔄 Replacing old identifiers...\n")
        replacer = StringReplacer(args.root, dry_run=dry_run)
        replacer.replace_all()
        print(replacer.report())
    
    if args.migrate_env:
        print("🔐 Migrating environment variables...\n")
        result = EnvironmentMigrator.migrate_env_file(args.env_file, dry_run=dry_run)
        print(f"Status: {result['status']}")
        if 'migrated' in result:
            for old, new in result['migrated'].items():
                print(f"  {old} → {new}")
    
    if not any([args.scan, args.replace, args.migrate_env]):
        print("Use --scan, --replace, or --migrate-env")
        parser.print_help()

if __name__ == '__main__':
    main()
