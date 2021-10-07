import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { IconMusic } from '@sberdevices/plasma-icons';

import { Upload, UploadProps } from '../Upload';

export interface UploadAudioProps extends UploadProps {}

export const StyledContent = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
`;

export const StyledText = styled.span`
    margin-left: 0.5rem;
`;

export const StyledIconMusic = styled(IconMusic)`
    svg {
        opacity: 0.28;
    }
`;

/**
 * Компонент для загрузки аудио файлов.
 */
export const UploadAudio: FC<UploadAudioProps> = ({ ...rest }) => {
    const acceptExtensions = '.mp3,.wav';
    const text = 'Перетащите трек в формате mp3';

    return (
        <Upload
            accept={acceptExtensions}
            content={
                <StyledContent>
                    <StyledIconMusic size="s" color="inherit" />
                    <StyledText>{text}</StyledText>
                </StyledContent>
            }
            {...rest}
        />
    );
};
