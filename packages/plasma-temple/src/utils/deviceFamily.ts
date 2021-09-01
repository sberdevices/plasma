import { detectDevice } from '@sberdevices/plasma-ui/utils';

export const deviceFamily = detectDevice();
export const isSberBoxLike = () => detectDevice() === 'sberBox';
