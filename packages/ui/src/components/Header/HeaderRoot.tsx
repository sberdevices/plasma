import React from 'react';
import styled from 'styled-components';
import { scalingPixelBasis } from '@sberdevices/plasma-tokens';

import { mediaQuery } from '../../utils/mediaQuery';

import { StyledHeaderBackButton } from './HeaderBack';
import { HeaderSubtitle } from './HeaderSubtitle';

const height = 36 / scalingPixelBasis;
const paddingY = 30 / scalingPixelBasis;

const StyledHeaderRoot = styled.header`
    position: relative;

    display: flex;
    align-items: center;
    box-sizing: content-box;

    width: 100%;
    height: ${height}rem;
    padding-top: ${paddingY}rem;
    padding-bottom: ${paddingY}rem;

    ${mediaQuery('xl')(`
        & ${StyledHeaderBackButton} {
            display: none;
        }
    `)}

    ${mediaQuery('sm')(`
        & ${HeaderSubtitle} {
            display: none;
        }
    `)}
`;

export const HeaderRoot: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
    <StyledHeaderRoot {...rest}>{children}</StyledHeaderRoot>
);
