#!/usr/bin/env bash
set -euo pipefail

TAG="${NPM_TAG:-next}"

pkg_name="$(node -p "require('./package.json').name")"
pkg_version="$(node -p "require('./package.json').version")"

# Skip publishing if this exact version already exists on npm.
# This keeps CI logs clean and avoids attempting to publish unchanged packages.
view_log_file="$(mktemp)"
set +e
npm view "${pkg_name}@${pkg_version}" version --registry "https://registry.npmjs.org" 2>&1 | tee "$view_log_file" >/dev/null
view_status=${PIPESTATUS[0]}
set -e

if [ "$view_status" -eq 0 ]; then
  echo "Skip publish: ${pkg_name}@${pkg_version} already exists on npm."
  exit 0
fi

# If npm view failed because the package/version doesn't exist, continue to publish.
if ! grep -qiE '(E404|404 Not Found|code E404|is not in this registry)' "$view_log_file"; then
  echo "npm view failed unexpectedly for ${pkg_name}@${pkg_version}; refusing to publish."
  cat "$view_log_file" >&2
  exit "$view_status"
fi

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
