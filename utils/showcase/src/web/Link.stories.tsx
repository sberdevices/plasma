import React from 'react';
import { Link, P1 } from '@sberdevices/plasma-web';

import { CardShowcase, WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Web/Content/Link',
    component: Link,
    decorators: [WebStoryDecorator, InSpacingDecorator],
};

const props = { href: 'https://sberdevices.ru/', target: '__blank' };
const sections = {
    Colored: {
        Default: (
            <P1>
                Скачайте <Link {...props}>приложение</Link>.
            </P1>
        ),
        Hover: (
            <P1>
                Скачайте{' '}
                <Link {...props} $isHover>
                    приложение
                </Link>
                .
            </P1>
        ),
        Active: (
            <P1>
                Скачайте{' '}
                <Link {...props} $isPressed>
                    приложение
                </Link>
                .
            </P1>
        ),
    },
    Visited: {
        Default: (
            <P1>
                Скачайте{' '}
                <Link $isVisited {...props}>
                    приложение
                </Link>
                .
            </P1>
        ),
        Hover: (
            <P1>
                Скачайте{' '}
                <Link {...props} $isVisited $isHover>
                    приложение
                </Link>
                .
            </P1>
        ),
        Active: (
            <P1>
                Скачайте{' '}
                <Link {...props} $isVisited $isPressed>
                    приложение
                </Link>
                .
            </P1>
        ),
    },
};

export const Default = () => <CardShowcase sections={sections} colWidth="12rem" />;
