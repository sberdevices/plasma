import styled from 'styled-components';
import { Badge as BaseBadge } from '@sberdevices/plasma-b2c';
import { whitePrimary, buttonPrimary } from '@sberdevices/plasma-tokens-b2c';

export const Badge = styled(BaseBadge).attrs(() => ({ size: 's', view: 'primary' }))`
    margin-left: 0.5rem;
    padding: 0.25rem;

    background-color: ${buttonPrimary};
    color: ${whitePrimary};
    border-radius: 0.375rem;
`;
