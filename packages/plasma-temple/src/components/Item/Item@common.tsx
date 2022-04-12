import React from 'react';
import styled, { css } from 'styled-components';
import { Col, Row, mediaQuery } from '@sberdevices/plasma-ui';

import { isSberBoxLike } from '../../utils';
import { Insets } from '../../types';
import { useScrollByBreakpoints } from '../Product/hooks/useScrollByBreakpoints';
import { UnifiedComponentProps } from '../../registry/types';

import { ItemDetailsItem } from './ItemDetails/ItemDetails';
import { ItemEntityProps } from './ItemEntities/ItemEntity/ItemEntity@common';
import { ItemMainSection } from './ItemMainSection/ItemMainSection';
import { EntitiesView, ItemEntitiesProps } from './ItemEntities/ItemEntities@common';
import { ItemEntityType } from './types';
import { ItemBackgroundProps } from './ItemBackground/ItemBackground@common';

type PlatformComponents<EntityId = unknown> = {
    ItemBackground: ItemBackgroundProps;
    ItemEntities: ItemEntitiesProps<EntityId>;
};

export interface ItemProps<EntityId = unknown> {
    /** Заголовок */
    title: string;
    /** Подзаголовок */
    subtitle?: string;
    /** Детали (характеристики) */
    details?: ItemDetailsItem[];
    /** Список шагов (элементов) или аналогичных сущностей */
    entities: ItemEntityType<EntityId>[];
    /** Заголовок шагов (элементов) */
    entitiesTitle: string;
    /** Кнопка отвечающая за действие, например начало проигрывания шагов элемента */
    actionButtonProps?: {
        /** Контент кнопки */
        actionButtonText?: React.ReactNode;
        /** Колбэк, вызываемый при клике по кнопке */
        onActionButtonClick?: () => void;
        /** Кастомные кнопки, если указаны, то кнопка по умолчанию не используется */
        buttons?: React.ReactNode;
    };
    /** Компонент для отображения кастомных карточек шагов */
    entityComponent?: React.ComponentType<ItemEntityProps<EntityId>>;
    /** Фоновое изображение */
    background?: string;
    className?: string;
    /**
     * Отступы вокруг компонента, на текущий момент используется только отступ снизу,
     */
    insets?: Partial<Insets>;
    /** Вид карточек шагов. Возможны два варианта `grid` или `carousel`. Не используется в мобильной версии */
    entitiesView?: EntitiesView;
    /** Колбэк, вызываемый при клике по карточке шага */
    onEntityClick: (id: EntityId) => void;
}

export type ItemComponent = <EntityId = unknown>(props: ItemProps<EntityId>) => React.ReactElement;

const StyledContainer = styled(Row)<{ $bottom?: number }>`
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;

    &::-webkit-scrollbar {
        display: none;
        opacity: 0;
        width: 0;
    }

    padding-bottom: ${({ $bottom }) => $bottom ?? 0}px;

    ${mediaQuery(
        'S',
        1,
    )(css`
        overflow-y: unset;
    `)}
`;

/**
 * Компонент, используемый для отображения карточки с информацией о какой-либо сущности,
 * например товар, фильм, экскурсия. Представляет собой скроллируемый элемент, с высотой `100%` от
 * родителя, для корректной работы скролла необходимо задать высоту родительскому компоненту,
 * либо используя `className` указать высоту для данного компонента
 */
export function ItemCommon<EntityId = unknown>({
    title,
    subtitle,
    details,
    actionButtonProps,
    entities,
    entitiesTitle,
    entityComponent,
    background,
    className,
    insets,
    entitiesView,
    onEntityClick,
    platformComponents: { ItemBackground, ItemEntities },
}: UnifiedComponentProps<ItemProps<EntityId>, PlatformComponents<EntityId>>) {
    const mainSectionRef = React.useRef<HTMLDivElement>(null);
    const entitiesRef = React.useRef<HTMLDivElement>(null);
    const scrollableRef = useScrollByBreakpoints([mainSectionRef, entitiesRef]);

    return (
        <StyledContainer className={className} $bottom={insets?.bottom} ref={scrollableRef}>
            <Col sizeXL={12} sizeM={6} sizeS={4}>
                {background && <ItemBackground src={background} />}
                <div ref={mainSectionRef}>
                    <ItemMainSection
                        {...actionButtonProps}
                        title={title}
                        subtitle={subtitle}
                        details={details}
                        actionButtonAutoFocus={!actionButtonProps?.buttons && isSberBoxLike()}
                    />
                </div>
                <div ref={entitiesRef}>
                    <ItemEntities
                        entities={entities}
                        title={entitiesTitle}
                        entityComponent={entityComponent}
                        view={entitiesView}
                        onClick={onEntityClick}
                    />
                </div>
            </Col>
        </StyledContainer>
    );
}
