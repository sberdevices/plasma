import React from 'react';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';
import { IconPicture } from '@sberdevices/plasma-icons';

import { defaultValidate } from './utils';
import { ValidationResult } from './types';

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

    function Demo() {
        const onChange = React.useCallback(() => {}, []);

        const onValidation = React.useCallback(() => {}, []);

        const validate = React.useCallback((files: FileList | null): ValidationResult => {
            return {
                message: `Добавлен файл формата ${files[0].type}`,
                status: 'success',
                data: files[0],
            };
        }, []);

        return <Upload content="Drag and Drop" onChange={onChange} validate={validate} onValidation={onValidation} />;
    }

    it('upload dnd from fixture', () => {
        const fileUrl = 'images/320_320_0.jpg';
        const type = 'image/jpg';

        mount(
            <CypressTestDecorator>
                <Demo />
            </CypressTestDecorator>,
        );

        cy.fixture(fileUrl, 'base64')
            .then(Cypress.Blob.base64StringToBlob)
            .then((blob) => {
                const nameSegments = fileUrl.split('/');
                const name = nameSegments[nameSegments.length - 1];
                const testFile = new File([blob], name, { type });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(testFile);
                const event = { dataTransfer };

                return cy.get('.file-drop').trigger('drop', event);
            });

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

describe('plasma-b2c: Upload utils', () => {
    const Upload = getComponent('Upload');

    const files = ([
        {
            name: 'video.mkv',
        },
    ] as unknown) as FileList;

    it('defaultValidate', () => {
        mount(
            <CypressTestDecorator>
                <Upload />
            </CypressTestDecorator>,
        );

        expect(defaultValidate(null)).to.deep.eq({
            message: 'Загрузите файл',
            status: 'error',
            data: null,
        });

        expect(defaultValidate(files)).to.deep.eq({ data: { name: 'video.mkv' } });

        expect(defaultValidate(files, '.mkv')).to.deep.eq({ data: { name: 'video.mkv' } });

        expect(defaultValidate(files, '.avi, .mkv')).to.deep.eq({ data: { name: 'video.mkv' } });

        expect(defaultValidate(files, '.avi')).to.deep.eq({
            data: null,
            message: 'Неверный формат файла. Используйте avi-формат',
            status: 'error',
        });
    });
});
