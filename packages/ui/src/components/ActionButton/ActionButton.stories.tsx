import React from 'react';

import ActionButton from './ActionButton';

export default {
    title: 'ActionButton',
};

export const Default = () => {
    return (
        <>
            <ActionButton color="red" />
            <br />
            <ActionButton color="green" />
            <br />
            <ActionButton color="blue" />
        </>
    );
};

export const SizeSmall = () => (
    <>
        <ActionButton color="red" size="small" />
        <br />
        <ActionButton color="green" size="small" />
        <br />
        <ActionButton color="blue" size="small" />
    </>
);

export const SizeLarge = () => (
    <>
        <ActionButton color="red" size="large" />
        <br />
        <ActionButton color="green" size="large" />
        <br />
        <ActionButton color="blue" size="large" />
    </>
);
