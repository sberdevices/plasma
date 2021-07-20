import { MediaObject } from '../types';

export const getMediaObjectSrc = (mediaObject: MediaObject): string =>
    Array.isArray(mediaObject.src) ? mediaObject.src[0] : mediaObject.src;
