import React from 'react';
import styled from 'styled-components';

import { InSpacing } from '../../helpers/StoryDecorators';
import { Cell } from '../Cell';
import { Footnote1 } from '../Typography';

import { Marquee } from '.';

export default {
    title: 'Content/Marquee',
    component: Marquee,
    decorators: [InSpacing],
};

const MarqueeWrapper = styled(Cell)`
    width: 18rem;
    overflow: hidden;
`;

export const Default = () => {
    return (
        <MarqueeWrapper
            content={
                <Marquee>
                    <Footnote1>Очень очень длинный текст</Footnote1>
                </Marquee>
            }
        />
    );
};

export const Basic = () => {
    return <MarqueeWrapper content={<Marquee text="Очень очень длинный текст" />} />;
};

Basic.parameters = {
    chromatic: {
        disable: true,
    },
};
