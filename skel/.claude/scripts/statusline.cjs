const { readFileSync } = require('node:fs');
const { basename } = require('node:path');
const { getGitInfo } = require('./statusline-git.cjs');
const { detectFramework, detectRuntime } = require('./statusline-detect.cjs');
const CONFIG = require('./statusline-config.cjs');

function sanitizePath(path) {
  if (!path || path.includes('..') || path.length > 1000) return null;
  if (!/^[a-zA-Z0-9/_.-]+$/.test(path)) return null;
  return path;
}

function validateStatusInput(input) {
  if (!input || typeof input !== 'object') return {};
  const obj = input;
  const result = {};

  if (typeof obj.session_id === 'string' && obj.session_id.length < 100) {
    result.session_id = obj.session_id;
  }
  if (typeof obj.cwd === 'string') {
    const sanitized = sanitizePath(obj.cwd);
    if (sanitized) result.cwd = sanitized;
  }
  if (typeof obj.version === 'string' && obj.version.length < 50) {
    result.version = obj.version;
  }

  if (obj.model && typeof obj.model === 'object' && obj.model !== null) {
    const model = obj.model;
    const modelResult = {};
    if (typeof model.display_name === 'string' && model.display_name.length < 100) {
      modelResult.display_name = model.display_name;
    }
    if (typeof model.id === 'string' && model.id.length < 100) {
      modelResult.id = model.id;
    }
    if (Object.keys(modelResult).length > 0) result.model = modelResult;
  }

  if (obj.workspace && typeof obj.workspace === 'object' && obj.workspace !== null) {
    const workspace = obj.workspace;
    const workspaceResult = {};
    if (typeof workspace.current_dir === 'string') {
      const sanitized = sanitizePath(workspace.current_dir);
      if (sanitized) workspaceResult.current_dir = sanitized;
    }
    if (typeof workspace.project_dir === 'string') {
      const sanitized = sanitizePath(workspace.project_dir);
      if (sanitized) workspaceResult.project_dir = sanitized;
    }
    if (Object.keys(workspaceResult).length > 0) result.workspace = workspaceResult;
  }

  if (obj.output_style && typeof obj.output_style === 'object' && obj.output_style !== null) {
    const outputStyle = obj.output_style;
    if (typeof outputStyle.name === 'string' && outputStyle.name.length < 20) {
      result.output_style = { name: outputStyle.name };
    }
  }

  return result;
}

let gitCache = null;

function getCachedGitInfo(cwd) {
  const now = Date.now();
  if (gitCache && gitCache.cwd === cwd && (now - gitCache.timestamp) < CONFIG.GIT_CACHE_TTL) {
    return gitCache.result;
  }
  
  const result = getGitInfo(cwd, CONFIG);
  gitCache = { cwd, result, timestamp: now };
  return result;
}

function buildProjectSection(project, git, framework, runtime) {
  const { COLORS, ICONS, FEATURES } = CONFIG;
  let section = '';

  if (FEATURES.SHOW_PROJECT) {
    section = `${COLORS.PROJECT}${ICONS.PROJECT} ${project}${COLORS.RESET}`;
  }

  if (FEATURES.SHOW_GIT_BRANCH && git) {
    if (section) section += ' on ';
    section += `${COLORS.BRANCH}${ICONS.BRANCH} ${git.branch}${COLORS.RESET}`;
  }

  if (FEATURES.SHOW_FRAMEWORK && framework && FEATURES.SHOW_RUNTIME) {
    if (section) section += ' via ';
    section += `${COLORS.FRAMEWORK}${framework.icon} ${framework.name}${COLORS.RESET} ${COLORS.DIM}(${COLORS.RUNTIME}${runtime.name}${COLORS.RESET}${COLORS.DIM})${COLORS.RESET}`;
  } else if (FEATURES.SHOW_FRAMEWORK && framework) {
    if (section) section += ' via ';
    section += `${COLORS.FRAMEWORK}${framework.icon} ${framework.name}${COLORS.RESET}`;
  } else if (FEATURES.SHOW_RUNTIME && runtime) {
    if (section) section += ' via ';
    section += `${COLORS.RUNTIME}${runtime.icon} ${runtime.name}${COLORS.RESET}`;
  }

  return section;
}

