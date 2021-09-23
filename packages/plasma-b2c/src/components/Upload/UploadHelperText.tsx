import styled from 'styled-components';
import { success, critical } from '@sberdevices/plasma-core';

import { Caption } from '../Typography';

const statuses = {
    error: {
        color: critical,
    },
    success: {
        color: success,
    },
};

export const UploadHelperText = styled(Caption)<{ status?: keyof typeof statuses }>`
    margin-top: 0.25rem;
    text-align: center;

    ${({ status }) => status && statuses[status]}
`;
