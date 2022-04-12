import React from 'react';
import styled from 'styled-components';

import { FullScreenBackground } from '../../FullScreenBackground/FullScreenBackground';

export interface ItemBackgroundProps {
    src: string;
}

const StyledFullScreenBackground = styled(FullScreenBackground)`
    z-index: -1;
`;

export const ItemBackgroundCommon: React.FC<ItemBackgroundProps> = ({ src }) => (
    <StyledFullScreenBackground src={src} />
);
