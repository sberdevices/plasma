import React from 'react';
import styled from 'styled-components';
import { Row } from '@sberdevices/plasma-ui';

import { ItemEntity, ItemEntityProps } from '../ItemEntity/ItemEntity';
import { Section } from '../Section/Section';
import { UnifiedComponentProps } from '../../../../registry/types';

export interface ItemEntitiesProps {
    list: Array<ItemEntityProps & Record<'uuid', string>>;
    index?: number;
    title: string;
}

const StyledSection = styled(Section)`
    padding-bottom: 50vh;
`;

export const ItemEntities: React.FC<UnifiedComponentProps<ItemEntitiesProps>> = React.memo(
    ({ list, platformComponents: { Title }, title }) => (
        <StyledSection>
            <Title>{title}</Title>
            <Row>
                {list.map((item) => (
                    <ItemEntity key={item.uuid} {...item} />
                ))}
            </Row>
        </StyledSection>
    ),
);
