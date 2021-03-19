import React from 'react';
import styled from 'styled-components/macro';

import { InSpacing } from '../../helpers/StoryDecorators';
import { Cell } from '../Cell';
import { Footnote1 } from '../Typography';

import { RunningString } from '.';

export default {
    title: 'Content/RunningString',
    component: RunningString,
    decorators: [InSpacing],
};

const RunningStringWrapper = styled(Cell)`
    width: 18rem;
    overflow: hidden;
`;

export const Default = () => {
    return (
        <RunningStringWrapper
            content={
                <RunningString>
                    <Footnote1>Очень очень длинный текст</Footnote1>
                </RunningString>
            }
        />
    );
};

export const Basic = () => {
    return <RunningStringWrapper content={<RunningString text="Очень очень длинный текст" />} />;
};

Basic.parameters = {
    chromatic: {
        disable: true,
    },
};
