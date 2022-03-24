import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import { Footnote1 } from '@sberdevices/plasma-ui';

import { useScrollableContainer } from '../../hooks/useScrollableContainer';
import { Card, CardEntity } from '../Card/Card';
import { isSberBoxLike } from '../../utils';

import { Grid } from './Grid';

export default {
    title: 'Grid',
    parameters: {
        ignoreInsets: true,
    },
};

const items = Array.from(
    { length: 12 },
    (_, index) =>
        ({
            id: index,
            name: 'Очень очень длинное длинное название ',
            image: { src: 'images/img.png' },
            badge: { type: 'accent', content: 'Скидка 40%' },
        } as CardEntity<number>),
);

const StyledContainer = styled.div`
    height: 100vh;
    overflow-y: auto;

    margin: calc(var(--plasma-grid-gutter) * -1);
    padding: 1rem var(--plasma-grid-gutter);

    &::-webkit-scrollbar {
        display: none;
        opacity: 0;
        width: 0;
    }
`;

export const Default = (): React.ReactElement => {
    const scrollableRef = useScrollableContainer();

    return (
        <StyledContainer ref={scrollableRef}>
            <Grid background={{ src: 'images/cat.png' }}>
                {items.map((item, index) => (
                    <Card
                        key={item.id}
                        entity={item}
                        index={index}
                        onClick={action('onClick')}
                        onFocus={action('onFocus')}
                        cover
                        withPositionBadge={isSberBoxLike()}
                    >
                        <Footnote1>{item.name}</Footnote1>
                    </Card>
                ))}
            </Grid>
        </StyledContainer>
    );
};
