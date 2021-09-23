import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import { InSpacingDecorator } from '@sberdevices/plasma-sb-utils';
import { IconMusic } from '@sberdevices/plasma-icons';
import { secondary } from '@sberdevices/plasma-core';

import { ValidationResult } from './types';

import { Upload } from '.';
import type { UploadProps } from '.';

export default {
    title: 'Controls/Upload-2',
    component: Upload,
    argTypes: {},
    decorators: [InSpacingDecorator],
} as Meta;

const StyledWrapper = styled.div`
    width: 23.75rem;
`;

const StyledText = styled.span`
    position: relative;
    z-index: 1;
    display: inline-flex;
`;
const StyledContent = styled.span`
    position: relative;
    z-index: 1;
    display: inline-flex;

    &:first-child {
        margin-right: 0.75rem;
    }

    &:last-child {
        margin-left: auto;
        padding-left: 0.75rem;
        color: ${secondary};
    }
`;

interface StoryProps extends UploadProps {
    demonstrateProgress?: boolean;
}

export const Base: Story<StoryProps> = ({ ...rest }) => {
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

    const customValidate = useCallback((files: FileList | null, accept?: string): ValidationResult => {
        if (!files?.length) {
            return {
                message: 'Загрузите файл',
                status: 'error',
            };
        }

        const file = files[0];

        if (!accept) {
            return {
                data: file,
            };
        }

        const allowedFormats = accept.replace(/\s/g, '').replace('.', '\\.').split(',');
        const fileTypeRegexp = new RegExp(`${allowedFormats.join('|')}$`, 'i');

        if (file && !fileTypeRegexp.test(file.name)) {
            return {
                message: 'Неверный формат. Требуется файл с расширением .pdf',
                status: 'error',
            };
        }

        return {
            data: file,
        };
    }, []);

    return (
        <StyledWrapper>
            <Upload
                progress={progress}
                content={
                    <div style={{ background: 'red' }}>
                        <IconMusic size="s" color="inherit" />
                        Загрузите файл формата .pdf
                    </div>
                }
                loader={<div style={{ color: 'green' }}>Кастомная загрузка {progress}%</div>}
                onChange={onChange}
                validate={customValidate}
                {...rest}
            />
        </StyledWrapper>
    );
};

Base.args = {
    disabled: false,
    accept: '.pdf',
    message: 'Штош',
    status: 'error',
};

// export const Audio: Story<StoryProps> = ({ ...rest }) => {
//     return (
//         <StyledWrapper>
//             <Upload contentLeft={<IconPlay size="s" color="inherit" />} contentRight="3:24" {...rest}>

//             </Upload>
//         </StyledWrapper>
//     );
// };

// Audio.args = {
//     text: 'I’m Not Okey',
//     type: 'audio',
//     disabled: false,
// };

// export const Progress: Story<StoryProps> = ({ text: formatText, ...rest }) => {
//     const [progress, setProgress] = useState(0);
//     const text = formatText.replace('%n', progress.toString());

//     useEffect(() => {
//         const refresh = setInterval(
//             () =>
//                 setProgress((p) => {
//                     if (p + 5 > 100) {
//                         return 0;
//                     }
//                     return p + 5;
//                 }),
//             1000,
//         );

//         () => clearInterval(refresh);
//     }, []);

//     return (
//         <StyledWrapper>
//             <Upload text={text} progress={progress} {...rest} />
//         </StyledWrapper>
//     );
// };

// Progress.args = {
//     text: 'Загружено %n%',
//     type: 'image',
//     disabled: false,
// };
