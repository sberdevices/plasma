import React from 'react';
import styled, { CSSObject } from 'styled-components';

import { Insets, useInsets } from '../../hooks';
import { AssistantInsets } from '../../store';

interface LayoutProps {
    ignoreInsets?: boolean;
}

interface StyledLayoutProps {
    insets: AssistantInsets;
}

const capitalize = (string: string): string => `${string[0].toUpperCase()}${string.slice(1)}`;

const insetsToCSSObject = ({ insets }: StyledLayoutProps): CSSObject =>
    (Object.keys(insets) as Array<keyof AssistantInsets>).reduce((acc, key) => {
        if (insets[key]) {
            acc[`padding${capitalize(key)}`] = insets[key];
        }

        return acc;
    }, {} as CSSObject);

export const StyledLayout = styled.div<StyledLayoutProps>`
    ${insetsToCSSObject}
`;

const defaultInsets: Insets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};

export const Layout: React.FC<LayoutProps> = ({ children, ignoreInsets }) => {
    const insets = useInsets();

    return <StyledLayout insets={ignoreInsets ? defaultInsets : insets}>{children}</StyledLayout>;
};
