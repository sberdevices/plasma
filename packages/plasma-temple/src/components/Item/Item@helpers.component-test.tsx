import React from 'react';

import { startApp } from '../../testHelpers/testRenderHelpers';

import { Item, ItemProps } from './Item';
import { ItemEntityType } from './types';

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

const dummyFn = () => {};

const actionButtonProps = {
    actionButtonText: 'Начать аудиотур',
    onActionButtonClick: dummyFn,
};

export function generateWrapper(passedProps?: Partial<ItemProps>) {
    const defaultProps: ItemProps = {
        title: 'Заголовок',
        subtitle: 'Подзаголовок',
        details,
        actionButtonProps,
        entities,
        entitiesTitle: 'Все экспонаты',
        background: 'images/cat.png',
        onEntityClick: dummyFn,
    };

    const props = { ...defaultProps, ...passedProps };

    startApp(
        [
            {
                name: 'item',
                component: () => <Item {...props} />,
            },
        ],
        ({ pushScreen }) => pushScreen('item'),
    );

    cy.mockBackgroundImage('[data-cy="item-entity-card-media"] > div', 'images/cat.png');

    if (props.background) {
        cy.mockImage('[data-cy="background-image"]', 'images/cat.png');
    }
}
