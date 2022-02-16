import React from 'react';
import { Meta } from '@storybook/react';

import { Button } from '../Button';
import { Headline3 } from '../Typography';

import { ModalsProvider, Modal } from '.';

export default {
    title: 'Controls/Modal',
} as Meta;

export const LiveDemo = () => {
    const [isOpenA, setIsOpenA] = React.useState(false);
    const [isOpenB, setIsOpenB] = React.useState(false);
    const [isOpenC, setIsOpenC] = React.useState(false);

    const onCloseA = React.useCallback(() => setIsOpenA(false), []);
    const onCloseB = React.useCallback(() => setIsOpenB(false), []);
    const onCloseC = React.useCallback(() => setIsOpenC(false), []);

    return (
        <ModalsProvider>
            <Button text="Open modal" onClick={() => setIsOpenA(true)} />

            <Modal id="modalA" isOpen={isOpenA} onClose={onCloseA}>
                <Headline3>Modal A</Headline3>
                <Button view="primary" text="Open modal B" onClick={() => setIsOpenB(true)} />
                <Button text="Close" onClick={onCloseA} />
            </Modal>

            <Modal id="modalB" isOpen={isOpenB} onClose={onCloseB}>
                <Headline3>Modal B</Headline3>
                <Button view="primary" text="Open modal C" onClick={() => setIsOpenC(true)} />
                <Button text="Close" onClick={onCloseB} />

                <Modal id="modalC" isOpen={isOpenC} onClose={onCloseC}>
                    <Headline3>Modal C</Headline3>
                    <Button text="Close" onClick={onCloseC} />
                </Modal>
            </Modal>
        </ModalsProvider>
    );
};
