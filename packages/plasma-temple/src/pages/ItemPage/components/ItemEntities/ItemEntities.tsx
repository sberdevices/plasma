import React from 'react';
import { Row } from '@sberdevices/plasma-ui';

import { ItemEntity, ItemEntityProps } from '../ItemEntity/ItemEntity';
import { Section } from '../Section/Section';
import { UnifiedComponentProps } from '../../../../registry/types';

export interface ItemEntitiesProps {
    list: Array<ItemEntityProps & Record<'uuid', string>>;
    index?: number;
    title: string;
    Component?: React.ComponentType<ItemEntityProps>;
}

export const ItemEntities: React.FC<UnifiedComponentProps<ItemEntitiesProps, 'Title'>> = React.memo(
    ({ list, platformComponents: { Title }, title, Component }) => {
        const EntityComponent = Component ?? ItemEntity;
        return (
            <Section>
                <Title>{title}</Title>
                <Row>
                    {list.map((item) => (
                        <EntityComponent key={item.uuid} {...item} />
                    ))}
                </Row>
            </Section>
        );
    },
);
