import React from 'react';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';

import { Header } from '../../components/Header/Header';
import { useRegistry } from '../../hooks/useRegistry';
import { useSpatNav } from '../../hooks/useSpatNav';
import { useVoiceNavigationWithSpatNav } from '../../hooks/useVoiceNavigation';
import { scroll } from '../../utils/scroll';

import { ItemPageState } from './types';

interface ItemPageProps {
    state: ItemPageState;
    header?: HeaderProps;
    onItemShow: (id: string) => void;
    onItemFocus?: (id: string) => void;
}

const getImageSrc = (src: string | string[]) => {
    return Array.isArray(src) ? src[0] : src;
};

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

export const ItemPage: React.FC<ItemPageProps> = ({ state, header, onItemShow, onItemFocus }) => {
    const { entities, entitiesTitle, background, title, subtitle, description, actionButtonText } = state;
    const { ItemMainSection, ItemEntities } = useRegistry();

    const list = React.useMemo(
        () =>
            entities.map((child, index) => ({
                onClick: () => onItemShow(child.id),
                onFocus: () => onItemFocus && onItemFocus(child.id),
                onKeyDown: ({ key }: React.KeyboardEvent) => key === 'Enter' && onItemShow(child.id),
                url: getImageSrc(child.image.src),
                title: child.label,
                order: index + 1,
                uuid: child.id,
            })),
        [entities, onItemShow],
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
                cover={background && getImageSrc(background.src)}
                title={title}
                subtitle={subtitle ?? ''}
                description={description}
                onItemShow={() => onItemShow(entities[0].id)}
                itemShowButtonText={actionButtonText}
            />
            <ItemEntities list={list} title={entitiesTitle ?? ''} />
        </>
    );
};

export default ItemPage;
