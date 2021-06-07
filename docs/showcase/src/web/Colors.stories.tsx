import React from 'react';
import styled from 'styled-components';

import { Palette, WebStoryDecorator } from '../helpers';

export default {
    title: 'Web',
    decorators: [WebStoryDecorator],
};

const darkThemes = ['dark'];
const lightThemes = ['light'];

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
            <StyledBackground background="#292929">
                {darkThemes.map((theme, i) => (
                    <>
                        <Palette
                            key={`item:${i}`}
                            theme={theme as 'dark'}
                            title={i === 0 ? '🌚 Dark Theme Colors' : ''}
                            heading={theme}
                        />
                    </>
                ))}
            </StyledBackground>
        </StyledContainer>
    );
};
