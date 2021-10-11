import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

const text = `Если после применения правила Лопиталя неопределённость типа 0 / 0 осталась, мнимая единица традиционно
развивает Наибольший Общий Делитель (НОД).`;
const heading = 'Голосовая викторина Валдисом Пельшем';

describe('plasma-web: Modal', () => {
    const ModalsProvider = getComponent('ModalsProvider');
    const Modal = getComponent('Modal');
    const Button = getComponent('Button');
    const P1 = getComponent('P1');
    const Headline3 = getComponent('Headline1');

    function Demo() {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <>
                <Button text="Открыть модальное окно" onClick={() => setIsOpen(true)} />
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <Headline3>{heading}</Headline3>
                    <P1>{text}</P1>
                    <Button text="Закрыть" onClick={() => setIsOpen(false)} />
                </Modal>
            </>
        );
    }

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <ModalsProvider>
                    <Demo />
                </ModalsProvider>
            </CypressTestDecorator>,
        );

        cy.get('button').click();

        cy.matchImageSnapshot();
    });
});
