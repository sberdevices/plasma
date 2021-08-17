import React from 'react';
import styled from 'styled-components';

import { InSpacing } from '../../helpers/StoryDecorators';
import { Footnote1 } from '../Typography';

import { Marquee } from '.';

export default {
    title: 'Content/Marquee',
    component: Marquee,
    decorators: [InSpacing],
};

const MarqueeWrapper = styled.div`
    width: 18rem;
    overflow: hidden;
`;

export const Default = () => {
    return (
        <MarqueeWrapper>
            <Marquee>
                <Footnote1>Очень очень длинный текст бегущей строки</Footnote1>
            </Marquee>
        </MarqueeWrapper>
    );
};

export const Basic = () => {
    return (
        <MarqueeWrapper>
            <Marquee>Очень очень длинный текст бегущей строки</Marquee>
        </MarqueeWrapper>
    );
};

Basic.parameters = {
    chromatic: {
        disable: true,
    },
};
