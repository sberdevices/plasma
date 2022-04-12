import React from 'react';
import styled from 'styled-components';
import { Col, Headline3, Row } from '@sberdevices/plasma-ui';

import { ItemEntityType } from '../types';

import { ItemEntityMobile } from './ItemEntity/ItemEntity@mobile';
import { ItemEntitiesProps } from './ItemEntities@common';

type EntityColumns<Id = unknown> = ItemEntityType<Id>[][];

function setEntityImageRatio<Id = unknown>(entity: ItemEntityType<Id>, isOddColumn: boolean, index: number) {
    if (entity.image.ratio || entity.image.customRatio) {
        return entity;
    }

    const isOddEntity = (index + 1) % 2;
    const customRatio = (isOddColumn && isOddEntity) || (!isOddColumn && !isOddEntity) ? '145.238' : '100';

    return {
        ...entity,
        image: {
            ...entity.image,
            customRatio,
        },
    };
}

const StyledTitle = styled(Headline3)`
    margin-bottom: 1rem;
`;

const StyledEntity = styled.div`
    margin-bottom: 0.5rem;
`;

export function ItemEntitiesMobile<Id = unknown>({
    className,
    title,
    entities,
    entityComponent,
    onClick,
}: ItemEntitiesProps<Id>) {
    const EntityComponent = entityComponent ?? ItemEntityMobile;

    const columns = React.useMemo(
        () =>
            entities.reduce(
                (acc, entity, index) => {
                    const key = (index + 1) % 2 ? 0 : 1;
                    acc[key].push(entityComponent ? entity : setEntityImageRatio(entity, !key, acc[key].length));
                    return acc;
                },
                [[], []] as EntityColumns<Id>,
            ),
        [entities, entityComponent],
    );

    return (
        <div className={className}>
            {title && <StyledTitle>{title}</StyledTitle>}
            <Row>
                {columns.map((column, columnIndex) => (
                    <Col sizeS={2} key={columnIndex}>
                        {column.map((entity, index) => (
                            <StyledEntity key={String(entity.id)}>
                                <EntityComponent<Id>
                                    key={String(entity.id)}
                                    entity={entity}
                                    index={index}
                                    onClick={onClick}
                                />
                            </StyledEntity>
                        ))}
                    </Col>
                ))}
            </Row>
        </div>
    );
}
