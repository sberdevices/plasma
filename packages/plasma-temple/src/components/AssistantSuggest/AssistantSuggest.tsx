import React from 'react';
import styled, { css } from 'styled-components';
import { Body1, Headline1, Footnote1 } from '@sberdevices/plasma-ui';
import { surfaceLiquid01, primary, secondary } from '@sberdevices/plasma-tokens';

import { useFocusOnMount } from '../../hooks/useFocusOnMount';

import { SaluteIcon } from './AssistantSuggest.assets/SaluteIcon';

export interface AssistantSuggestIconProps {
    size: 's' | 'm';
}

const sizes = {
    s: 88,
    m: 144,
};

const shadeOffset = {
    s: 116,
    m: 86,
};

export const StyledAssistantIcon = styled(SaluteIcon)`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const StyledCircles = styled.div<AssistantSuggestIconProps>`
    position: relative;
    height: 316px;
    width: 316px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: -124px;

    ${(props) =>
        props.size === 'm' &&
        css`
            margin-bottom: -64px;

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
        `}

    &::after {
        position: absolute;
        top: ${(props) => shadeOffset[props.size]}px;
        left: ${(props) => shadeOffset[props.size]}px;
        right: ${(props) => shadeOffset[props.size]}px;
        bottom: ${(props) => shadeOffset[props.size]}px;

        content: '';
        border-radius: 50%;

        opacity: 0.3;
        background: rgba(255, 255, 255, 0.06);
        box-shadow: inset 0 4px 4px rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(48px);
    }

    & ${StyledAssistantIcon} {
        ${(props) => ({
            width: `${sizes[props.size]}px`,
            height: `${sizes[props.size]}px`,
        })}
    }
`;

const StyledOkButton = styled(Footnote1)`
    position: relative;
    display: inline-flex;
    height: 78px;
    width: 78px;
    justify-content: center;
    align-items: center;
    color: ${primary};
    margin-left: 12px;
    outline: none;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        content: '';
        border-radius: 50%;

        opacity: 0.3;
        background: ${surfaceLiquid01};
        box-shadow: inset 0 4px 4px rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(48px);
    }
`;

export interface AssistantSuggestProps {
    text: string;
}

export const AssistantSuggestIcon: React.FC<AssistantSuggestIconProps> = ({ size }) => (
    <StyledCircles size={size}>
        <StyledAssistantIcon />
    </StyledCircles>
);

export const AssistantSuggestWrapper = styled.div`
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    align-self: center;

    padding: 0 260px;
`;

export const AssistantSuggestActionText = styled(Body1)`
    position: relative;

    margin-top: 16px;
    color: ${primary};
`;

export const AssistantSuggestIntent = styled(Headline1)`
    position: relative;
    margin-top: 12px;

    background: linear-gradient(96.52deg, #2ac673 11.16%, #cde730 88.53%);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
`;

export const AssistantSuggestIntentHint = styled(Body1)`
    position: relative;

    margin-top: 16px;
    color: ${secondary};
`;

export const AssistantSuggestHintText = styled(Body1)`
    position: relative;

    margin-top: 130px;
    color: ${secondary};

    & + ${AssistantSuggestIntentHint} {
        margin-top: 92px;
    }
`;

interface AssistantSuggestHintProps {
    onOkClick: () => void;
}

export const AssistantSuggestHint: React.FC<AssistantSuggestHintProps> = ({ onOkClick }) => {
    const mountRef = React.useRef<HTMLDivElement>(null);

    useFocusOnMount(mountRef, {
        delay: 250,
    });

    return (
        <AssistantSuggestHintText>
            Чтобы ввести с клавиатуры, нажмите на пульте кнопку
            <StyledOkButton ref={mountRef} tabIndex={0} onClick={onOkClick}>
                ОК
            </StyledOkButton>
        </AssistantSuggestHintText>
    );
};
