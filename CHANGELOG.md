# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- CPF generator with pinnable digits, random-fill mode, and clipboard copy.
- CPF validator with live check-digit validation.
- Vitest suite for the check-digit/validation/formatting logic (`src/lib/cpf.ts`).

### Fixed
- Randomize the search start point so repeated clicks on "Gerar CPF" vary the result.
- Handle clipboard copy failures gracefully instead of failing silently.
- Unlock check-digit inputs after generation and fix a cross-platform lockfile issue.
- Auto-advance focus between digit inputs and make check-digit boxes read-only.
