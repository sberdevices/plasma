import React from 'react';
import { ButtonProps } from '@sberdevices/plasma-ui';

import { Header } from '../../components/Header/Header';
import { ComponentPropsWithHeader } from '../../components/Header/types';
import { useRegistry } from '../../hooks/useRegistry';
import { useSpatNav } from '../../hooks/useSpatNav';
import { useVoiceNavigationWithSpatNav } from '../../hooks/useVoiceNavigation';
import { scroll } from '../../utils/scroll';
import { getMediaObjectSrc } from '../../utils';
import { LayoutElementContext } from '../../components/Layout/LayoutElementContext';

import { ItemEntityProps } from './components/ItemEntity/ItemEntity';
import { ItemPageState } from './types';
import { ItemMainSection } from './components/ItemMainSection/ItemMainSection';

interface ItemPageProps extends ComponentPropsWithHeader {
    state: ItemPageState;
    onItemShow: <T>(id: T) => void;
    onItemFocus?: <T>(id: T) => void;
    entityComponent?: React.ComponentType<ItemEntityProps>;
    additionalButons?: ButtonProps[];
}

const scrollToWithOffset = (offset: number, element: HTMLDivElement | null) => {
    const targetOffset = offset <= 0 ? offset : offset - 100;
    if (!element) {
        return;
    }

    scroll({
        element,
        startPosition: element.scrollTop,
        offset: targetOffset - element.scrollTop,
        duration: 300,
        axis: 'y',
    });
};

/** @depreceted use Item */
export const ItemPage: React.FC<ItemPageProps> = ({
    state,
    header,
    entityComponent,
    onItemShow,
    onItemFocus,
    additionalButons,
}) => {
    const { entities, entitiesTitle, background, title, subtitle, description, actionButtonText } = state;
    const { ItemEntities } = useRegistry();
    const layoutElementContext = React.useContext(LayoutElementContext);

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
    useSpatNav<HTMLElement>(({ offsetTop }) => scrollToWithOffset(offsetTop, layoutElementContext));

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
                additionalButons={additionalButons}
            />
            <ItemEntities list={list} title={entitiesTitle ?? ''} Component={entityComponent} />
        </>
    );
};

export default ItemPage;
