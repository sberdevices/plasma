import React from 'react';
import styled from 'styled-components';
import { darkEva, darkJoy, darkSber, lightEva, lightJoy, lightSber } from '@sberdevices/plasma-tokens/themes';

import { Cell, CellIcon } from '../components/Cell';
import { TextBox } from '../components/TextBox';
import { Display3, Headline3, Footnote1, Caption } from '../components/Typography';

import { themeColorsComments } from './ColorsDemo';

const themes = {
    darkEva,
    darkJoy,
    darkSber,
    lightEva,
    lightJoy,
    lightSber,
};

const StyledName = styled(Footnote1)<{ color: string }>`
    display: inline;
    color: ${({ color }) => color};
`;

const StyledVariable = styled(Footnote1)<{ color: string }>`
    color: ${({ color }) => color};
`;

const StyledDescr = styled(Caption)<{ color: string }>`
    color: ${({ color }) => color};
`;

const StyledTile = styled(CellIcon)<{ background: string }>`
    width: 2.25rem;
    background: ${({ background }) => background};
`;

const StyledTitle = styled(Display3)`
    margin-bottom: 1rem;
    color: ${({ color }) => color};
`;

const StyledHeading = styled(Headline3)`
    margin: 2rem 0 1rem;
    color: ${({ color }) => color};
`;

export interface PaletteProps {
    theme?: keyof typeof themes;
    title?: string;
    heading?: string;
}

export const Palette: React.FC<PaletteProps> = ({ theme, title, heading }) => {
    const selectedTheme = themes[theme][':root'];
    const primary = selectedTheme['--plasma-colors-primary'];
    const items = React.useMemo(() => {
        return Object.entries(selectedTheme).filter(([key]) => key.match(/^--/));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    return (
        <div>
            {title && <StyledTitle color={primary}>{title}</StyledTitle>}
            {heading && <StyledHeading color={primary}>{heading}</StyledHeading>}
            {items.map(([key, value]) => {
                const prefix = '--plasma-colors-';
                const name = key.replace(prefix, '');
                return (
                    <Cell
                        key={name}
                        left={<StyledTile background={value as string} />}
                        content={
                            <TextBox>
                                <StyledVariable color={selectedTheme['--plasma-colors-secondary']}>
                                    var({prefix}
                                    <StyledName color={selectedTheme['--plasma-colors-primary']}>{name}</StyledName>)
                                </StyledVariable>
                                <StyledDescr color={selectedTheme['--plasma-colors-tertiary']}>
                                    {themeColorsComments[name]}
                                </StyledDescr>
                            </TextBox>
                        }
                    />
                );
            })}
        </div>
    );
};
