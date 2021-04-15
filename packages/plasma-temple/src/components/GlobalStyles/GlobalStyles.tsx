import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { fonts, gradient, text } from '@sberdevices/plasma-tokens';
import { darkJoy, darkEva, darkSber } from '@sberdevices/plasma-tokens/themes';
import { isSberPortal } from '@sberdevices/plasma-ui/utils';
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
    eva: createGlobalStyle(darkEva),
    joy: createGlobalStyle(darkJoy),
    sber: createGlobalStyle(darkSber),
};

interface GlobalStylesProps {
    character: AssistantCharacterType;
}

export const GlobalStyles: React.FC<GlobalStylesProps> = ({ character }) => {
    const Theme = React.useMemo(() => charactersTheme[character], [character]);

    return (
        <>
            <TypoStyles />
            <Theme />
            <DocumentStyles />
        </>
    );
};
