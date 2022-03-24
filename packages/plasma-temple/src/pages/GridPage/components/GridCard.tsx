import React from 'react';
import { Card, CardBody, CardContent, CardMedia } from '@sberdevices/plasma-ui';

import { isSberBoxLike } from '../../../utils/deviceFamily';

export interface GridCardProps {
    url: string;
    text: string;
    order: number;
    onClick: () => void;
    onKeyDown: React.KeyboardEventHandler;
}

export const GridCard: React.FC<GridCardProps> = ({ url, text: title, onClick, onKeyDown }) => {
    return (
        <Card outlined={isSberBoxLike()} tabIndex={0} onClick={onClick} onKeyDown={onKeyDown} data-cy="grid-item-card">
            <CardBody>
                <CardMedia base="div" src={url} ratio="1 / 1" data-cy="grid-item-card-media" />
                <CardContent cover>{title}</CardContent>
            </CardBody>
        </Card>
    );
};
