import React from 'react';
import styled from 'styled-components';

import { FullScreenBackground } from '../../FullScreenBackground/FullScreenBackground';

export interface FullScreenBackgroundProps {
    src: string;
}

const StyledFullScreenBackground = styled(FullScreenBackground)`
    z-index: -1;
`;

export const ItemBackgroundCommon: React.FC<FullScreenBackgroundProps> = ({ src }) => (
    <StyledFullScreenBackground src={src} />
);
