import React from 'react';
import type { FC } from 'react';

import { UploadRoot } from './UploadRoot';
import { UploadButton, UploadButtonProps } from './UploadButton';
import { UploadMessage } from './UploadMessage';
import { UploadProgress } from './UploadProgress';

export interface UploadProps extends UploadButtonProps {
    /**
     * Контент для компонента.
     */
    content?: JSX.Element | string;
    /**
     * Заполненность прогрессбара в процентах.
     */
    progress?: number;
    /**
     * Вспомогательное сообщение.
     */
    message?: string;
}

/**
 * Компонент для загрузки файлов.
 */
export const Upload: FC<UploadProps> = ({
    content,
    status,
    message,
    disabled,
    progress,
    accept,
    loader,
    validate,
    onChange,
    onValidation,
    ...rest
}) => {
    return (
        <UploadRoot {...rest}>
            <UploadButton
                status={status}
                disabled={disabled}
                accept={accept}
                content={content}
                isProgress={Boolean(progress !== undefined)}
                loader={loader || <UploadProgress progress={progress} />}
                validate={validate}
                onValidation={onValidation}
                onChange={onChange}
            />
            {message && <UploadMessage status={status}>{message}</UploadMessage>}
        </UploadRoot>
    );
};
