import { promisify } from 'util';
import { exec as cpExec } from 'child_process';

export const exec = promisify(cpExec);
