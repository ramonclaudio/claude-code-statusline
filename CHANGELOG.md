# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] - 2025-10-28

### Changed

- Redesigned README for clarity and brevity - removed redundancy and streamlined documentation
- Updated color palette to muted, cohesive scheme (steel blue, slate gray, soft coral, muted amber)
- Updated color descriptions and code examples throughout
- Disabled framework and runtime detection by default in `statusline-config.cjs` for cleaner default output
- Added image with GIF fallback using HTML `<picture>` element for better media handling
- Refined DIM color for improved visual hierarchy

## [0.2.0] - 2025-10-28

### Added

- Granular control for every status line element via individual feature toggles
- New centralized configuration file (`statusline-config.cjs`) for all customization
- Individual toggles for: project name, git branch, framework, runtime, git ahead/behind/staged/modified/untracked, and model
- Performance optimization: only runs git operations when needed based on enabled features

### Changed

- **BREAKING**: Moved all configuration from `statusline.cjs` to new `statusline-config.cjs` file
- Improved color scheme with intuitive severity gradient (green → orange → yellow → red)
  - `GIT_AHEAD`: Bright green (46) - you're ahead
  - `GIT_STAGED`: Orange (214) - ready to commit
  - `GIT_MODIFIED`: Yellow (226) - needs staging
  - `GIT_UNTRACKED`: Red (196) - needs attention
- Separated git status indicators for better visibility (staged/modified/untracked now distinct)
- Updated README with comprehensive documentation and examples

### Removed

- Inline configuration from `statusline.cjs` (moved to separate config file)
- All code comments for cleaner codebase

## [0.1.0] - 2025-09-10

### Added

- Initial release with complete project setup
- CLI tool for initializing Claude Code projects
- Atomic file operations with backup and rollback
- Statusline scripts for project and Git status
- TypeScript support with strict configuration

[0.2.1]: https://github.com/RMNCLDYO/create-claude-statusline/releases/tag/v0.2.1
[0.2.0]: https://github.com/RMNCLDYO/create-claude-statusline/releases/tag/v0.2.0
[0.1.0]: https://github.com/RMNCLDYO/create-claude-statusline/releases/tag/v0.1.0
