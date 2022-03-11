import React from 'react';
import styled, { css } from 'styled-components';
import { Carousel, CarouselCol, Headline3, mediaQuery, Row } from '@sberdevices/plasma-ui';

import { ItemEntityType } from '../types';

import { ItemEntityProps } from './ItemEntity/ItemEntity@common';
import { ItemEntity } from './ItemEntity/ItemEntity';

export type EntitiesView = 'grid' | 'carousel';
export interface ItemEntitiesProps<Id = unknown> {
    /** Заголовок */
    title?: string;
    /** Список элементов */
    entities: ItemEntityType<Id>[];
    /** Вид. Не используется в мобильной версии */
    view?: EntitiesView;
    /** Компонент для отображения кастомных карточек */
    entityComponent?: React.ComponentType<ItemEntityProps<Id>>;
    /** Колбэк, выззываемый при колике по карточке */
    onClick: (id: Id) => void;
    className?: string;
}

const StyledTitle = styled(Headline3)`
    margin-bottom: 1rem;
`;

const StyledEntitiesGridContainer = styled.div`
    display: grid;
    grid-gap: 1.75rem 1rem;
    grid-template-columns: repeat(4, 1fr);

    ${mediaQuery(
        'M',
        2,
    )(css`
        grid-template-columns: repeat(3, 1fr);
    `)}
`;

const StyledEntity = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledRow = styled(Row)`
    padding-top: var(--plasma-grid-gutter);
    margin-top: calc(var(--plasma-grid-gutter) * -1);
`;

export function ItemEntitiesCommon<Id = unknown>({
    className,
    title,
    entities,
    entityComponent,
    view = 'grid',
    onClick,
}: ItemEntitiesProps<Id>) {
    const [carouselIndex, setCarouselIndex] = React.useState(0);
    const EntityComponent = entityComponent ?? ItemEntity;

    return (
        <div className={className}>
            {title && <StyledTitle>{title}</StyledTitle>}
            {view === 'grid' ? (
                <StyledEntitiesGridContainer>
                    {entities.map((entity, index) => (
                        <StyledEntity>
                            <EntityComponent<Id>
                                key={String(entity.id)}
                                entity={entity}
                                index={index}
                                onClick={onClick}
                            />
                        </StyledEntity>
                    ))}
                </StyledEntitiesGridContainer>
            ) : (
                <Carousel as={StyledRow} axis="x" index={carouselIndex} scrollAlign="start" paddingEnd="5rem">
                    {entities.map((entity, index) => (
                        <CarouselCol scrollSnapAlign="start" sizeXL={3} sizeM={2}>
                            <EntityComponent<Id>
                                key={String(entity.id)}
                                entity={entity}
                                index={index}
                                onClick={onClick}
                                onFocus={setCarouselIndex}
                            />
                        </CarouselCol>
                    ))}
                </Carousel>
            )}
        </div>
    );
}
