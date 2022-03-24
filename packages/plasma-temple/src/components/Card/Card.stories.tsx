import React from 'react';
import { action } from '@storybook/addon-actions';
import { Footnote1 } from '@sberdevices/plasma-ui';

import { Grid } from '../Grid/Grid';

import { Card, CardEntity } from './Card';

export default {
    title: 'Card',
    parameters: {
        ignoreInsets: true,
    },
    argTypes: {
        cover: {
            control: { type: 'boolean' },
            defaultValue: true,
        },
        withPositionBadge: {
            control: { type: 'boolean' },
            defaultValue: true,
        },
    },
};

const entity: CardEntity<number> = {
    id: 1,
    name: 'Очень очень длинное длинное название ',
    image: { src: 'images/img.png' },
};

export const Default = ({ cover, withPositionBadge }): React.ReactElement => {
    return (
        <Grid>
            <Card
                entity={entity}
                index={0}
                onClick={action('onClick')}
                onFocus={action('onFocus')}
                cover={cover}
                withPositionBadge={withPositionBadge}
            >
                <Footnote1>{entity.name}</Footnote1>
            </Card>
        </Grid>
    );
};
