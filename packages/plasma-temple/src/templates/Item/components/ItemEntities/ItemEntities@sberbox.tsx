import React from 'react';
import styled from 'styled-components';
import { Headline2 } from '@sberdevices/ui/components/Typography';

import { ItemEntities as DefaultItemEntities, ItemEntitiesProps } from './ItemEntities';

const StyledHeadline = styled(Headline2)`
    position: relative;
    margin-bottom: 36px;

    font-size: 48px;
    line-height: 56px;
`;

export const ItemEntities: React.FC<ItemEntitiesProps> = (props) => (
    <DefaultItemEntities
        {...props}
        platformComponents={{
            Title: StyledHeadline,
        }}
    />
);
