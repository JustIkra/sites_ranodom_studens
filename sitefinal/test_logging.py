#!/usr/bin/env python3
"""Test script to verify Django logging configuration"""
import os
import sys
from pathlib import Path

# Add project to path
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Import Django and setup
import django
django.setup()

# Import logging
import logging

# Get loggers
request_logger = logging.getLogger('django.request')
server_logger = logging.getLogger('django.server')
security_logger = logging.getLogger('django.security')
django_logger = logging.getLogger('django')

# Test logging
print("=" * 60)
print("Testing Django Logging Configuration for sitefinal")
print("=" * 60)

# Test INFO level (should go to requests.log)
request_logger.info("TEST: This is a test INFO request log message")
server_logger.info("TEST: This is a test INFO server log message")

# Test WARNING level (should go to security.log)
security_logger.warning("TEST: This is a test WARNING security log message")

# Test ERROR level (should go to errors.log)
django_logger.error("TEST: This is a test ERROR log message")
request_logger.error("TEST: This is a test ERROR request log message")

print("\nLog messages sent successfully!")
print("\nChecking log files...")

logs_dir = BASE_DIR / 'logs'
log_files = list(logs_dir.glob('*.log'))

if log_files:
    print(f"\nFound {len(log_files)} log file(s):")
    for log_file in log_files:
        size = log_file.stat().st_size
        print(f"  - {log_file.name} ({size} bytes)")
else:
    print("\nNo log files found yet")

print("\n" + "=" * 60)
