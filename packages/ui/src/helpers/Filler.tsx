import styled, { css } from 'styled-components';

import { applyView, ViewProps } from '../mixins/applyView';

interface FillerProps extends ViewProps {
    bordered?: boolean;
    fullHeight?: boolean;
}

export const Filler = styled.div<FillerProps>`
    display: flex;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;

    width: 100%;
    min-height: 2rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;

    border-radius: 0.25rem;

    ${({ view = 'secondary' }) => applyView({ view })};
    ${({ bordered }) =>
        bordered &&
        css`
            border: 1px solid;
        `}
    ${({ fullHeight }) =>
        fullHeight &&
        css`
            height: 100%;
        `}
`;
