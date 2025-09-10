# Claude Code Status Line

Beautiful, customizable status line for Claude Code. Shows project info, git status, and model context at a glance.

[![version](https://img.shields.io/npm/v/claude-code-status-line.svg?label=version&color=brightgreen)](https://www.npmjs.com/package/claude-code-status-line)
[![downloads](https://img.shields.io/npm/dm/claude-code-status-line.svg?label=downloads&color=blue)](https://www.npmjs.com/package/claude-code-status-line)
[![package size](https://img.shields.io/npm/unpacked-size/claude-code-status-line?label=package%20size&color=yellow)](https://www.npmjs.com/package/claude-code-status-line)
[![license](https://img.shields.io/badge/license-MIT-red.svg)](https://opensource.org/licenses/MIT)

## What is this?

A lightweight status line for Claude Code that displays contextual information about your coding session. Similar to terminal prompts like Oh-my-zsh, it shows:

- 📁 Current project and directory
- 🌿 Git branch and status (ahead/behind, staged, untracked)
- ⚡ Active model (Opus, Sonnet, etc.)
- 🔧 Detected framework and runtime
- 📊 Real-time updates as you work

## Quick Start

```bash
npx claude-code-status-line
```

*Adds status line config files to your project. ZERO dependencies in your project.*

## What Gets Installed

The installation adds these files to your project:

```bash
.claude/
├── settings.local.json          # Status line configuration
└── scripts/
    ├── statusline.cjs           # Main status line logic
    ├── statusline-git.cjs       # Git integration
    └── statusline-detect.cjs    # Framework detection
```

**Safety:** If you already have a `.claude` directory, it will be backed up to `.claude-code-status-line-backup-[timestamp]` before installation. Your existing configuration is never lost.

## Installation Safety

- ✅ **Non-destructive**: Creates automatic backups of existing `.claude` directories
- ✅ **Idempotent**: Safe to run multiple times
- ✅ **Reversible**: Backup directories preserve your original configuration
- ✅ **Project-only**: Only modifies files in your current project directory
- ✅ **Verified backups**: Uses SHA256 checksums to ensure backup integrity

## Installation Options

### Via Package Managers

```bash
npm install -g claude-code-status-line    # Install globally
npx claude-code-status-line               # Run directly
pnpm dlx claude-code-status-line          # pnpm
bunx claude-code-status-line              # bun
```

### Flags

```bash
npx claude-code-status-line --dry-run     # Preview what will be installed
npx claude-code-status-line --help        # Show all options
```

### Shortcuts

Once installed globally:

```bash
claude-code-status-line                   # Full command
ccsl                                       # Short alias (Claude Code Status Line)
```

## What it looks like

```bash
[ ◈ my-project on ⎇ main ↑ 2 / ? 3 via ◉ React (node) | ⚡ Opus ]
```

This tells you:

- **Project**: `my-project`
- **Git branch**: `main` with 2 commits ahead, 3 untracked files
- **Framework**: React (running on Node.js)
- **Model**: Opus

## Features

### Smart Detection

Automatically detects:

- **Frameworks**: Next.js, React, Vue, Angular, Svelte, Express, NestJS, and more
- **Runtimes**: Node.js, Python, Rust, Go, Java, TypeScript, Bun, C/C++
- **Git status**: Branch, commits ahead/behind, staged/untracked changes
- **Package managers**: npm, yarn, pnpm, bun

### Real-time Updates

The status line updates automatically when:

- You switch directories
- Git status changes
- Model changes
- Files are modified

### Lightweight & Fast

- No runtime dependencies
- Caches git operations for performance
- Sub-100ms update times
- No background processes

## Customization

The status line is fully customizable. After installation, you can modify the scripts in `.claude/scripts/`:

### File Structure

```bash
.claude/
├── settings.local.json          # Configuration
└── scripts/
    ├── statusline.cjs           # Main logic
    ├── statusline-git.cjs       # Git integration
    └── statusline-detect.cjs    # Framework detection
```

## Programmatic Usage

### As a Library

```bash
npm install claude-code-status-line
```

```javascript
import { init } from 'claude-code-status-line';

// Initialize status line in a project
const result = await init('/path/to/project', {
  dryRun: false  // Set to true for preview
});

console.log(result.message);
```

### API

#### `init(projectPath, options)`

Initializes the status line in the specified project.

**Parameters:**

- `projectPath` (string): Path to the project directory
- `options` (object):
  - `dryRun` (boolean): Preview mode without making changes

**Returns:** `Promise<InitResult>`

- `success` (boolean): Whether initialization succeeded
- `filesCreated` (number): Number of files created
- `message` (string): Result message

## How it Works

1. **Installation**: Copies status line scripts to `.claude/scripts/`
2. **Configuration**: Adds status line config to `.claude/settings.local.json`
3. **Execution**: Claude Code calls your script when updating the interface
4. **Input**: Script receives session context as JSON via stdin
5. **Output**: Returns formatted text with ANSI colors to stdout

## Requirements

- Node.js 18.0.0 or higher (for installation and runtime)
- Claude Code CLI
- Git (optional, for git status features)

## Troubleshooting

### Status line not appearing?

1. **Check installation**:

```bash
ls -la .claude/scripts/statusline.cjs
```

2. **Verify executable**:

```bash
chmod +x .claude/scripts/statusline.cjs
```

3. **Test manually**:

```bash
echo '{"model":{"display_name":"Test"}}' | node .claude/scripts/statusline.cjs
```

4. **Check configuration**:

```bash
cat .claude/settings.local.json | grep statusLine
```

### Git info not showing?

- Ensure you're in a git repository
- Check that git is installed: `which git`
- Verify git commands work: `git status`

### Performance issues?

- Check git repository size
- Reduce git operations frequency in config
- Disable unused features

## Uninstalling

To remove the status line from a project:

```bash
# Remove the status line files
rm -rf .claude/scripts/statusline*.cjs

# Remove configuration from settings
nano .claude/settings.local.json
# Delete the "statusLine" section
```

To restore your previous configuration from backup:

```bash
# List available backups
ls -la .claude-code-status-line-backup-*

# Restore from a backup (replace timestamp with actual)
rm -rf .claude
mv .claude-code-status-line-backup-[timestamp] .claude
```

To clean up all backup directories:

```bash
rm -rf .claude-code-status-line-backup-*
```

## FAQ

**Q: Will this overwrite my existing Claude Code configuration?**
A: No. If you have an existing `.claude` directory, it will be backed up automatically before installation.

**Q: Can I customize the status line after installation?**
A: Yes! All scripts in `.claude/scripts/` can be modified to suit your needs.

**Q: Is it safe to run the installer multiple times?**
A: Yes, each run creates a new timestamped backup of your existing configuration.

**Q: Where are backups stored?**
A: Backups are stored in your project directory as `.claude-code-status-line-backup-[timestamp]`.

**Q: What if the installation fails?**
A: The installer uses transactions with automatic rollback. If anything fails, your original configuration is restored.

**Q: Can I use this in multiple projects?**
A: Yes! Run the installer in each project where you want the status line.

**Q: Does this work with existing Claude Code agents and commands?**
A: Yes, the status line is independent and won't interfere with other Claude Code features.

## Contributing

We welcome contributions! Areas where you can help:

- Add more framework detections
- Improve performance
- Add new status sections
- Improve documentation
- Add tests

Please check our [Contributing Guide](CONTRIBUTING.md) for details.

All participants are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Support

- **Issues**: [GitHub Issues](https://github.com/RMNCLDYO/claude-code-status-line/issues)
- **Discussions**: [GitHub Discussions](https://github.com/RMNCLDYO/claude-code-status-line/discussions)

## License

MIT © [RMNCLDYO](https://github.com/RMNCLDYO)

## Related Projects

- [Claude Code](https://claude.ai/code) - The official Claude coding assistant
- [create-claude](https://github.com/RMNCLDYO/create-claude) - Full Claude Code project setup
