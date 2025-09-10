import { stat } from 'node:fs/promises';

export async function exists(path: string): Promise<boolean> {
  return stat(path).then(() => true).catch(() => false);
}