import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { darkEva, darkJoy, darkSber, lightEva, lightJoy, lightSber } from '@sberdevices/plasma-tokens/themes';
import { sberBox, sberPortal, touch } from '@sberdevices/plasma-tokens/typo';

const StyledRoot = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
`;

const StyledSelect = styled.select`
    box-sizing: border-box;
    padding: 4px 8px;
    font-size: 28px;
    margin: 10px;
`;

const themeNames = ['darkEva', 'darkJoy', 'darkSber', 'lightEva', 'lightJoy', 'lightSber'];

const themes = {
    darkEva: createGlobalStyle(darkEva),
    darkSber: createGlobalStyle(darkSber),
    darkJoy: createGlobalStyle(darkJoy),
    lightEva: createGlobalStyle(lightEva),
    lightSber: createGlobalStyle(lightSber),
    lightJoy: createGlobalStyle(lightJoy),
};

export const ThemeSelect: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState('darkSber');

    const Theme = themes[currentTheme];

    return (
        <>
            <Theme />
            <StyledRoot>
                <span style={{ fontSize: 28 }}>Change theme:</span>
                <StyledSelect value={currentTheme} onChange={(e) => setCurrentTheme(e.target.value)}>
                    {themeNames.map((theme) => (
                        <option key={theme} value={theme}>
                            {theme}
                        </option>
                    ))}
                </StyledSelect>
            </StyledRoot>
        </>
    );
};

const typoNames = ['sberBox', 'sberPortal', 'touch'];

const typos = {
    sberBox: createGlobalStyle(sberBox),
    sberPortal: createGlobalStyle(sberPortal),
    touch: createGlobalStyle(touch),
};

export const TypoSelect: React.FC = () => {
    const [currentTypo, setCurrentTypo] = useState('sberBox');

    const Typo = typos[currentTypo];

    return (
        <>
            <Typo />
            <StyledRoot>
                <span style={{ fontSize: 28 }}>Change device scale:</span>
                <StyledSelect value={currentTypo} onChange={(e) => setCurrentTypo(e.target.value)}>
                    {typoNames.map((typo) => (
                        <option key={typo} value={typo}>
                            {typo}
                        </option>
                    ))}
                </StyledSelect>
            </StyledRoot>
        </>
    );
};
