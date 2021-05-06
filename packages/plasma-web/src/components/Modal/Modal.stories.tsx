import React from 'react';
import { text } from '@storybook/addon-knobs';

import { Button } from '../Button';
import { P1, Headline1, Headline3 } from '../Typography';

import { ModalView } from './ModalView';

import { ModalsProvider, Modal } from '.';

export const Default = () => (
    <div style={{ margin: '-1rem', padding: '1rem', background: 'rgba(8, 8, 8, 0.2)' }}>
        <ModalView onClose={() => alert('Close!')}>
            <Headline1>{text('heading', 'Тэги «Голосовая викторина Queez с Валдисом Пельшем»')}</Headline1>
            <P1>
                Если после применения правила Лопиталя неопределённость типа 0 / 0 осталась, мнимая единица традиционно
                развивает Наибольший Общий Делитель (НОД). Функция многих переменных, исключая очевидный случай,
                упорядочивает интеграл от функции, обращающейся в бесконечность в изолированной точке. Интересно
                отметить, что эпсилон окрестность развивает разрыв функции. Собственное подмножество естественно
                соответствует экспериментальный Наибольший Общий Делитель (НОД). Постоянная величина положительна.
            </P1>
        </ModalView>
    </div>
);

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
