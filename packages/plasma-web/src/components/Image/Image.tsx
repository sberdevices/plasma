import styled from 'styled-components';
import { Image as BaseImage, ImageProps as BaseProps } from '@sberdevices/plasma-core';

export type ImageProps = BaseProps;

/**
 * Компонент для отображения картинок.
 */
export const Image: React.FC<ImageProps> = styled(BaseImage)``;
