import React from 'react';
import styled from 'styled-components';
import { general, additional } from '@sberdevices/plasma-colors';

import { ThemeColors, ThemeBG, PaletteGrid, flattenPalette } from '../helpers';

const darkThemes = ['dark'];
const lightThemes = ['light'];

const StyledContainer = styled.div`
    display: flex;
`;

export const Default = () => {
    return (
        <StyledContainer>
            <ThemeBG mode="light">
                {lightThemes.map((theme, i) => (
                    <>
                        <ThemeColors
                            key={`item:${i}`}
                            theme={theme as 'light'}
                            title={i === 0 ? '🌝 Light Theme Colors' : ''}
                            heading={theme}
                        />
                    </>
                ))}
            </ThemeBG>
            <ThemeBG mode="dark">
                {darkThemes.map((theme, i) => (
                    <>
                        <ThemeColors
                            key={`item:${i}`}
                            theme={theme as 'dark'}
                            title={i === 0 ? '🌚 Dark Theme Colors' : ''}
                            heading={theme}
                        />
                    </>
                ))}
            </ThemeBG>
        </StyledContainer>
    );
};

const generalColors = flattenPalette(general);
const additionalColors = flattenPalette(additional);

export const General = () => <PaletteGrid colors={generalColors} />;
export const Additional = () => <PaletteGrid colors={additionalColors} />;
