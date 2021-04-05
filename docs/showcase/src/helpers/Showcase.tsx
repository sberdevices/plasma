import styled, { css } from 'styled-components';
import { surfaceLiquid03 } from '@sberdevices/plasma-tokens';
import { Caption } from '@sberdevices/plasma-ui/components/Typography';
import { TextBox } from '@sberdevices/plasma-ui/components/TextBox';

export const ShowcaseComponentGrid = styled.div<{ cols?: number }>`
    display: grid;
    grid-template-columns: ${({ cols = 2 }) => css`
        repeat(${cols}, max-content)
    `};
    grid-column-gap: 1.5rem;
    grid-row-gap: 1.5rem;
`;

export const ShowcaseComponentRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const ShowcaseDashedBorder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.25rem;
    /* stylelint-disable-next-line number-max-precision */
    border: 0.0625rem dashed #7765f6;
    border-radius: 1.25rem;
`;

export const ShowcaseDivider = styled.div`
    box-sizing: border-box;
    height: 0.0625rem;
    border-top: 0.0625rem dashed #7765f6;
`;

export const ShowcaseHR = styled.div`
    width: 100%;
    height: 0.125rem;
    background: ${surfaceLiquid03};
`;

export const ShowcaseHead = styled(Caption)`
    && {
        font-size: 0.625rem;
        color: #7765f6;
    }
`;

export const ShowcasePanel = styled.section`
    display: flex;
    margin-bottom: 3.75rem;
    padding: 2.5rem;
    border-radius: 0.75rem;
    background: ${surfaceLiquid03};
`;

export const ShowcaseSectionName = styled(TextBox).attrs(() => ({ size: 'l' }))`
    margin-top: 3.75rem;
    margin-bottom: 1.25rem;
`;
