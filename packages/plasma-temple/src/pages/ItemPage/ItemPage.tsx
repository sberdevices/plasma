import React from 'react';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { Header } from '../../components/Header/Header';
import { useRegistry } from '../../hooks/useRegistry';
import { useSpatNav } from '../../hooks/useSpatNav';
import { useVoiceNavigationWithSpatNav } from '../../hooks/useVoiceNavigation';
import { scroll } from '../../utils/scroll';
import { getMediaObjectSrc } from '../../utils';

import { ItemEntityProps } from './components/ItemEntity/ItemEntity';
import { ItemPageState } from './types';

interface ItemPageProps {
    state: ItemPageState;
    header?: HeaderProps;
    onItemShow: (id: string) => void;
    onItemFocus?: (id: string) => void;
    entityComponent?: React.ComponentType<ItemEntityProps>;
}

const scrollToWithOffset = (offset: number) => {
    const targetOffset = offset <= 0 ? offset : offset - 100;

    scroll({
        element: window,
        startPosition: window.scrollY,
        offset: targetOffset - window.scrollY,
        duration: 300,
        axis: 'y',
    });
};

export const ItemPage: React.FC<ItemPageProps> = ({ state, header, entityComponent, onItemShow, onItemFocus }) => {
    const { entities, entitiesTitle, background, title, subtitle, description, actionButtonText } = state;
    const { ItemMainSection, ItemEntities } = useRegistry();

    const list = React.useMemo(
        () =>
            entities.map((child, index) => {
                const { id, image, label, ...childRest } = child;
                return {
                    onClick: () => onItemShow(id),
                    onFocus: () => onItemFocus?.(id),
                    onKeyDown: ({ key }: React.KeyboardEvent) => key === 'Enter' && onItemShow(id),
                    url: getMediaObjectSrc(image),
                    title: label,
                    order: index + 1,
                    uuid: id,
                    ...childRest,
                };
            }),
        [entities, onItemShow, onItemFocus],
    );

    useVoiceNavigationWithSpatNav({ axis: 'y', main: true });
    useSpatNav<HTMLElement>(({ offsetTop }) => scrollToWithOffset(offsetTop));

    // Необходимо сбросить первоночально установленную точку, чтобы старт навигации был с сфокусированного элемента
    React.useEffect(() => {
        // eslint-disable-next-line no-underscore-dangle
        window.__spatialNavigation__?.setStartingPoint();
    }, []);

    return (
        <>
            {header && <Header {...header} />}
            <ItemMainSection
                cover={background && getMediaObjectSrc(background)}
                title={title}
                subtitle={subtitle ?? ''}
                description={description}
                onItemShow={() => onItemShow(entities[0].id)}
                itemShowButtonText={actionButtonText}
            />
            <ItemEntities list={list} title={entitiesTitle ?? ''} Component={entityComponent} />
        </>
    );
};

export default ItemPage;
