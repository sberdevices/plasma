// pages/Gallery/Gallery.tsx

import React from 'react';
import {
    GalleryPage,
    useMount,
    useAssistantOnSmartAppData,
    PageComponent,
    GalleryPageState,
    useAssistantAppState,
    GalleryCardProps,
} from '@sberdevices/plasma-temple';
import { Card, CardBody, CardMedia, CardContent, CardHeadline1, CardFootnote1 } from '@sberdevices/plasma-ui';

import { ActionType, AssistantDataAction, Film, PageParamsType, PageStateType } from '../types';

// Имитируем получение данных экрана
const getGallery = (): Promise<GalleryPageState<Film>> => {
    return Promise.resolve({
        activeGalleryIndex: 0,
        gallery: {
            activeCardIndex: 0,
            items: [
                {
                    id: '1',
                    label: 'Первый фильм',
                    name: 'Первый фильм',
                    position: 1,
                    image: {
                        src: 'https://via.placeholder.com/450x800',
                    },
                    rating: 4.5,
                    genre: 'comedy',
                    poster: 'https://via.placeholder.com/450x800',
                },
                {
                    id: '2',
                    label: 'Второй фильм',
                    name: 'Второй фильм',
                    position: 2,
                    image: {
                        src: 'https://via.placeholder.com/450x800',
                    },
                    rating: 5,
                    genre: 'fantasy',
                    poster: 'https://via.placeholder.com/450x800',
                },
            ],
        },
    });
};

const getItemSelectorItems = (gallery: GalleryPageState['gallery']) => {
    return Array.isArray(gallery) ? gallery : [gallery];
};

const CustomCard: React.FC<GalleryCardProps<Film>> = ({ card, focused }) => {
    const src = Array.isArray(card.image.src) ? card.image.src[0] : card.image.src;

    return (
        <Card focused={focused}>
            <CardBody>
                <CardMedia src={src} ratio="3 / 4" />
                <CardContent cover>
                    <CardHeadline1>{card.label}</CardHeadline1>
                    <CardFootnote1>
                        Рейтинг: <strong>{card.rating}</strong>
                    </CardFootnote1>
                    <CardFootnote1>
                        Жанр: <strong>{card.genre}</strong>
                    </CardFootnote1>
                </CardContent>
            </CardBody>
        </Card>
    );
};

/*
    Для создания компонента используем PageComponent, что позволяет нам строго типизировать
    пропсы компонента экрана
*/
export const Gallery: PageComponent<PageStateType, 'gallery', PageParamsType> = (props) => {
    const { pushScreen, changeState, state, name, header } = props;
    const gallery = state ? state.gallery : [];

    const handleClick = React.useCallback(
        (card: Partial<Film>) => {
            pushScreen('film', { id: card.id ?? '' });
        },
        [pushScreen],
    );

    useMount(() => {
        // после монтирования компонента инициализируем состояние экрана
        getGallery().then((data) => changeState(data));
    });

    // Устанавливаем состояние Canvas App
    useAssistantAppState({
        screen: name,
        // eslint-disable-next-line @typescript-eslint/camelcase
        item_selector: {
            items: getItemSelectorItems(gallery).flatMap(({ items }) =>
                items.map((item) => ({
                    title: item.label,
                    number: item.position,
                    id: String(item.id),
                    action: {
                        type: ActionType.OPEN_ITEM,
                        payload: { id: item.id },
                    },
                })),
            ),
        },
    });

    // Подписываемся на событие ассистента 'data' с типом 'smart_app_data'
    useAssistantOnSmartAppData<AssistantDataAction>((action) => {
        if (action && action.type === ActionType.OPEN_ITEM) {
            handleClick(action.payload);
        }
    });

    // `state` заполнятся при первом рендере компонента вызовом `changeState(nextState)`
    if (!state) {
        return null;
    }

    // В качестве галереи используется соответствующий компонент из пакета @sberdevices/plasma-temple
    return (
        <GalleryPage
            header={header}
            onCardClick={handleClick}
            state={state}
            changeState={changeState}
            galleryCard={CustomCard}
        />
    );
};
