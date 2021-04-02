import styled from 'styled-components';

import { Image, ImageProps } from '../Image';

export type HeaderLogoProps = Omit<ImageProps, 'height' | 'ratio' | 'customRatio'>;

/**
 * Компонент для размещения логотипа.
 */
export const HeaderLogo = styled(Image)<HeaderLogoProps>`
    width: var(--plasma-header-height);
    height: var(--plasma-header-height);
    flex: 0 0 var(--plasma-header-height);
    margin-right: 0.75rem;
`;