function buildGitCommitSection(git) {
  const { FEATURES } = CONFIG;
  if (!git) return null;

  const parts = [];
  if (FEATURES.SHOW_GIT_AHEAD && git.ahead) parts.push(git.ahead);
  if (FEATURES.SHOW_GIT_BEHIND && git.behind) parts.push(git.behind);
  return parts.length > 0 ? parts.join(' / ') : null;
}

function buildGitFileSection(git) {
  const { FEATURES } = CONFIG;
  if (!git) return null;

  const parts = [];
  if (FEATURES.SHOW_GIT_STAGED && git.staged) parts.push(git.staged);
  if (FEATURES.SHOW_GIT_MODIFIED && git.modified) parts.push(git.modified);
  if (FEATURES.SHOW_GIT_UNTRACKED && git.untracked) parts.push(git.untracked);
  return parts.length > 0 ? parts.join(' / ') : null;
}

function buildModelSection(modelName) {
  const { COLORS, ICONS } = CONFIG;
  return `${COLORS.MODEL}${ICONS.MODEL} ${modelName}${COLORS.RESET}`;
}

function buildNoWorkspaceStatus(modelName) {
  const { COLORS, ICONS } = CONFIG;
  return `${COLORS.PROJECT}${ICONS.PROJECT} No workspace${COLORS.RESET} | ${buildModelSection(modelName)}`;
}

function buildStatus(input) {
  const { FEATURES } = CONFIG;
  const modelName = input.model?.display_name || 'Claude';
  const currentDir = input.workspace?.current_dir;

  if (!currentDir) return buildNoWorkspaceStatus(modelName);

  const project = basename(currentDir);
  const needsGitInfo = FEATURES.SHOW_GIT_BRANCH || FEATURES.SHOW_GIT_AHEAD || FEATURES.SHOW_GIT_BEHIND || FEATURES.SHOW_GIT_STAGED || FEATURES.SHOW_GIT_MODIFIED || FEATURES.SHOW_GIT_UNTRACKED;
  const git = needsGitInfo ? getCachedGitInfo(currentDir) : null;
  const framework = FEATURES.SHOW_FRAMEWORK ? detectFramework(currentDir) : null;
  const runtime = FEATURES.SHOW_RUNTIME ? detectRuntime(currentDir) : null;

  const sections = [];
  const projectSection = buildProjectSection(project, git, framework, runtime);
  if (projectSection) sections.push(projectSection);

  const commitSection = buildGitCommitSection(git);
  if (commitSection) sections.push(commitSection);

  const fileSection = buildGitFileSection(git);
  if (fileSection) sections.push(fileSection);

  if (FEATURES.SHOW_MODEL) {
    sections.push(buildModelSection(modelName));
  }

  return sections.join(' | ');
}

function getDefaultInput() {
  return { model: { display_name: 'Claude' } };
}

function readStdin() {
  try {
    const input = readFileSync(process.stdin.fd, 'utf-8');
    if (input.length > 10000) return getDefaultInput();
    const parsed = JSON.parse(input);
    return validateStatusInput(parsed);
  } catch (error) {
    if (error.code === 'EAGAIN' || error.code === 'ENOTTY' || error.code === 'EINVAL') {
      return getDefaultInput();
    }
    return getDefaultInput();
  }
}

function formatOutput(output) {
  const { COLORS } = CONFIG;
  return `${COLORS.DIM}[${COLORS.RESET} ${output} ${COLORS.DIM}]${COLORS.RESET}`;
}

function getErrorOutput() {
  const { COLORS, ICONS } = CONFIG;
  return formatOutput(`${COLORS.PROJECT}${ICONS.PROJECT} Status error${COLORS.RESET} | ${COLORS.MODEL}${ICONS.MODEL} Claude${COLORS.RESET}`);
}

async function main() {
  try {
    const input = readStdin();
    const output = buildStatus(input);
    console.log(formatOutput(output));
    process.exit(0);
  } catch {
    console.log(getErrorOutput());
    process.exit(0);
  }
}

main();
