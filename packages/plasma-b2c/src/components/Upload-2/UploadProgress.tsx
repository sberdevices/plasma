import React, { FC } from 'react';
import styled from 'styled-components';

import { Spinner } from '../Spinner';

const StyledProgress = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;

    border-radius: 0.75rem;
    overflow: hidden;
`;

const StyledProgressbar = styled.div`
    height: 100%;
    background: linear-gradient(270deg, rgba(8, 8, 8, 0.14) 0%, rgba(8, 8, 8, 0) 100%);
    transition: width 0.3s ease-in-out;
`;

const StyledSpinner = styled(Spinner)`
    position: relative;
    z-index: 1;
    margin-left: 0.875rem;
`;

const StyledSpan = styled.span``;

export interface UploadProgressProps {
    progress?: number;
}

export const UploadProgress: FC<UploadProgressProps> = ({ progress: rawProgress }) => {
    const progress = Math.min(Math.max(rawProgress || 0, 0), 100);

    return (
        <>
            <StyledProgress>
                <StyledProgressbar style={{ width: `${progress}%` }} />
            </StyledProgress>
            <StyledSpan>Загружено {progress}%</StyledSpan>
            <StyledSpinner size="1.25rem" />
        </>
    );
};
