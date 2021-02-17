import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { fonts, gradient, text } from '@sberdevices/plasma-tokens';
import { ThemeDarkEva, ThemeDarkJoy, ThemeDarkSber } from '@sberdevices/ui/components/Theme';
import { isSberPortal } from '@sberdevices/ui/utils';
import { AssistantCharacterType } from '@sberdevices/assistant-client';
import { sberBox, sberPortal } from '@sberdevices/plasma-tokens/typo';

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
    eva: ThemeDarkEva,
    joy: ThemeDarkJoy,
    sber: ThemeDarkSber,
};

interface GlogalStylesProps {
    theme: AssistantCharacterType;
}

export const GlobalStyles: React.FC<GlogalStylesProps> = ({ theme }) => {
    const Theme = React.useMemo(() => charactersTheme[theme], [theme]);

    return (
        <>
            <TypoStyles />
            <Theme />
            <DocumentStyles />
        </>
    );
};
