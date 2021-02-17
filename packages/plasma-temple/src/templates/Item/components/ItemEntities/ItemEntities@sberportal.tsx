import React from 'react';
import styled from 'styled-components';
import { Headline3 } from '@sberdevices/ui/components/Typography';

import { ItemEntities as DefaultItemEntities, ItemEntitiesProps } from './ItemEntities';

const StyledHeadline = styled(Headline3)`
    position: relative;
    margin-bottom: 36px;
`;

export const ItemEntities: React.FC<ItemEntitiesProps> = (props) => (
    <DefaultItemEntities
        {...props}
        platformComponents={{
            Title: StyledHeadline,
        }}
    />
);
