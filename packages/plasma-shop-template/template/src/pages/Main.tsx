import React from 'react';
import {
    ShopLandingPage,
    useAssistantOnSmartAppData,
    INNER_ASSISTANT_ACTION,
    useMount,
    ShopLandingPageState,
} from '@sberdevices/plasma-temple';

import { ActionType, AssistantDataAction, PageComponentProps, Product } from '../types';
import { GalleryCard } from '../components/GalleryCard/GalleryCard';
import { productToGalleryItem } from '../utils/mappers';
import { useAssistantState } from '../hooks/useAssistantState';
import { getPopularProducts } from '../api/products';

const defaultState: ShopLandingPageState<Product> = {
    items: [],
    catalogImage: '/images/placeholder.png',
    activeCardIndex: 0,
};

export const Main: React.FC<PageComponentProps<'main'>> = (props) => {
    const { header, state, pushScreen, sendData, changeState } = props;
    const pageState = !state ? defaultState : state;

    useMount(() => {
        if (!pageState.items.length) {
            getPopularProducts().then((products) =>
                changeState({
                    ...defaultState,
                    items: products.map(productToGalleryItem),
                }),
            );
        }
    });

    useAssistantState({
        screen: props.name,
        items: pageState.items.map((good, i) => ({
            title: good.name,
            number: i + 1,
            id: String(good.id),
            action: {
                type: ActionType.OPEN_ITEM,
                payload: {
                    id: good.id,
                },
            },
        })),
    });

    const openCatalogs = React.useCallback(() => {
        pushScreen('catalog');
    }, [pushScreen]);

    const openItem = React.useCallback(
        (val: Product) => {
            sendData({
                name: INNER_ASSISTANT_ACTION,
                action: {
                    type: ActionType.OPEN_ITEM,
                    payload: { id: val.id },
                },
            });
        },
        [sendData],
    );

    useAssistantOnSmartAppData<AssistantDataAction>((action) => {
        if (action && action.type === ActionType.OPEN_ITEM) {
            pushScreen('product', { id: action.payload.id });
        }
    });

    return (
        <ShopLandingPage<Product>
            header={header}
            galleryCard={GalleryCard}
            state={pageState}
            onCatalogOpen={openCatalogs}
            onStoreInfoClick={() => pushScreen('about')}
            onItemClick={openItem}
            changeState={changeState}
        />
    );
};
