import React, { useCallback, useState } from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { IconMusic } from '@sberdevices/plasma-icons';

import { Upload, UploadProps, ValidationResult } from '../Upload';
import { Status } from '../Upload/types';

export interface UploadAudioProps extends UploadProps {}

export interface ValidationState {
    status?: Status;
    message?: string;
}

export const StyledContent = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
`;

export const StyledText = styled.span`
    margin-left: 0.5rem;
`;

export const UploadAudio: FC<UploadAudioProps> = ({ ...rest }) => {
    const [state, setState] = useState<ValidationState>({
        status: undefined,
        message: undefined,
    });

    const acceptExtensions = '.mp3,.wav';
    const text = 'Перетащите трек в формате mp3';

    const onValidation = useCallback(
        (result: ValidationResult) => {
            const { message, status: rStatus } = result;

            setState((prevState) => ({
                ...prevState,
                message,
                status: rStatus,
            }));
        },
        [setState],
    );

    return (
        <Upload
            accept={acceptExtensions}
            content={
                <StyledContent>
                    <IconMusic size="s" color="inherit" />
                    <StyledText>{text}</StyledText>
                </StyledContent>
            }
            message={state.message}
            status={state.status}
            onValidation={onValidation}
            {...rest}
        />
    );
};
