import React from 'react';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';
import { IconPicture } from '@sberdevices/plasma-icons';

describe('plasma-b2c: Upload', () => {
    const Upload = getComponent('Upload');

    const baseContent = 'Загрузите файл любого формата';
    const baseMessage = 'Подсказывающее сообщение';

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Upload />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_content', () => {
        const ComponentContent = () => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconPicture size="s" color="inherit" />
                <span style={{ marginLeft: '16px' }}>Загрузите аватарку в формате .jpg</span>
            </div>
        );

        mount(
            <CypressTestDecorator>
                <Upload content="Загрузите файл формата .pdf" accept=".pdf" />
                <PadMe />
                <Upload content={<ComponentContent />} accept=".jpg" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_status', () => {
        mount(
            <CypressTestDecorator>
                <Upload content={baseContent} status="error" message={baseMessage} />
                <PadMe />
                <Upload content={baseContent} status="success" message={baseMessage} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_progress', () => {
        mount(
            <CypressTestDecorator>
                <Upload progress={0} />
                <PadMe />
                <Upload progress={50} />
                <PadMe />
                <Upload progress={100} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_loader', () => {
        const ComponentLoader = () => <div style={{ color: 'green' }}>Кастомная загрузка 42%</div>;

        mount(
            <CypressTestDecorator>
                <Upload progress={0} loader={<ComponentLoader />} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_message', () => {
        mount(
            <CypressTestDecorator>
                <Upload content={baseContent} message={baseMessage} />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_disabled', () => {
        mount(
            <CypressTestDecorator>
                <Upload disabled={false} />
                <PadMe />
                <Upload disabled />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
