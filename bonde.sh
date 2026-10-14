#!/usr/bin/env bash
# =============================================================================
# Bonde Web — interactive build / run helper (Next.js + npm).
#   Usage:  ./bonde.sh                 (interactive menu)
#           ./bonde.sh dev             (dev server on :3002)
#           ./bonde.sh start           (serve the production build)
#           ./bonde.sh build           (build — waitlist mode, the default)
#           ./bonde.sh build:landing   (build — full landing mode)
#           ./bonde.sh lint            (eslint)
# =============================================================================
set -uo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

RESET=$'\033[0m'
BOLD=$'\033[1m'
GREEN=$'\033[32m'
YELLOW=$'\033[33m'
CYAN=$'\033[36m'
RED=$'\033[31m'
DIM=$'\033[2m'

title() { printf '\n%b%b%s%b\n\n' "$BOLD$CYAN" "== " "$1" "$RESET"; }
info()  { printf '%b   %b\n' "$CYAN"   "$1$RESET"; }
ok()    { printf '%b   %b\n' "$GREEN"  "$1$RESET"; }
warn()  { printf '%b   %b\n' "$YELLOW" "$1$RESET"; }
fail()  { printf '%b   %b\n' "$RED"    "$1$RESET"; }
dim()   { printf '%b   %b\n' "$DIM"    "$1$RESET"; }

die()   { fail "$1"; exit 1; }

on_int() { printf '%b\n' "${RESET}${YELLOW}   Interrupted.${RESET}"; exit 130; }
trap on_int INT

require() { command -v "$1" >/dev/null 2>&1 || die "Missing required tool: '$1'"; }

enter() { printf '\n%b' "$DIM   Press Enter to continue$RESET"; read -r _; }

run_cmd() {
  local cmd="$1"
  printf '\n%b   $ %b\n' "$GREEN" "$cmd$RESET"
  eval "$cmd"
  local rc=$?
  if [ "$rc" -eq 0 ]; then
    ok "Finished OK."
  else
    fail "Command exited $rc."
  fi
  return "$rc"
}

# --- actions -----------------------------------------------------------------
run_dev() {
  run_cmd "npm run dev"
}

run_prod() {
  if [ ! -d "$PROJECT_DIR/.next" ]; then
    warn "No production build found (missing .next/). 'npm start' needs one."
    printf '%b   Build now? [Y/n]: %b' "$YELLOW" "$RESET"
    read -r ans
    case "${ans:-y}" in
      y|Y|'') run_cmd "npm run build" ;;
      *)      warn "Skipping build — 'npm start' will likely fail." ;;
    esac
  fi
  run_cmd "npm start"
}

# Build in the local default mode (waitlist) via `.env.local` / the env default.
build_waitlist() {
  title "Bonde Web — build (waitlist)"
  info "Pre-launch waitlist is the default site mode."
  run_cmd "npm run build"
}

# `NEXT_PUBLIC_SITE_MODE` is inlined at build time, so landing needs its own build.
build_landing() {
  title "Bonde Web — build (landing)"
  info "Switching NEXT_PUBLIC_SITE_MODE=landing for this build."
  run_cmd "NEXT_PUBLIC_SITE_MODE=landing npm run build"
}

run_lint() {
  title "Bonde Web — lint"
  run_cmd "npm run lint"
}

usage() {
  title "Bonde Web — build / run helper"
  printf '  %b  Run dev server (:3002)%b\n' "$BOLD dev          $RESET" "$DIM npm run dev$RESET"
  printf '  %b  Serve production build %b\n' "$BOLD start        $RESET" "$DIM npm start$RESET"
  printf '  %b  Build (waitlist mode)  %b\n' "$BOLD build        $RESET" "$DIM npm run build$RESET"
  printf '  %b  Build (landing mode)   %b\n' "$BOLD build:landing$RESET" "$DIM NEXT_PUBLIC_SITE_MODE=landing npm run build$RESET"
  printf '  %b  Lint                    %b\n' "$BOLD lint         $RESET" "$DIM npm run lint$RESET"
}

# --- menu --------------------------------------------------------------------
main() {
  while true; do
    title "Bonde Web — build / run helper"
    printf '  %b  Run dev server            %b\n' "$BOLD[1]$RESET" "$DIM npm run dev (localhost:3002)$RESET"
    printf '  %b  Run production server     %b\n' "$BOLD[2]$RESET" "$DIM npm start$RESET"
    printf '  %b  Build (waitlist mode)     %b\n' "$BOLD[3]$RESET" "$DIM npm run build$RESET"
    printf '  %b  Build (landing mode)      %b\n' "$BOLD[4]$RESET" "$DIM NEXT_PUBLIC_SITE_MODE=landing npm run build$RESET"
    printf '  %b  Lint                      %b\n' "$BOLD[5]$RESET" "$DIM npm run lint$RESET"
    printf '  %b  Quit\n\n' "$BOLD[q]$RESET"
    printf '%b> %b' "$GREEN" "$RESET"
    read -r choice
    case "$choice" in
      1) run_dev ;;
      2) run_prod ;;
      3) build_waitlist ;;
      4) build_landing ;;
      5) run_lint ;;
      q|Q) ok "Bye!"; exit 0 ;;
      *) warn "Invalid choice: $choice" ;;
    esac
    enter
  done
}

# --- entry -------------------------------------------------------------------
require npm
cd "$PROJECT_DIR" || die "Cannot enter $PROJECT_DIR"

case "${1:-}" in
  "")            main ;;
  dev)           run_dev ;;
  start|prod)    run_prod ;;
  build)         build_waitlist ;;
  build:landing|landing) build_landing ;;
  lint)          run_lint ;;
  -h|--help|help) usage ;;
  *)             die "Unknown command: '$1' (try --help)" ;;
esac
