import { CarouselGridWrapper } from '@sberdevices/plasma-ui';
import styled from 'styled-components';

import { DEFAULT_VIRTUAL_ITEM_SIZE } from '../constants';

export const CarouselWrapperHorizontal = styled(CarouselGridWrapper)`
    height: ${DEFAULT_VIRTUAL_ITEM_SIZE}px;
    overflow: auto;
    padding: 1.25rem;
`;
