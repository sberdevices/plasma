import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { IconMusic } from '@sberdevices/plasma-icons';

import { Upload, UploadProps } from '../Upload-2';

export interface UploadAudioProps extends UploadProps {}

export const StyledContent = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
`;

export const StyledText = styled.span`
    margin-left: 0.5rem;
`;

export const UploadAudio: FC<UploadAudioProps> = ({ ...rest }) => {
    return (
        <Upload
            accept=".mp3"
            content={
                <StyledContent>
                    <IconMusic size="s" color="inherit" />
                    <StyledText>Перетащите трек в формате mp3</StyledText>
                </StyledContent>
            }
            {...rest}
        />
    );
};
