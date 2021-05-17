import React from 'react';
import styled, { CSSObject } from 'styled-components';

import { useInsets } from '../../hooks';
import { AssistantInsets } from '../../store';

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

export const Layout: React.FC = ({ children }) => {
    const insets = useInsets();

    return <StyledLayout insets={insets}>{children}</StyledLayout>;
};
