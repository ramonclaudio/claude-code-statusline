import { copyClaudeDirectory } from './files.js';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';
import { exists } from './utils.js';
import { ErrorCode } from './types.js';
import { logger, LogLevel, configureLogger } from './logger.js';

export interface InitOptions {
  dryRun?: boolean;
}

export interface InitResult {
  success: boolean;
  filesCreated: number;
  message: string;
  createdFiles?: string[];
  projectName?: string;
  dryRun?: boolean;
  errorCode?: ErrorCode;
}

class InitError extends Error {
  constructor(message: string, public code: ErrorCode) {
    super(message);
    this.name = 'InitError';
  }
}

async function validateTargetDirectory(projectPath: string): Promise<void> {
  try {
    const targetStat = await fs.stat(projectPath);
    if (!targetStat.isDirectory()) {
      throw new InitError(
        `INVALID PATH: Not a directory\n` +
        `Action: Ensure path exists and is a directory`,
        ErrorCode.INVALID_TARGET_DIRECTORY
      );
    }
  } catch (error) {
    if (error instanceof InitError) throw error;
    throw new InitError(
      `CANNOT ACCESS: Target directory\n` +
      `Action: Check path exists and you have read permissions`,
      ErrorCode.INVALID_TARGET_DIRECTORY
    );
  }
  
  const testFile = join(projectPath, `.claude-test-${Date.now()}`);
  try {
    await fs.writeFile(testFile, 'test');
    await fs.unlink(testFile);
  } catch (error) {
    throw new InitError(
      `NO WRITE PERMISSION\n` +
      `Action: Check directory permissions`,
      ErrorCode.NO_WRITE_PERMISSION
    );
  }
}

async function validateSkelFiles(): Promise<void> {
  const skelDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'skel');
  
  if (!await exists(skelDir)) {
    throw new InitError(
      `PACKAGE CORRUPTED: Skeleton files missing\n` +
      `Expected: ${skelDir}\n` +
      `Action: Reinstall with 'npm install -g claude-code-status-line'`,
      ErrorCode.SKELETON_FILES_MISSING
    );
  }
  
  const requiredFiles = [
    '.claude/settings.local.json',
    '.claude/scripts/statusline.cjs',
    '.claude/scripts/statusline-git.cjs',
    '.claude/scripts/statusline-detect.cjs'
  ];
  
  const missingFiles: string[] = [];
  await Promise.all(
    requiredFiles.map(async file => {
      const filePath = join(skelDir, file);
      if (!await exists(filePath)) {
        missingFiles.push(file);
      }
    })
  );
  
  if (missingFiles.length > 0) {
    throw new InitError(
      `PACKAGE CORRUPTED: Required files missing\n` +
      `Missing: ${missingFiles.join(', ')}\n` +
      `Action: Reinstall with 'npm install -g claude-code-status-line'`,
      ErrorCode.SKELETON_FILES_MISSING
    );
  }
}

async function checkExistingFiles(projectPath: string): Promise<string[]> {
  const files = ['.claude/settings.local.json'];
  const existing: string[] = [];
  
  await Promise.all(
    files.map(async file => {
      const filePath = join(projectPath, file);
      if (await exists(filePath)) {
        existing.push(file);
      }
    })
  );
  
  return existing;
}

async function countFilesRecursively(dir: string): Promise<number> {
  let count = 0;
  
  async function traverse(currentDir: string): Promise<void> {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isFile()) {
        count++;
      } else if (entry.isDirectory()) {
        await traverse(join(currentDir, entry.name));
      }
    }
  }
  
  await traverse(dir);
  return count;
}

async function performDryRun(projectPath: string): Promise<InitResult> {
  const skelDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'skel');
  const claudeFiles = await countFilesRecursively(join(skelDir, '.claude'));
  const projectName = basename(projectPath);
  
  return {
    success: true,
    filesCreated: claudeFiles,
    message: `[DRY RUN] Would create ${claudeFiles} status line files for ${projectName}`,
    dryRun: true,
    projectName
  };
}

async function performFileCopy(projectPath: string): Promise<{ filesCreated: number; backupDir?: string | undefined }> {
  const claudeResult = await copyClaudeDirectory(projectPath);
  
  return {
    filesCreated: claudeResult.filesProcessed,
    backupDir: claudeResult.backupDir
  };
}

async function validateInstallation(projectPath: string): Promise<void> {
  const criticalFiles = ['.claude/settings.local.json', '.claude/scripts/statusline.cjs'];
  const missing: string[] = [];
  
  await Promise.all(
    criticalFiles.map(async file => {
      const filePath = join(projectPath, file);
      if (!await exists(filePath)) {
        missing.push(file);
      }
    })
  );
  
  if (missing.length > 0) {
    throw new InitError(
      `INSTALLATION FAILED: Critical files not created\n` +
      `Missing: ${missing.join(', ')}\n` +
      `Action: Check disk space and permissions, then retry`,
      ErrorCode.VALIDATION_FAILED
    );
  }
}

export async function init(
  projectPath: string,
  options: InitOptions = {}
): Promise<InitResult> {
  const { dryRun = false } = options;
  const projectName = basename(projectPath);
  
  configureLogger({
    level: LogLevel.INFO,
    silent: true
  });
  
  try {
    await validateSkelFiles();
    await validateTargetDirectory(projectPath);
    
    await checkExistingFiles(projectPath);
    
    if (dryRun) {
      return await performDryRun(projectPath);
    }
    
    const { filesCreated, backupDir } = await performFileCopy(projectPath);
    
    if (backupDir) {
      logger.info('Created backup', { dir: backupDir });
    }
    
    await validateInstallation(projectPath);
    
    return {
      success: true,
      filesCreated,
      message: `Successfully installed status line (${filesCreated} files) for ${projectName}`,
      projectName
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorCode = error instanceof InitError ? error.code : ErrorCode.UNKNOWN_ERROR;
    
    logger.error('Initialization failed', { error: errorMessage, code: errorCode });
    
    return {
      success: false,
      filesCreated: 0,
      message: errorMessage,
      errorCode
    };
  }
}