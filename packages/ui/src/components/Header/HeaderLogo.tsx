import React from 'react';
import styled, { css } from 'styled-components';

import { StylingProps } from '../../types/StylingProps';
import { mediaQuery } from '../../utils/mediaQuery';

export const StyledHeaderLogo = styled.img`
    width: 2.25rem;
    height: 2.25rem;
    margin-right: 0.75rem;

    ${mediaQuery('sm')(css`
        width: 1.75rem;
        height: 1.75rem;
    `)}
`;

export interface HeaderLogoProps extends StylingProps {
    src: string;
    alt?: string;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ src, alt = 'logo', ...rest }) => (
    <StyledHeaderLogo src={src} alt={alt} {...rest} />
);
