import { MediaObject } from '../types';

export const isMediaObject = (value: unknown): value is MediaObject =>
    typeof value === 'object' && value !== null && 'src' in value;
