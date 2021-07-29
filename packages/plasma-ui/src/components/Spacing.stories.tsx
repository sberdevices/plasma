import React from 'react';
import styled from 'styled-components';
import { applySpacing, SpacingProps } from '@sberdevices/plasma-core';

import { Headline3, Body1, Body2, Footnote2, Caption } from './Typography';

const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;

    /* stylelint-disable-next-line selector-max-universal */
    & > * {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

export const Default = () => (
    <Wrapper>
        <Headline3 my="16x">Heading</Headline3>
        <Body1 px="10x">Some text</Body1>
        <Body2 mx={4}>Some information</Body2>
        <Footnote2 m="8x">Description</Footnote2>
        <Caption m={10}>Hello</Caption>
    </Wrapper>
);

export const Custom = () => {
    const Box1 = styled.div<SpacingProps>`
        ${applySpacing}
        width: 5rem;
        height: 5rem;
        background-color: rgba(255, 100, 100, 0.3);
    `;
    const Box2 = styled.div<SpacingProps>`
        ${applySpacing}
        width: 5rem;
        height: 5rem;
        background-color: rgba(100, 100, 255, 0.3);
    `;

    return (
        <Wrapper>
            <Box1 my={10} />
            <Box2 mx={8} />
        </Wrapper>
    );
};
