import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react';
import { InSpacingDecorator } from '@sberdevices/plasma-sb-utils';

import { UploadVisual } from '.';
import type { UploadVisualProps } from '.';

export default {
    title: 'Controls/UploadVisual',
    component: UploadVisual,
    argTypes: {},
    decorators: [InSpacingDecorator],
} as Meta;

const StyledWrapper = styled.div`
    width: 23.75rem;
`;

interface StoryProps extends UploadVisualProps {}

const images = [
    { id: 1 * Math.random(), image: './images/320_320_0.jpg', caption: '3:24' },
    { id: 2 * Math.random(), image: './images/320_320_1.jpg', isSelected: true },
    { id: 3 * Math.random(), image: './images/320_320_2.jpg' },
    { id: 4 * Math.random(), image: './images/320_320_3.jpg' },
    { id: 5 * Math.random(), image: './images/320_320_4.jpg' },
    // { id: 1 * Math.random(), image: './images/320_320_0.jpg', caption: '3:24' },
    // { id: 2 * Math.random(), image: './images/320_320_1.jpg', isSelected: true },
    // { id: 3 * Math.random(), image: './images/320_320_2.jpg' },
    // { id: 4 * Math.random(), image: './images/320_320_3.jpg' },
    // { id: 5 * Math.random(), image: './images/320_320_4.jpg' },
    // { id: 1 * Math.random(), image: './images/320_320_0.jpg', caption: '3:24' },
    // { id: 2 * Math.random(), image: './images/320_320_1.jpg', isSelected: true },
    // { id: 3 * Math.random(), image: './images/320_320_2.jpg' },
    // { id: 4 * Math.random(), image: './images/320_320_3.jpg' },
    // { id: 5 * Math.random(), image: './images/320_320_4.jpg' },
    // { id: 1 * Math.random(), image: './images/320_320_0.jpg', caption: '3:24' },
    // { id: 2 * Math.random(), image: './images/320_320_1.jpg', isSelected: true },
    // { id: 3 * Math.random(), image: './images/320_320_2.jpg' },
    // { id: 4 * Math.random(), image: './images/320_320_3.jpg' },
    // { id: 5 * Math.random(), image: './images/320_320_4.jpg' },
];

const addedImage = { id: 6, image: './images/320_320_5.jpg' };

export const Visual: Story<StoryProps> = ({ ...rest }) => {
    const [progress, setProgress] = useState(undefined);
    const [items, setItems] = useState(images);

    useEffect(() => {
        console.log('items', items);
    }, [items]);

    const onChange = useCallback(
        (file: File) => {
            console.log('file', file);
            const interval = setInterval(
                () =>
                    setProgress((prevValue?: number) => {
                        const value = prevValue === undefined ? 0 : prevValue;

                        if (value + 5 > 100) {
                            clearInterval(interval);
                            setItems((prevItems) => [...prevItems, addedImage]);
                            return undefined;
                        }
                        return value + 5;
                    }),
                1000,
            );
        },
        [setProgress, setItems],
    );

    return (
        <StyledWrapper>
            <UploadVisual items={items} progress={progress} setItems={setItems} onChange={onChange} />
        </StyledWrapper>
    );
};

Visual.args = {
    disabled: false,
};

export const Visual2: Story<StoryProps> = ({ ...rest }) => {
    const [progress, setProgress] = useState(undefined);
    const [items, setItems] = useState(images);

    useEffect(() => {
        console.log('items', items);
    }, [items]);

    const onChange = useCallback(
        (file: File) => {
            console.log('file', file);
            const interval = setInterval(
                () =>
                    setProgress((prevValue?: number) => {
                        const value = prevValue === undefined ? 0 : prevValue;

                        if (value + 5 > 100) {
                            clearInterval(interval);
                            setItems((prevItems) => [...prevItems, addedImage]);
                            return undefined;
                        }
                        return value + 5;
                    }),
                1000,
            );
        },
        [setProgress, setItems],
    );

    return (
        <StyledWrapper>
            <UploadVisual
                interactionType="draggable"
                items={items}
                progress={progress}
                setItems={setItems}
                onChange={onChange}
            />
        </StyledWrapper>
    );
};
