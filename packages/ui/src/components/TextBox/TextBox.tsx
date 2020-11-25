import React from 'react';
import styled from 'styled-components';
import { primary, secondary } from '@sberdevices/plasma-tokens';

import { Body1, Footnote1, Headline1, Headline3 } from '../Typography';

export const Title = styled(Body1)`
    margin: 0.125rem 0;
    color: ${primary};
`;

export const BigTitle = styled(Headline3)`
    margin: 0.5rem 0;
    color: ${primary};
`;

export const BiggerTitle = styled(Headline1)`
    margin: 0.5rem 0;
    color: ${primary};
`;

export const Label = styled.div`
    margin: 0.375rem 0;
    color: ${({ color }) => color || secondary};
`;

export const SubTitle = styled(Footnote1)`
    margin: 0.125rem 0;
    color: ${({ color }) => color || secondary};
`;

export const Caption = styled.div`
    margin: 0.25rem 0;
    color: ${({ color }) => color || secondary};
`;

export const TextBoxRoot = styled.div`
    & > :first-child {
        margin-top: 0;
    }

    & > :last-child {
        margin-bottom: 0;
    }
`;

export interface TextPttrnProps {
    label?: string;
    title?: string;
    subTitle?: string;
    caption?: string;

    size?: 'm' | 'l';
}

export const TextBox: React.FC<TextPttrnProps> = ({
    label,
    title,
    subTitle,
    caption,
    size = 'm',
    children,
    ...rest
}) => {
    if (children) {
        return <TextBoxRoot>{children}</TextBoxRoot>;
    }

    const T = size === 'm' ? Title : BigTitle;

    return (
        <TextBoxRoot {...rest}>
            {label && <Label>{label}</Label>}
            {title && <T>{title}</T>}
            {subTitle && <SubTitle>{subTitle}</SubTitle>}
            {caption && <Caption>{caption}</Caption>}
        </TextBoxRoot>
    );
};
