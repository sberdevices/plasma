import styled from 'styled-components';
import { applySpacing, SpacingProps, surfaceLiquid01 } from '@sberdevices/plasma-core';

export const Filler = styled.div<SpacingProps>`
    ${applySpacing}

    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;

    width: 100%;
    padding: 0.5rem 1rem;

    background-color: ${surfaceLiquid01};
`;
