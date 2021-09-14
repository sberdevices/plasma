import React from 'react';
import styled from 'styled-components';
import { Body1, Caption, white, whiteSecondary, black } from '@sberdevices/plasma-core';

import type { ColorsGrid } from '../helpers/flattenPalette';

const textColors = {
    1000: [white, whiteSecondary],
    950: [white, whiteSecondary],
    900: [white, whiteSecondary],
    850: [white, whiteSecondary],
    800: [white, whiteSecondary],
    700: [white, whiteSecondary],
    600: [white, whiteSecondary],
    500: [white, whiteSecondary],
    400: [white, whiteSecondary],
    300: [black, black],
    250: [black, black],
    200: [black, black],
    150: [black, black],
    100: [black, black],
};

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: max-content repeat(14, 200px);
`;

const shadow =
    'inset 0px 1px 1px rgba(255, 255, 255, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.05), 0px 4px 14px rgba(0, 0, 0, 0.08)';

const StyledTile = styled.div`
    position: relative;

    padding-bottom: 50%;

    transition: transform 0.1s ease-out;

    &:hover {
        z-index: 1;
        transform: scale(1.1);
        box-shadow: ${shadow};
    }
`;
const StyledColorCard = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;

    padding: 12px;

    ${StyledTile}:hover & {
        opacity: 0;
    }
`;
const StyledHoverCard = styled(StyledColorCard)`
    align-items: center;
    justify-content: center;

    opacity: 0;
    transition: opacity 0.15s ease-in-out;

    ${StyledTile}:hover & {
        opacity: 1;
    }
`;
const ShowcaseHead = styled(Caption)`
    padding: 12px;
    font-size: 0.625rem;
    color: #7765f6;
`;

export const PaletteGrid = ({ colors }: { colors: ColorsGrid }) => (
    <StyledGrid>
        {colors.map(({ name, row }, i) => (
            <React.Fragment key={`item:${i}`}>
                <ShowcaseHead>{name}</ShowcaseHead>
                {row.map(([sat, hex], j) => (
                    <StyledTile key={`item:${i}${j}`} style={{ background: hex }}>
                        <StyledColorCard>
                            <Body1 style={{ color: textColors[sat][0] }}>{sat}</Body1>
                            <Caption style={{ color: textColors[sat][1] }}>{hex}</Caption>
                        </StyledColorCard>
                        <StyledHoverCard>
                            <Body1 style={{ color: textColors[sat][0] }}>
                                {name} {sat} {hex}
                            </Body1>
                        </StyledHoverCard>
                    </StyledTile>
                ))}
            </React.Fragment>
        ))}
    </StyledGrid>
);
