import React from 'react';

import { useAssistantState, createButtonAction } from '../../hooks/useAssistantState';
import { useRegistry } from '../../hooks/useRegistry';
import { PageProps, EntityPayload, Screen } from '../../types';
import { Header } from '../../components/Header/Header';

export type { ItemMainSectionProps } from './components/ItemMainSection/ItemMainSection';
export type { ItemEntitiesProps } from './components/ItemEntities/ItemEntities';

const getImageSrc = (src: string | string[]) => {
    return Array.isArray(src) ? src[0] : src;
};

export const Item: React.FC<PageProps<EntityPayload>> = ({ data, header, stateRef, sendData }) => {
    useAssistantState(stateRef, {
        screen: Screen.entity,
        // eslintdisable-next-line camelcase
        item_selector: {
            items: [
                createButtonAction('exhibits', 'Покажи все экспонаты'),
                createButtonAction('ITEM/SHOW', data.itemShowButtonText, { id: data.entities[0].id }),
                ...data?.entities.map((child, index) => ({
                    title: child.label,
                    id: child.id,
                    number: index + 1,
                    action: {
                        type: 'ITEM/SHOW',
                        payload: { id: child.id },
                    },
                })),
            ],
        },
    });

    const onItemShow = React.useCallback(
        (id: string) => {
            sendData({
                name: 'REQUEST_DATA',
                action: {
                    // eslintdisable-next-line camelcase
                    action_id: 'ITEM/SHOW',
                    parameters: {
                        id,
                    },
                },
            });
        },
        [sendData],
    );

    const { ItemMainSection, ItemEntities } = useRegistry();

    const list = React.useMemo(
        () =>
            data.entities.map((child, index) => ({
                onClick: () => onItemShow(child.id),
                url: getImageSrc(child.image.src),
                title: child.label,
                order: index + 1,
                uuid: child.id,
            })),
        [data.entities, onItemShow],
    );

    return (
        <>
            <Header {...header} />

            <ItemMainSection
                cover={getImageSrc(data.background.src)}
                title={data.title}
                subtitle={data.meta?.provider.name}
                description={data.description}
                onItemShow={() => onItemShow(data.entities[0].id)}
                itemShowButtonText={data.itemShowButtonText}
            />
            <ItemEntities list={list} title={data.entitiesTitle} />
        </>
    );
};

export default Item;
