import React from 'react';
import styled, { css } from 'styled-components';

import { mediaQuery } from '../utils';
import { Container, Row, Col } from '../components/Grid';

const StyledFullHeightContainer = styled(Container)`
    position: fixed;
    left: 0;
    right: 0;
    z-index: -1;
    margin: auto;
    height: 100vh;
`;

const StyledFullHeightRow = styled(Row)`
    height: 100vh;
`;

const StyledFullHeightCol = styled(Col)`
    height: 100vh;

    ${({ theme }) =>
        css`
            ${mediaQuery(
                'S',
                theme.deviceScale,
            )(css`
                &:nth-child(4) ~ & {
                    display: none;
                }
            `)}
            ${mediaQuery(
                'M',
                theme.deviceScale,
            )(css`
                &:nth-child(6) ~ & {
                    display: none;
                }
            `)}
            ${mediaQuery(
                'L',
                theme.deviceScale,
            )(css`
                &:nth-child(8) ~ & {
                    display: none;
                }
            `)}
        `}
`;

const StyledLine = styled.div`
    width: 100%;
    height: 100%;

    background-color: rgba(200, 255, 255, 0.23);
`;

export interface GridLinesProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Количество колонок
     */
    columns?: number;
}

/**
 * Вспомогательный компонент для демонстрации в Storybook.
 */
export const GridLines: React.FC<GridLinesProps> = ({ columns = 12, ...rest }) => {
    const cols = Array(columns).fill(0);

    return (
        <StyledFullHeightContainer {...rest}>
            <StyledFullHeightRow>
                {cols.map((_, i) => (
                    <StyledFullHeightCol key={`item:${i}`} size={1}>
                        <StyledLine />
                    </StyledFullHeightCol>
                ))}
            </StyledFullHeightRow>
        </StyledFullHeightContainer>
    );
};
