import { PreviewGalleryProps } from './PreviewGallery';

export type StatusType = 'success' | 'error';

export type InteractionType = 'selectable' | 'draggable';

export type AddionalItemProps = Omit<PreviewGalleryProps, 'items | onItemsSortEnd'>;
