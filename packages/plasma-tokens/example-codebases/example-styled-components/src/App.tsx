import React, { useState } from 'react';

import styled, { createGlobalStyle } from 'styled-components';

import { typography } from 'plasma-tokens';
import { text, background, accent, gradient } from 'plasma-tokens';
import { darkSber, darkEva, darkJoy, lightSber, lightEva, lightJoy } from 'plasma-tokens';

// Some type helpers
type textVariants = keyof typeof typography;

// actually you could use components from plasma-styles
// For h1/h2/h3/h4/p ...
interface HeadlineProps {
  variant: Extract<textVariants,
    'display1' | 'display2' | 'display3' |
    'headline1' | 'headline2' | 'headline3' | 'headline4'
    >;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'h4';
}
const Headline = styled('div')<HeadlineProps>(
  {
    margin: 0
  },
  props => typography[props.variant]
);

interface TextProps {
  variant: textVariants;
  as?: 'span' | 'div' | 'p';
}
const Text = styled(Headline)`` as React.FC<TextProps & { style: React.CSSProperties }>;


const AppStyled = styled.div`
  padding: 30px;
  color: ${text};
  background-color: ${background};
  background-image: ${gradient};
`;

interface IButton {
  variant?: Extract<textVariants, 'button1' | 'button2'>;
}

// For Button and more complex components you could use "ui"
const Button = styled.button<IButton>`
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  border: 2px solid;
  border-color: ${accent};
  background-color: ${accent};
  color: ${text};
  outline: 0;
  ${props => typography[props.variant || 'button1']}
  
`;

Button.defaultProps = {
  variant: 'button1'
};

const themes = {
  darkSber: createGlobalStyle(darkSber),
  darkEva: createGlobalStyle(darkEva),
  darkJoy: createGlobalStyle(darkJoy),
  lightSber: createGlobalStyle(lightSber),
  lightEva: createGlobalStyle(lightEva),
  lightJoy: createGlobalStyle(lightJoy)
};


const [mode, ...restModes] = Object.keys(themes);
// document.body.setAttribute('theme', mode);
const initialModes = [...restModes, mode];


function App() {
  const [modes, setModes] = useState(initialModes);

  const cycleTheme=() => {
    const mode = modes.shift()!;
    // document.body.setAttribute('theme', mode);
    setModes([...modes, mode]);
  };

  const curMode = modes[modes.length - 1] as keyof typeof themes;
  const GlobalStyle = themes[curMode];

  return (
    <AppStyled >
      <GlobalStyle />

      <Button onClick={cycleTheme} style={{float: 'right'}}>{curMode}</Button>
      
      <Headline variant="display1" style={{ marginBottom: 20 }}>Display 1</Headline>
      <Headline variant="display2" style={{ marginBottom: 20 }}>Display 2</Headline>
      <Headline variant="display3" style={{ marginBottom: 20 }}>Display 2</Headline>

      <Headline variant="headline1" as="h1" style={{ marginBottom: 20 }}>Headline 1</Headline>
      <Headline variant="headline2" as="h2" style={{ marginBottom: 20 }}>Headline 2</Headline>
      <Headline variant="headline3" as="h3" style={{ marginBottom: 20 }}>Headline 3</Headline>
      <Headline variant="headline4" as="h4" style={{ marginBottom: 20 }}>Headline 4</Headline>

      <Text variant="body1" as="div" style={{ marginBottom: 20 }}>Body 1</Text>
      <Text variant="body2" as="div" style={{ marginBottom: 20 }}>Body 2</Text>
      <Text variant="body3" as="div" style={{ marginBottom: 20 }}>Body 3</Text>

      <Text variant="paragraph1" as="p" style={{ marginBottom: 20 }}>Paragraph Text 1</Text>
      <Text variant="paragraph2" as="p" style={{ marginBottom: 20 }}>Paragraph Text 2</Text>

      <Text variant="footnote1" as="div" style={{ marginBottom: 20 }}>Footnote 1</Text>
      <Text variant="footnote2" as="div" style={{ marginBottom: 20 }}>Footnote1 2</Text>

      <Text variant="button1" as="div" style={{ marginBottom: 20 }}>Button 1</Text>
      <Text variant="button2" as="div" style={{ marginBottom: 20 }}>Button 2</Text>

      <Text variant="caption" as="div" style={{ marginBottom: 20 }}>Caption</Text>
      <Text variant="underline" as="div" style={{ marginBottom: 20 }}>Underline</Text>
      
    </AppStyled> 
  );
}

export default App;

