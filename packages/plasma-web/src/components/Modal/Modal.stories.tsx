import React, { useEffect } from 'react';
import { Story, Meta } from '@storybook/react';

import { SSRProvider } from '../SSRProvider';
import { disableProps } from '../../helpers';
import { withAutoFocus } from '../../hocs';
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

const AutofocusButton = withAutoFocus(Button);

export const LiveDemo = () => {
    const [isOpenA, setIsOpenA] = React.useState(false);
    const [isOpenB, setIsOpenB] = React.useState(false);
    const [isOpenC, setIsOpenC] = React.useState(false);

    const onCloseA = React.useCallback(() => setIsOpenA(false), []);
    const onCloseB = React.useCallback(() => setIsOpenB(false), []);
    const onCloseC = React.useCallback(() => setIsOpenC(false), []);

    useEffect(() => {}, [document.activeElement]);

    return (
        <SSRProvider>
            <ModalsProvider>
                <Button text="Открыть окно A" onClick={() => setIsOpenA(true)} />
                <ul>
                    <li>A: {isOpenA ? 'open' : 'closed'}</li>
                    <li>B: {isOpenB ? 'open' : 'closed'}</li>
                    <li>C: {isOpenC ? 'open' : 'closed'}</li>
                </ul>

                <Modal
                    id="modalA"
                    isOpen={isOpenA}
                    onClose={onCloseA}
                    aria-labelledby="example-modalA-title"
                    closeButtonAriaLabel="Закрыть"
                >
                    <Headline3 id="example-modalA-title" mb="8x">
                        Модальное окно A
                    </Headline3>
                    <AutofocusButton
                        view="primary"
                        text="Открыть окно B"
                        autoFocus={isOpenA}
                        tabIndex={null}
                        onClick={() => setIsOpenB(true)}
                    />
                    <Button text="Закрыть" onClick={onCloseA} />
                </Modal>

                <Modal
                    id="modalB"
                    isOpen={isOpenB}
                    onClose={onCloseB}
                    aria-labelledby="example-modalB-title"
                    closeButtonAriaLabel="Закрыть"
                >
                    <Headline3 id="example-modalB-title" mb="8x">
                        Модальное окно B
                    </Headline3>
                    <AutofocusButton
                        view="primary"
                        text="Открыть окно C"
                        autoFocus={isOpenB}
                        tabIndex={null}
                        onClick={() => setIsOpenC(true)}
                    />
                    <Button text="Закрыть" onClick={onCloseB} />

                    <Modal
                        id="modalC"
                        isOpen={isOpenC}
                        onClose={onCloseC}
                        aria-labelledby="example-modalC-title"
                        closeButtonAriaLabel="Закрыть"
                    >
                        <Headline3 id="example-modalC-title" mb="8x">
                            Модальное окно C (вложенное)
                        </Headline3>
                        <AutofocusButton text="Закрыть" autoFocus={isOpenC} tabIndex={null} onClick={onCloseC} />
                    </Modal>
                </Modal>
            </ModalsProvider>
        </SSRProvider>
    );
};
