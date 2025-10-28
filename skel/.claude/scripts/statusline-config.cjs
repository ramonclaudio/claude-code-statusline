module.exports = {
  GIT_CACHE_TTL: 1000,

  FEATURES: {
    SHOW_PROJECT: true,
    SHOW_GIT_BRANCH: true,
    SHOW_FRAMEWORK: true,
    SHOW_RUNTIME: true,
    SHOW_GIT_AHEAD: true,
    SHOW_GIT_BEHIND: true,
    SHOW_GIT_STAGED: true,
    SHOW_GIT_MODIFIED: true,
    SHOW_GIT_UNTRACKED: true,
    SHOW_MODEL: true,
  },

  COLORS: {
    PROJECT: '\x1b[38;5;117m',
    BRANCH: '\x1b[38;5;156m',
    FRAMEWORK: '\x1b[38;5;219m',
    RUNTIME: '\x1b[38;5;180m',
    GIT_AHEAD: '\x1b[38;5;46m',
    GIT_BEHIND: '\x1b[38;5;196m',
    GIT_STAGED: '\x1b[38;5;214m',
    GIT_MODIFIED: '\x1b[38;5;226m',
    GIT_UNTRACKED: '\x1b[38;5;196m',
    MODEL: '\x1b[38;5;93m',
    DIM: '\x1b[38;5;244m',
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
