import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SSRProvider } from '../SSRProvider';
import { disableProps } from '../../helpers';
import { Button } from '../Button';
import { P1, Headline1, Headline3 } from '../Typography';

import { ModalView } from './ModalView';

import { ModalsProvider, Modal } from '.';

const longText = `Если после применения правила Лопиталя неопределённость типа 0 / 0 осталась, мнимая единица традиционно
развивает Наибольший Общий Делитель (НОД). Функция многих переменных, исключая очевидный случай,
упорядочивает интеграл от функции, обращающейся в бесконечность в изолированной точке. Интересно
отметить, что эпсилон окрестность развивает разрыв функции. Собственное подмножество естественно
соответствует экспериментальный Наибольший Общий Делитель (НОД). Постоянная величина положительна.`;

export default {
    title: 'Controls/Modal',
} as Meta;

export const Default: Story<{ heading: string; text: string }> = ({ heading, text }) => (
    <div style={{ margin: '-1rem', padding: '1rem', background: 'rgba(8, 8, 8, 0.2)' }}>
        <ModalView onClose={() => alert('Close!')}>
            <Headline1>{heading}</Headline1>
            <P1>{text}</P1>
        </ModalView>
    </div>
);

const propsToDisable = ['isOpen', 'children', 'onClose'];

Default.args = {
    heading: 'Тэги «Голосовая викторина Queez с Валдисом Пельшем»',
    text: longText,
};

Default.argTypes = {
    ...disableProps(propsToDisable),
};

export const LiveDemo = () => {
    const [isOpenA, setIsOpenA] = React.useState(false);
    const [isOpenB, setIsOpenB] = React.useState(false);
    const [isOpenC, setIsOpenC] = React.useState(false);

    const onCloseA = React.useCallback(() => setIsOpenA(false), []);
    const onCloseB = React.useCallback(() => setIsOpenB(false), []);
    const onCloseC = React.useCallback(() => setIsOpenC(false), []);

    return (
        <SSRProvider>
            <ModalsProvider>
                <Button text="Open modal" onClick={() => setIsOpenA(true)} />
                <ul>
                    <li>A: {isOpenA ? 'open' : 'closed'}</li>
                    <li>B: {isOpenB ? 'open' : 'closed'}</li>
                    <li>C: {isOpenC ? 'open' : 'closed'}</li>
                </ul>

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
        </SSRProvider>
    );
};
