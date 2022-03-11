import React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';

import { Item } from './Item';
import { ItemEntityType } from './types';

export default {
    title: 'Item/Item',
    parameters: {
        ignoreInsets: true,
    },
};

const details = [
    {
        title: 'Автор аудиогида',
        content: 'Иван Иванов',
    },
    {
        title: 'Читает',
        content: 'Петр Петров',
    },
    {
        title: 'Тур займёт',
        content: '2 часа 30 минут',
    },
];

const entities: ItemEntityType[] = [
    {
        id: 1,
        name: 'Космос',
        image: {
            src: 'images/cat.png',
        },
    },
    {
        id: 2,
        name: 'Животные',
        image: {
            src: 'images/cat.png',
        },
    },
    {
        id: 3,
        name: 'Как все устроено',
        image: {
            src: 'images/cat.png',
        },
    },
    {
        id: 4,
        name: 'лейбл',
        image: {
            src: 'images/cat.png',
        },
    },
    {
        id: 5,
        name: 'лейбл',
        image: {
            src: 'images/cat.png',
        },
    },
];

const StyledItem = styled(Item)`
    height: 100vh;
`;

export const Default = (): React.ReactElement => {
    return (
        <StyledItem
            title="Архив. Эль Патио с Иваном Ивановым"
            subtitle="Новый Вавилон"
            details={details}
            actionButtonProps={{
                actionButtonText: 'Начать аудиотур',
                onActionButtonClick: action('onActionButtonClick'),
            }}
            entities={entities}
            entitiesTitle="Все экспонаты"
            background="images/cat.png"
            insets={{ bottom: 80 }}
            onEntityClick={action('onActionClick')}
        />
    );
};

export const ItemEntitiesCarousel = (): React.ReactElement => {
    return (
        <StyledItem
            title="Архив. Эль Лисицкий с Алёной Долецкой"
            subtitle="Новый Вавилон"
            details={details}
            actionButtonProps={{
                actionButtonText: 'Начать аудиотур',
                onActionButtonClick: action('onActionButtonClick'),
            }}
            entities={entities}
            entitiesTitle="Все экспонаты"
            background="images/cat.png"
            insets={{ bottom: 80 }}
            entitiesView="carousel"
            onEntityClick={action('onActionClick')}
        />
    );
};
