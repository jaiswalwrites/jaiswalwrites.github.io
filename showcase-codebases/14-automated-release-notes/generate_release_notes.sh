#!/bin/bash

PREV_TAG=$(git describe --tags --abbrev=0)
echo "Generating release notes since $PREV_TAG..."

# Fetch PR titles
LOGS=$(git log $PREV_TAG..HEAD --pretty=format:"* %s")

echo "# Release Notes - $(date +%Y-%m-%d)" > RELEASE_NOTES.md
echo "" >> RELEASE_NOTES.md
echo "## What's New" >> RELEASE_NOTES.md
echo "$LOGS" >> RELEASE_NOTES.md

echo "Release notes generated in RELEASE_NOTES.md"
