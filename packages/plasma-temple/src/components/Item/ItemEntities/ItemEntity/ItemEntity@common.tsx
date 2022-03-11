import React from 'react';
import styled from 'styled-components';
import { Card, CardBadge, CardBody, CardMedia, Footnote1 } from '@sberdevices/plasma-ui';

import { isSberBoxLike } from '../../../../utils/deviceFamily';
import { ItemEntityType } from '../../types';
import { getMediaObjectSrc } from '../../../../utils';
import { MediaObject } from '../../../../types';

export interface ItemEntityProps<Id = unknown> {
    entity: ItemEntityType<Id>;
    index: number;
    onClick: (id: Id) => void;
    onFocus?: (index: number) => void;
}

export const getEntityImageRatio = (image: MediaObject) => (!image.ratio && !image.customRatio ? '1 / 1' : image.ratio);

const StyledFootnote1 = styled(Footnote1)`
    margin-top: 0.625rem;
`;

const StyledCardBadge = styled(CardBadge)`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
`;

export function ItemEntityCommon<Id = unknown>({ entity, index, onClick, onFocus }: ItemEntityProps<Id>) {
    const { id, name, image } = entity;

    const handleClick = React.useCallback(() => {
        onClick(id);
    }, [id, onClick]);

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
                onClick(id);
            }
        },
        [id, onClick],
    );

    const handleFocus = React.useCallback(() => {
        onFocus?.(index);
    }, [index, onFocus]);

    return (
        <>
            <Card
                outlined={isSberBoxLike()}
                tabIndex={0}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                data-cy="item-entity-card"
                data-focusable
            >
                <CardBody>
                    <CardMedia
                        base="div"
                        src={getMediaObjectSrc(image)}
                        ratio={getEntityImageRatio(image)}
                        customRatio={image.customRatio}
                        data-cy="item-entity-card-media"
                    />
                    <StyledCardBadge view="secondary" size="l" text={`${index + 1}`} />
                </CardBody>
            </Card>
            <StyledFootnote1>{name}</StyledFootnote1>
        </>
    );
}
