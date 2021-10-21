import styled from 'styled-components';
import { success, critical } from '@sberdevices/plasma-core';

import { Caption } from '../Typography';

import { StatusType } from './types';

const statuses = {
    error: {
        color: critical,
    },
    success: {
        color: success,
    },
};

export const UploadMessage = styled(Caption)<{ status?: StatusType }>`
    margin-top: 0.25rem;
    text-align: center;

    ${({ status }) => status && statuses[status]}
`;
