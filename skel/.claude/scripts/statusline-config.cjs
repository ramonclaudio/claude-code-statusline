module.exports = {
  GIT_CACHE_TTL: 1000,

  FEATURES: {
    SHOW_PROJECT: true,
    SHOW_GIT_BRANCH: true,
    SHOW_FRAMEWORK: false,
    SHOW_RUNTIME: false,
    SHOW_GIT_AHEAD: true,
    SHOW_GIT_BEHIND: true,
    SHOW_GIT_STAGED: true,
    SHOW_GIT_MODIFIED: true,
    SHOW_GIT_UNTRACKED: true,
    SHOW_MODEL: true,
  },

  COLORS: {
    PROJECT: '\x1b[38;5;110m',      // Muted steel blue
    BRANCH: '\x1b[38;5;109m',       // Slate gray-blue
    FRAMEWORK: '\x1b[38;5;145m',    // Cool gray
    RUNTIME: '\x1b[38;5;180m',      // Muted beige
    GIT_AHEAD: '\x1b[38;5;109m',    // Slate blue
    GIT_BEHIND: '\x1b[38;5;167m',   // Soft coral
    GIT_STAGED: '\x1b[38;5;108m',   // Muted teal-green
    GIT_MODIFIED: '\x1b[38;5;180m', // Muted amber
    GIT_UNTRACKED: '\x1b[38;5;167m', // Soft coral
    MODEL: '\x1b[38;5;146m',        // Soft gray-green
    DIM: '\x1b[38;5;243m',          // Subtle gray
    RESET: '\x1b[0m'
  },

  ICONS: {
    PROJECT: '◈',
    BRANCH: '⎇',
    GIT_AHEAD: '↑',
    GIT_BEHIND: '↓',
    GIT_STAGED: '+',
    GIT_MODIFIED: '~',
    GIT_UNTRACKED: '?',
    MODEL: '⌘'
  },
};
