import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import { InSpacingDecorator } from '@sberdevices/plasma-sb-utils';
import { IconPlay } from '@sberdevices/plasma-icons';

import { Upload } from '.';
import type { UploadProps } from '.';

export default {
    title: 'Controls/Upload',
    component: Upload,
    argTypes: {},
    decorators: [InSpacingDecorator],
} as Meta;

const StyledWrapper = styled.div`
    width: 23.75rem;
`;

interface StoryProps extends UploadProps {
    demonstrateProgress?: boolean;
}

export const Audio: Story<StoryProps> = ({ ...rest }) => {
    return (
        <StyledWrapper>
            <Upload contentLeft={<IconPlay size="s" color="inherit" />} contentRight="3:24" {...rest} />
        </StyledWrapper>
    );
};

Audio.args = {
    text: 'I’m Not Okey',
    type: 'audio',
    disabled: false,
};

const images = [
    { id: 1, image: './images/320_320_0.jpg', caption: '3:24' },
    { id: 2, image: './images/320_320_1.jpg' },
    { id: 3, image: './images/320_320_2.jpg' },
    { id: 4, image: './images/320_320_3.jpg' },
    { id: 5, image: './images/320_320_4.jpg' },
    { id: 6, image: './images/320_320_5.jpg' },
];

export const Image: Story<StoryProps> = ({ ...rest }) => {
    const [items, setItems] = useState(images);

    const deleteItem = useCallback(
        (id) =>
            setItems((oldItems) => {
                const newItems = [...oldItems];
                const idIndex = newItems.findIndex((item) => item.id === id);
                newItems.splice(idIndex, 1);
                return newItems;
            }),
        [],
    );

    return (
        <StyledWrapper>
            <Upload items={items} onItemRemove={deleteItem} {...rest} />
        </StyledWrapper>
    );
};

Image.args = {
    text: 'Загрузите фото или видео',
    type: 'image',
    disabled: false,
};

export const Progress: Story<StoryProps> = ({ text: formatText, ...rest }) => {
    const [progress, setProgress] = useState(0);
    const text = formatText.replace('%n', progress.toString());

    useEffect(() => {
        const refresh = setInterval(
            () =>
                setProgress((p) => {
                    if (p + 5 > 100) {
                        return 0;
                    }
                    return p + 5;
                }),
            1000,
        );

        () => clearInterval(refresh);
    }, []);

    return (
        <StyledWrapper>
            <Upload text={text} progress={progress} {...rest} />
        </StyledWrapper>
    );
};

Progress.args = {
    text: 'Загружено %n%',
    type: 'image',
    disabled: false,
};
