import { getRegistry } from '../registry';
import { Registry } from '../registry/types';

export const useRegistry = (): Registry => getRegistry();
