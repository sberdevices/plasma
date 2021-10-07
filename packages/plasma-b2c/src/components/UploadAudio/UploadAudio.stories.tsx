import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import { InSpacingDecorator } from '@sberdevices/plasma-sb-utils';

import { ValidationResult } from '../Upload';
import { StatusType } from '../Upload/types';

import { UploadAudio } from '.';
import type { UploadAudioProps } from '.';

export default {
    title: 'Controls/UploadAudio',
    component: UploadAudio,
    argTypes: {},
    decorators: [InSpacingDecorator],
} as Meta;

const StyledWrapper = styled.div`
    width: 23.75rem;
`;

export interface ValidationState {
    status?: StatusType;
    message?: string;
}

interface StoryProps extends UploadAudioProps {}

export const Audio: Story<StoryProps> = ({ ...rest }) => {
    const [progress, setProgress] = useState(undefined);
    const [state, setState] = useState<ValidationState>({
        status: undefined,
        message: undefined,
    });

    const onValidation = useCallback((result: ValidationResult) => {
        const { message, status: rStatus } = result;

        setState((prevState) => ({
            ...prevState,
            message,
            status: rStatus,
        }));
    }, []);

    const onChange = useCallback(() => {
        const interval = setInterval(
            () =>
                setProgress((prevValue?: number) => {
                    const value = prevValue === undefined ? 0 : prevValue;

                    if (value + 5 > 100) {
                        clearInterval(interval);
                        return undefined;
                    }
                    return value + 5;
                }),
            1000,
        );
    }, []);

    return (
        <StyledWrapper>
            <UploadAudio
                progress={progress}
                onChange={onChange}
                onValidation={onValidation}
                status={state.status}
                message={state.message}
                {...rest}
            />
        </StyledWrapper>
    );
};

Audio.args = {
    disabled: false,
};
