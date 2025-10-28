# create-claude-statusline

Beautiful, highly customizable status line for Claude Code with granular control over every element.

[![version](https://img.shields.io/npm/v/create-claude-statusline.svg?label=version&color=brightgreen)](https://www.npmjs.com/package/create-claude-statusline)
[![downloads](https://img.shields.io/npm/dm/create-claude-statusline.svg?label=downloads&color=blue)](https://www.npmjs.com/package/create-claude-statusline)
[![package size](https://img.shields.io/npm/unpacked-size/create-claude-statusline?label=package%20size&color=yellow)](https://www.npmjs.com/package/create-claude-statusline)
[![license](https://img.shields.io/badge/license-MIT-red.svg)](https://opensource.org/licenses/MIT)

## Quick Start

```bash
npm create claude-statusline
```

*Adds a beautiful status line to your Claude Code. ZERO dependencies in your project.*

### ✨ What's New

- **Granular Control**: Toggle every element individually - project, branch, framework, runtime, each git status type, and model
- **Centralized Config**: New `statusline-config.cjs` file for easy customization
- **Intuitive Colors**: Color-coded git status (green → orange → yellow → red) for instant visual feedback
- **Performance**: Only runs git operations when needed based on your config

## What You Get

```
[ ◈ my-project on ⎇ main via ◉ React (node) | ↑ 2 / + 1 / ~ 3 / ? 2 | ⌘ Sonnet 4.5 ]
```

**What each element shows:**
- `◈ my-project` - Project name (light blue)
- `⎇ main` - Git branch (light green)
- `◉ React (node)` - Framework and runtime (pink/tan)
- `↑ 2` - Commits ahead (green)
- `+ 1` - Staged files (orange)
- `~ 3` - Modified files (yellow)
- `? 2` - Untracked files (red)
- `⌘ Sonnet 4.5` - Claude model (purple)

**Color coding:** Green (good) → Orange (ready) → Yellow (pending) → Red (needs attention)

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

🎯 **Granular Control** - Toggle every element individually (project name, branch, framework, runtime, each git status type, model)

📊 **Clear Git Status** - Separate indicators for ahead/behind, staged, modified, and untracked with intuitive color coding (green → orange → yellow → red)

✨ **Smart Detection** - Automatically detects your framework (React, Vue, Next.js, etc.) and runtime (Node, Bun, Python, Rust, Go, etc.)

🎨 **Fully Customizable** - Centralized config file for all features, colors, and icons

⚡ **Fast & Efficient** - Intelligent caching with rate limiting for sub-100ms updates

🔒 **Safe & Secure** - Command allowlisting, path validation, and automatic backups

📦 **Zero Dependencies** - No runtime dependencies in your project

## What Gets Installed

```
.claude/
├── settings.local.json          # Status line configuration
└── scripts/
    ├── statusline.cjs           # Main status line logic
    ├── statusline-config.cjs    # Configuration options
    ├── statusline-git.cjs       # Git integration
    └── statusline-detect.cjs    # Framework detection
```

## Customization

Edit `.claude/scripts/statusline-config.cjs` to customize:

### Feature Toggles
```javascript
FEATURES: {
  SHOW_PROJECT: true,        // Show project name
  SHOW_GIT_BRANCH: true,     // Show git branch
  SHOW_FRAMEWORK: true,      // Show detected framework (React, Vue, etc.)
  SHOW_RUNTIME: true,        // Show runtime (Node.js, Bun, etc.)
  SHOW_GIT_AHEAD: true,      // Show commits ahead of remote
  SHOW_GIT_BEHIND: true,     // Show commits behind remote
  SHOW_GIT_STAGED: true,     // Show staged files
  SHOW_GIT_MODIFIED: true,   // Show modified (unstaged) files
  SHOW_GIT_UNTRACKED: true,  // Show untracked files
  SHOW_MODEL: true,          // Show Claude model name
}
```

### Colors

Color scheme follows an intuitive severity gradient:

```javascript
COLORS: {
  PROJECT: '\x1b[38;5;117m',       // Light blue
  BRANCH: '\x1b[38;5;156m',        // Light green
  FRAMEWORK: '\x1b[38;5;219m',     // Pink
  RUNTIME: '\x1b[38;5;180m',       // Tan
  GIT_AHEAD: '\x1b[38;5;46m',      // Green - you're ahead!
  GIT_BEHIND: '\x1b[38;5;196m',    // Red - action needed
  GIT_STAGED: '\x1b[38;5;214m',    // Orange - ready to commit
  GIT_MODIFIED: '\x1b[38;5;226m',  // Yellow - needs staging
  GIT_UNTRACKED: '\x1b[38;5;196m', // Red - needs attention
  MODEL: '\x1b[38;5;93m',          // Purple
}
```

### Icons
```javascript
ICONS: {
  PROJECT: '◈',
  BRANCH: '⎇',
  GIT_AHEAD: '↑',
  GIT_BEHIND: '↓',
  GIT_STAGED: '+',
  GIT_MODIFIED: '~',
  GIT_UNTRACKED: '?',
  MODEL: '⌘'
}
```

### Supported Frameworks & Runtimes

**Frameworks:** Next.js, Nuxt.js, NestJS, React, Vue, Angular, Svelte, Express, Fastify

**Runtimes:** Node.js, Bun, TypeScript, Python, Rust, Go, Java, C/C++

All configuration is centralized in `.claude/scripts/statusline-config.cjs` - one file to control everything!

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

## Example: Minimal Configuration

Want just git branch and status? Edit `.claude/scripts/statusline-config.cjs`:

```javascript
FEATURES: {
  SHOW_PROJECT: false,       // Hide project name
  SHOW_GIT_BRANCH: true,     // Show branch
  SHOW_FRAMEWORK: false,     // Hide framework
  SHOW_RUNTIME: false,       // Hide runtime
  SHOW_GIT_AHEAD: true,      // Show ahead
  SHOW_GIT_BEHIND: true,     // Show behind
  SHOW_GIT_STAGED: true,     // Show staged
  SHOW_GIT_MODIFIED: true,   // Show modified
  SHOW_GIT_UNTRACKED: true,  // Show untracked
  SHOW_MODEL: false,         // Hide model
}
```

Result: `[ ⎇ main | ↑ 1 / + 2 / ~ 3 / ? 1 ]`

## Troubleshooting

**Status line not showing?**
```bash
# Check installation
ls -la .claude/scripts/statusline.cjs

# Test manually
echo '{"model":{"display_name":"Test"},"workspace":{"current_dir":"'"$(pwd)"'"}}' | node .claude/scripts/statusline.cjs
```

**Git info missing?**
- Ensure you're in a git repository (`git status` should work)
- Check that git features are enabled in `statusline-config.cjs`

**Want different colors?**
- Edit COLORS in `.claude/scripts/statusline-config.cjs`
- Use 256-color codes: `\x1b[38;5;NUMBERm` (see [256-color chart](https://upload.wikimedia.org/wikipedia/commons/1/15/Xterm_256color_chart.svg))

## Links

[**Issues**](https://github.com/RMNCLDYO/create-claude-statusline/issues) • 
[**Discussions**](https://github.com/RMNCLDYO/create-claude-statusline/discussions) • 
[**Changelog**](CHANGELOG.md) • 
[**Security**](SECURITY.md)

## License

MIT © [RMNCLDYO](https://github.com/RMNCLDYO)

---

Originally extracted from [create-claude](https://github.com/RMNCLDYO/create-claude) due to popular demand for the standalone status line feature.