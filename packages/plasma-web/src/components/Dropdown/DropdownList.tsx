import styled from 'styled-components';
import { backgroundPrimary } from '@sberdevices/plasma-core';

/**
 * Выпадающий список.
 */
export const DropdownList = styled.ul`
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: var(--plasma-dropdown-padding, 0);

    list-style: none;
    background-color: var(--plasma-dropdown-background, ${backgroundPrimary});
    box-shadow: 0 0.75rem 1.75rem rgba(0, 0, 0, 0.08);
    border-radius: var(--plasma-dropdown-border-radius, 0);

    transition: opacity 0.3s ease-in-out;
`;
