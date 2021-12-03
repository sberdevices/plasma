import { DeviceThemeProvider  } from "@sberdevices/plasma-ui";
import { addDecorator } from '@storybook/react';
import { text, background, gradient, darkSber } from '@sberdevices/plasma-tokens';
import { createGlobalStyle } from "styled-components";

const DocumentStyle = createGlobalStyle`
    html:root {
        min-height: 100vh;
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
    }
`;

const Theme = createGlobalStyle(darkSber);

const withTheme = (Story, context) => {
  return (
      <DeviceThemeProvider detectDeviceCallback={() => 'mobile'}>
          <Theme />
          <DocumentStyle />
          <Story {...context} />
      </DeviceThemeProvider>
  );
};

addDecorator(withTheme);

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};
