import React from 'react';
import { Story, Meta } from '@storybook/react';
import { disableProps } from '@sberdevices/plasma-sb-utils';

import { Button } from '../Button';
import { P1, Headline1, Headline3 } from '../Typography';

import { ModalsProvider, Modal } from '.';

const longText = `Если после применения правила Лопиталя неопределённость типа 0 / 0 осталась, мнимая единица традиционно
развивает Наибольший Общий Делитель (НОД). Функция многих переменных, исключая очевидный случай,
упорядочивает интеграл от функции, обращающейся в бесконечность в изолированной точке. Интересно
отметить, что эпсилон окрестность развивает разрыв функции. Собственное подмножество естественно
соответствует экспериментальный Наибольший Общий Делитель (НОД). Постоянная величина положительна.`;

export default {
    title: 'Controls/Modal',
} as Meta;

const propsToDisable = ['isOpen', 'children', 'onClose'];

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
