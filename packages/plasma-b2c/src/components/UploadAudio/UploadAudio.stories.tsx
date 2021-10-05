import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import { InSpacingDecorator } from '@sberdevices/plasma-sb-utils';

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

interface StoryProps extends UploadAudioProps {}

export const Audio: Story<StoryProps> = ({ ...rest }) => {
    const [progress, setProgress] = useState(undefined);

    const onChange = useCallback(
        (file: File) => {
            console.log('file', file);
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
        },
        [setProgress],
    );

    return (
        <StyledWrapper>
            <UploadAudio progress={progress} onChange={onChange} />
        </StyledWrapper>
    );
};

Audio.args = {
    disabled: false,
};
