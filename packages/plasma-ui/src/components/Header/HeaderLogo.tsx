import styled from 'styled-components';

import { Image, ImageProps } from '../Image';

export type HeaderLogoProps = Omit<ImageProps, 'height' | 'ratio' | 'customRatio'>;

/**
 * Компонент для размещения логотипа.
 */
export const HeaderLogo = styled(Image)<HeaderLogoProps>`
    --plasma-header-size: var(--plasma-header-height);

    width: var(--plasma-header-size);
    height: var(--plasma-header-size);
    flex: 0 0 var(--plasma-header-size);
    margin-right: 0.75rem;
`;
