import React from 'react';
import styled, { css } from 'styled-components';

import { mediaQuery } from '../../utils/mediaQuery';

export const StyledHeaderLogo = styled.img`
    width: 2.25rem;
    height: 2.25rem;
    margin-right: 0.75rem;

    ${mediaQuery('S')(css`
        width: 1.75rem;
        height: 1.75rem;
    `)}
`;

export interface HeaderLogoProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    alt?: string;
}

/**
 * Компонент для размещения логотипа.
 */
export const HeaderLogo: React.FC<HeaderLogoProps> = ({ alt = 'logo', ...rest }) => (
    <StyledHeaderLogo alt={alt} {...rest} />
);
