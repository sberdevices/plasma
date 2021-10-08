import React from 'react';
import { Story, Meta } from '@storybook/react';
import { InSpacingDecorator, disableProps } from '@sberdevices/plasma-sb-utils';
import styled from 'styled-components';

import { ElasticGrid, ElasticGridProps } from '.';

const propsToDisable = ['ref', 'theme', 'as', 'forwardedAs'];

export default {
    title: 'Layout/ElasticGrid',
    component: ElasticGrid,
    argTypes: {
        ...disableProps(propsToDisable),
    },
    decorators: [InSpacingDecorator],
} as Meta;

interface ExtraProps {
    $width: string;
    itemsNumber: number;
}

const StyledElasticGrid = styled(ElasticGrid)<{ $width: string }>`
    width: ${({ $width }) => $width};
`;

const Item = styled.div`
    width: 100%;
    height: 100px;
    background-color: #999;
    border-radius: 10px;
`;

export const Default: Story<ExtraProps & ElasticGridProps> = ({ itemsNumber, ...props }) => {
    return (
        <StyledElasticGrid {...props}>
            {Array(itemsNumber)
                .fill(0)
                .map((_, k) => (
                    <Item key={k} />
                ))}
        </StyledElasticGrid>
    );
};

Default.args = {
    $width: '600px',
    itemsNumber: 5,
    minColWidth: 125,
    gapX: 8,
    gapY: 8,
};
