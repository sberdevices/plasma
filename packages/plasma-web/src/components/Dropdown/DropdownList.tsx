import styled from 'styled-components';
import { backgroundPrimary } from '@sberdevices/plasma-core';

/**
 * Выпадающий список.
 */
export const DropdownList = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-width: 13.75rem;
    margin: 0;
    padding: var(--plasma-dropdown-padding, 0);

    background-color: var(--plasma-dropdown-background, ${backgroundPrimary});
    box-shadow: 0 13px 28px rgba(155, 155, 155, 0.2);
    border-radius: var(--plasma-dropdown-border-radius, 0);

    transition: opacity 0.3s ease-in-out;
`;
