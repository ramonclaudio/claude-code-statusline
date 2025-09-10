# create-claude-statusline

Beautiful status line for Claude Code. Shows git status, model context, and project info at a glance.

[![version](https://img.shields.io/npm/v/create-claude-statusline.svg?label=version&color=brightgreen)](https://www.npmjs.com/package/create-claude-statusline)
[![downloads](https://img.shields.io/npm/dm/create-claude-statusline.svg?label=downloads&color=blue)](https://www.npmjs.com/package/create-claude-statusline)
[![package size](https://img.shields.io/npm/unpacked-size/create-claude-statusline?label=package%20size&color=yellow)](https://www.npmjs.com/package/create-claude-statusline)
[![license](https://img.shields.io/badge/license-MIT-red.svg)](https://opensource.org/licenses/MIT)

## Quick Start

```bash
npm create claude-statusline
```

*Adds a beautiful status line to your Claude Code. ZERO dependencies in your project.*

## What You Get

```
[ ◈ my-project on ⎇ main ↑ 2 / ? 3 via ◉ React (node) | ⚡ Opus ]
```

This tells you:
- **Project**: `my-project`
- **Git branch**: `main` with 2 commits ahead, 3 untracked files
- **Framework**: React (running on Node.js)
- **Model**: Opus

## Installation

```bash
npm create claude-statusline     # npm
npx create-claude-statusline     # npx
pnpm dlx create-claude-statusline # pnpm  
bunx create-claude-statusline    # bun
```

### Options

```bash
npm create claude-statusline --dry-run  # Preview what will be installed
npm create claude-statusline --help     # Show all options
```

### Global Install

```bash
npm install -g create-claude-statusline
create-claude-statusline  # Run from anywhere
ccs                       # Short alias
```

## Features

✨ **Smart Detection** - Automatically detects your framework, runtime, and package manager

🎨 **Customizable** - Modify colors, icons, and sections to match your style

⚡ **Fast** - Caches git operations for sub-100ms updates

🔒 **Safe** - Creates automatic backups before making any changes

📦 **Zero Dependencies** - No runtime dependencies in your project

## What Gets Installed

```
.claude/
├── settings.local.json          # Status line configuration
└── scripts/
    ├── statusline.cjs           # Main status line logic
    ├── statusline-git.cjs       # Git integration
    └── statusline-detect.cjs    # Framework detection
```

## Customization

Edit `.claude/scripts/statusline.cjs` to customize:

### Colors
```javascript
COLORS: {
  PROJECT: '\x1b[38;5;117m',  // Light blue
  BRANCH: '\x1b[38;5;156m',   // Light green
  MODEL: '\x1b[38;5;93m',     // Purple
}
```

### Icons
```javascript
ICONS: {
  PROJECT: '◈',
  BRANCH: '⎇',
  MODEL: '⚡',
  GIT_AHEAD: '↑',
  GIT_BEHIND: '↓',
}
```

## Safety

If you already have a `.claude` directory, it will be backed up to `.create-claude-statusline-backup-[timestamp]` before installation.

### Restore from Backup
```bash
# List backups
ls -la .create-claude-statusline-backup-*

# Restore
rm -rf .claude
mv .create-claude-statusline-backup-[timestamp] .claude
```

## Uninstall

```bash
# Remove status line configuration
rm -rf .claude/scripts/statusline*.cjs

# Edit .claude/settings.local.json and remove the "statusLine" section
```

## Programmatic Usage

```javascript
import { init } from 'create-claude-statusline';

await init('/path/to/project', {
  dryRun: false  // Set to true for preview
});
```

## Requirements

- Node.js 18+
- [Claude Code](https://claude.ai/code)
- Git (optional, for git status features)

## Troubleshooting

**Status line not showing?**
```bash
# Check installation
ls -la .claude/scripts/statusline.cjs

# Test manually
echo '{"model":{"display_name":"Test"}}' | node .claude/scripts/statusline.cjs
```

**Git info missing?**
- Ensure you're in a git repository
- Check that `git status` works

## Links

[**Issues**](https://github.com/RMNCLDYO/create-claude-statusline/issues) • 
[**Discussions**](https://github.com/RMNCLDYO/create-claude-statusline/discussions) • 
[**Changelog**](CHANGELOG.md) • 
[**Security**](SECURITY.md)

## License

MIT © [RMNCLDYO](https://github.com/RMNCLDYO)

---

Originally extracted from [create-claude](https://github.com/RMNCLDYO/create-claude) due to popular demand for the standalone status line feature.