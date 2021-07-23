import React from 'react';
import {
    GalleryPage,
    GalleryPageControl,
    GalleryCardProps,
    useMount,
    useAssistantOnSmartAppData,
} from '@sberdevices/plasma-temple';

import { ActionType, AssistantDataAction, CatalogData, PageComponentProps } from '../../types';
import { isProductItem } from '../../utils/guards';
import { GalleryCard } from '../../components/GalleryCard/GalleryCard';

import { useCatalogAssistantState } from './hooks/useCatalogAssistantState';
import { initCatalogState } from './initCatalogState';
import { CategoryCard } from './components/CategoryCard/CategoryCard';

const CatalogCard: React.FC<GalleryCardProps<CatalogData>> = React.memo(({ card, ...props }) =>
    isProductItem(card) ? <GalleryCard card={card} {...props} /> : <CategoryCard card={card} {...props} />,
);

export const Catalog: React.FC<PageComponentProps<'catalog'>> = (props) => {
    const { pushScreen, changeState, state, name, header } = props;
    const galleryControl = React.useRef<GalleryPageControl>(null);
    const { gallery } = state ?? {};

    const handleClick = React.useCallback(
        (card: Partial<CatalogData>) => {
            if (isProductItem(card)) {
                pushScreen('product', { id: card.id });
            } else {
                if (Array.isArray(gallery)) {
                    const target = gallery.findIndex((item) => item.id === card.id);

                    if (target > -1) {
                        galleryControl.current?.changeActiveGallery(target);
                    }
                }
            }
        },
        [pushScreen, gallery],
    );

    useMount(() => {
        initCatalogState().then((data) => changeState(data));
    });

    useCatalogAssistantState(name, state);

    useAssistantOnSmartAppData<AssistantDataAction>((action) => {
        if (action && action.type === ActionType.OPEN_ITEM) {
            handleClick(action.payload);
        }
    });

    if (!state?.gallery) {
        return null;
    }

    return (
        <GalleryPage<CatalogData>
            header={header}
            onCardClick={handleClick}
            galleryCard={CatalogCard}
            state={state}
            changeState={changeState}
            ref={galleryControl}
        />
    );
};
