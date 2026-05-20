#!/usr/bin/env bash
# ─── Pull wedding photos from Google Drive to ~/mat-archive/ ───────────────
#
# One-time setup (do this once, ever):
#
#   1. brew install rclone
#   2. rclone config         # → name=gdrive-mat, type=drive, scope=drive.readonly
#      (it will open a browser for OAuth; pick "Yes" for headless if remote)
#   3. Verify with:
#      rclone lsd gdrive-mat:
#
# After that, run this script whenever the client adds more photos.
# Re-runs are incremental — rclone skips files whose size + mtime match.
#
# The remote folder name below must match exactly what the client shared.
# Right-click → "Share" → "Copy link" on Drive, then rename the folder to
# something stable like "Mi Amor Tales — Photos" before re-running.

set -euo pipefail

REMOTE_FOLDER="${REMOTE_FOLDER:-Mi Amor Tales Photos}"
DEST="${DEST:-$HOME/mat-archive}"

mkdir -p "$DEST"

echo "Pulling: gdrive-mat:$REMOTE_FOLDER  →  $DEST"
echo

rclone copy "gdrive-mat:$REMOTE_FOLDER" "$DEST" \
  --progress \
  --transfers 8 \
  --checkers 16 \
  --include '*.{jpg,jpeg,JPG,JPEG,png,PNG}'

echo
echo "Done. Files are under $DEST/<wedding-slug>/."
echo "Next step: npm run migrate:images"
