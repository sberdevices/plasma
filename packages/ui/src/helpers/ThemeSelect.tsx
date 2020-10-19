import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { darkEva, darkJoy, darkSber, lightEva, lightJoy, lightSber } from 'plasma-tokens/themes';

const StyledRoot = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
`;

const StyledSelect = styled.select`
    box-sizing: border-box;
    padding: 4px 8px;
    margin-left: 8px;
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
                <span>Change theme:</span>
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
