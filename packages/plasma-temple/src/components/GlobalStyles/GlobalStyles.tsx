import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { fonts, gradient, text } from '@sberdevices/plasma-tokens';
import { darkJoy, darkEva, darkSber } from '@sberdevices/plasma-tokens/themes';
import { isSberPortal } from '@sberdevices/plasma-ui/utils';
import { AssistantCharacterType } from '@sberdevices/assistant-client';
import { sberBox, sberPortal } from '@sberdevices/plasma-tokens/typo';

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

        font-family: ${fonts.Medium};
    }

    body {
        margin: 0;

        color: ${text};
        min-height: 100vh;
    }
    /* stylelint-enable selector-nested-pattern */
`;

const TypoStyles = createGlobalStyle(isSberPortal() ? sberPortal : sberBox);

const charactersTheme: Record<AssistantCharacterType, React.ComponentType> = {
    eva: createGlobalStyle(darkEva),
    joy: createGlobalStyle(darkJoy),
    sber: createGlobalStyle(darkSber),
};

export const GlobalStyles: React.FC = React.memo(() => {
    const { state } = React.useContext(AppStateContext);
    const Theme = React.useMemo(() => charactersTheme[state.ui.character], [state.ui.character]);

    return (
        <>
            <TypoStyles />
            <Theme />
            <DocumentStyles />
        </>
    );
});
