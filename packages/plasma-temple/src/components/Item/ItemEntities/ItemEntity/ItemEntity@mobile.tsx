import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardContent, CardMedia, Footnote1 } from '@sberdevices/plasma-ui';

import { getMediaObjectSrc } from '../../../../utils';

import { getEntityImageRatio, ItemEntityProps } from './ItemEntity@common';

const StyledCardContent = styled(CardContent)`
    justify-content: flex-start;
`;

export function ItemEntityMobile<Id = unknown>({ entity, onClick }: ItemEntityProps<Id>) {
    const { id, name, image } = entity;

    const handleClick = React.useCallback(() => {
        onClick(id);
    }, [id, onClick]);

    return (
        <>
            <Card onClick={handleClick} data-cy="item-entity-card">
                <CardBody>
                    <CardMedia
                        base="div"
                        src={getMediaObjectSrc(image)}
                        ratio={getEntityImageRatio(image)}
                        customRatio={image.customRatio}
                        data-cy="item-entity-card-media"
                    />
                    <StyledCardContent cover>
                        <Footnote1>{name}</Footnote1>
                    </StyledCardContent>
                </CardBody>
            </Card>
        </>
    );
}
