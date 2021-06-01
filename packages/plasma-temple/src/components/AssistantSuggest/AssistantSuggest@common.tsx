import React from 'react';
import styled, { css } from 'styled-components';
import { IconSalute } from '@sberdevices/plasma-icons';
import { mediaQuery } from '@sberdevices/plasma-ui/utils';

export interface AssistantSuggestProps {
    onManualFill: () => void;
    suggestion?: string;
    hint?: string;
}

export const AssistantSuggestWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    align-self: center;

    padding-top: 2rem;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            padding-top: 1rem;
        `,
    )}
`;

export const StyledAssistantIcon = styled(IconSalute)`
    min-width: 2.5rem;
    height: 2.5rem;
    z-index: 1;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            min-width: 2rem;
            height: 2rem;
        `,
    )}
`;

export const StyledCircles = styled.div`
    position: relative;
    height: 9.875rem;
    width: 9.875rem;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: -2rem;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            height: 8rem;
            width: 8rem;
        `,
    )}

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        content: '';
        border-radius: 50%;

        opacity: 0.3;
        background: rgba(255, 255, 255, 0.02);
        box-shadow: inset 0 4px 4px rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(48px);
    }

    &::after {
        position: absolute;
        width: 4.5rem;
        height: 4.5rem;

        content: '';
        border-radius: 50%;

        opacity: 0.3;
        background: rgba(255, 255, 255, 0.06);
        box-shadow: inset 0 4px 4px rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(48px);

        ${mediaQuery(
            'M',
            2,
        )(
            css`
                min-width: 4rem;
                height: 4rem;
            `,
        )}
    }
`;

export const AssistantSuggestIcon: React.FC = () => (
    <StyledCircles>
        <StyledAssistantIcon />
    </StyledCircles>
);
