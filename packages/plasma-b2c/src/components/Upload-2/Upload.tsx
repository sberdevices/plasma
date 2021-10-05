import React, { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';

import { UploadRoot } from './UploadRoot';
import { UploadButton, UploadButtonProps } from './UploadButton';
import { UploadMessage } from './UploadMessage';
import { UploadProgress } from './UploadProgress';
import { ValidationResult } from './types';

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

export const Upload: FC<UploadProps> = ({
    content,
    status: defaultStatus,
    message: defaultMessage,
    disabled,
    progress,
    accept,
    loader,
    validate,
    onChange,
    ...rest
}) => {
    const [state, setState] = useState<Omit<ValidationResult, 'data'>>({
        status: defaultStatus,
        message: defaultMessage,
    });

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            message: defaultMessage,
            status: defaultStatus,
        }));
    }, [defaultStatus, defaultMessage]);

    const onValidation = useCallback(
        (result: ValidationResult) => {
            const { message, status } = result;

            setState((prevState) => ({
                ...prevState,
                message,
                status,
            }));
        },
        [setState],
    );

    return (
        <UploadRoot {...rest}>
            <UploadButton
                status={state.status}
                disabled={disabled}
                accept={accept}
                content={content}
                isProgress={Boolean(progress !== undefined)}
                loader={loader || <UploadProgress progress={progress} />}
                validate={validate}
                onValidation={onValidation}
                onChange={onChange}
            />
            {state.message && <UploadMessage status={state.status}>{state.message}</UploadMessage>}
        </UploadRoot>
    );
};
