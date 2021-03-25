import React from 'react';
import styled from 'styled-components';

import { Palette, UIStoryDecorator } from '../helpers';

export default {
    title: 'UI',
    decorators: [UIStoryDecorator],
};

const darkThemes = ['darkEva', 'darkJoy', 'darkSber'];
const lightThemes = ['lightEva', 'lightJoy', 'lightSber'];

const StyledContainer = styled.div`
    display: flex;
`;

const StyledBackground = styled.div<{ background: string }>`
    width: 50%;
    padding: 1rem;
    background: ${({ background }) => background};
`;

export const Colors = () => {
    return (
        <StyledContainer>
            <StyledBackground background="#292929">
                {darkThemes.map((theme, i) => (
                    <>
                        <Palette
                            key={`item:${i}`}
                            theme={theme as 'darkSber'}
                            title={i === 0 ? '🌚 Dark Theme Colors' : ''}
                            heading={theme}
                        />
                    </>
                ))}
            </StyledBackground>
            <StyledBackground background="#FAFAFA">
                {lightThemes.map((theme, i) => (
                    <>
                        <Palette
                            key={`item:${i}`}
                            theme={theme as 'lightSber'}
                            title={i === 0 ? '🌝 Light Theme Colors' : ''}
                            heading={theme}
                        />
                    </>
                ))}
            </StyledBackground>
        </StyledContainer>
    );
};
