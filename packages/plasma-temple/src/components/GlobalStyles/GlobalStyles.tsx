import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { fonts, gradient, text } from '@sberdevices/plasma-tokens';
import { darkJoy, darkEva, darkSber } from '@sberdevices/plasma-tokens/themes';
import { CharacterId } from '@sberdevices/assistant-client';

import { AppStateContext } from '../PlasmaApp/AppStateContext';

const DocumentStyles = createGlobalStyle`
    /* stylelint-disable selector-nested-pattern */
    :root {
        ${
            process.env.NODE_ENV === 'development' || window.Cypress != null
                ? {
                      backgroundImage: gradient,
                      backgroundAttachment: 'fixed',
                  }
                : {
                      background: 'unset',
                  }
        }
    }

    html {
        height: 100vh;
        height: -webkit-fill-available;

        font-family: ${fonts.Medium};
    }

    body {
        margin: 0;

        color: ${text};
        min-height: 100vh;
        min-height: -webkit-fill-available;
    }
    /* stylelint-enable selector-nested-pattern */
`;

const charactersTheme: Record<CharacterId, React.ComponentType> = {
    eva: createGlobalStyle(darkEva),
    joy: createGlobalStyle(darkJoy),
    sber: createGlobalStyle(darkSber),
};

interface GlobalStylesProps {
    customTheme?: any;
}

export const GlobalStyles: React.FC<GlobalStylesProps> = React.memo((props) => {
    const { state } = React.useContext(AppStateContext);
    const Theme = React.useMemo(() => charactersTheme[state.ui.character], [state.ui.character]);
    const { customTheme } = props;

    const CustomTheme = customTheme ? createGlobalStyle(customTheme) : Theme;

    return (
        <>
            <CustomTheme />
            <DocumentStyles />
        </>
    );
});
