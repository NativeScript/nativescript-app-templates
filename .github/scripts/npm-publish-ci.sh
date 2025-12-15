#!/usr/bin/env bash
set -euo pipefail

TAG="${NPM_TAG:-next}"

args=(
  --tag "$TAG"
  --access public
  --provenance
)

log_file="$(mktemp)"

set +e
npm publish "${args[@]}" 2>&1 | tee "$log_file"
status=${PIPESTATUS[0]}
set -e

if [ "$status" -eq 0 ]; then
  exit 0
fi

# Ignore "already published" errors, but fail on everything else.
if grep -qiE '(previously published|cannot publish over|EPUBLISHCONFLICT)' "$log_file"; then
  echo "Publish skipped (already published)."
  exit 0
fi

exit "$status"
