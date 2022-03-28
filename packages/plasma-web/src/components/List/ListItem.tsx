import styled from 'styled-components';
import { applySpacing, SpacingProps } from '@sberdevices/plasma-core';

export const ListItem = styled.li<SpacingProps>`
    list-style: none;

    ${applySpacing}
`;
