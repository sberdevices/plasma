import React from 'react';
import styled, { css } from 'styled-components';

import { mediaQuery } from '../utils';
import { DeviceDetectionContext } from '../components/Device';
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

const StyledFullHeightCol = styled(Col)<{ $deviceScale?: number }>`
    height: 100vh;

    ${({ $deviceScale }) =>
        css`
            ${mediaQuery(
                'S',
                $deviceScale,
            )(css`
                &:nth-child(4) ~ & {
                    display: none;
                }
            `)}
            ${mediaQuery(
                'M',
                $deviceScale,
            )(css`
                &:nth-child(6) ~ & {
                    display: none;
                }
            `)}
            ${mediaQuery(
                'L',
                $deviceScale,
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
    const { deviceScale } = React.useContext(DeviceDetectionContext);

    return (
        <StyledFullHeightContainer {...rest}>
            <StyledFullHeightRow>
                {cols.map((_, i) => (
                    <StyledFullHeightCol key={`item:${i}`} size={1} $deviceScale={deviceScale}>
                        <StyledLine />
                    </StyledFullHeightCol>
                ))}
            </StyledFullHeightRow>
        </StyledFullHeightContainer>
    );
};
