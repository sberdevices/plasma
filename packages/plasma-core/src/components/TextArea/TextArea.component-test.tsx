import React from 'react';
import { mount, CypressTestDecorator, getComponent, SpaceMe } from '@sberdevices/plasma-cy-utils';
import { IconEye } from '@sberdevices/plasma-icons';

describe('plasma-core: TextArea', () => {
    const TextArea = getComponent('TextArea');

    it('default', () => {
        mount(
            <CypressTestDecorator>
                <TextArea value="Value" placeholder="Placeholder" helperText="Helper text" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it(':empty', () => {
        mount(
            <CypressTestDecorator>
                <TextArea placeholder="Placeholder" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it(':focused', () => {
        mount(
            <CypressTestDecorator>
                <TextArea value="Value" placeholder="Placeholder" helperText="Helper text" />
            </CypressTestDecorator>,
        );

        cy.get('textarea:first').focus();
        cy.matchImageSnapshot();
    });

    it(':disabled', () => {
        mount(
            <CypressTestDecorator>
                <TextArea value="Value" placeholder="Placeholder" helperText="Helper text" disabled />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it(':success, :warning, :error', () => {
        mount(
            <CypressTestDecorator>
                <TextArea value="Value" placeholder="Placeholder" helperText="Helper text" status="success" />
                <SpaceMe />
                <TextArea value="Value" placeholder="Placeholder" helperText="Helper text" status="warning" />
                <SpaceMe />
                <TextArea value="Value" placeholder="Placeholder" helperText="Helper text" status="error" />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('resize', () => {
        mount(
            <CypressTestDecorator>
                <TextArea
                    resize="horizontal"
                    value="horizontal"
                    placeholder="Placeholder"
                    helperText="Helper text"
                    contentRight={<IconEye color="inherit" size="s" />}
                />
                <TextArea
                    resize="vertical"
                    value="vertical"
                    placeholder="Placeholder"
                    helperText="Helper text"
                    contentRight={<IconEye color="inherit" size="s" />}
                />
                <TextArea
                    resize="both"
                    value="both"
                    placeholder="Placeholder"
                    helperText="Helper text"
                    contentRight={<IconEye color="inherit" size="s" />}
                />
            </CypressTestDecorator>,
        );

        cy.root().get('textarea').last().invoke('attr', 'style', 'width: 280px; height: 140px;');

        cy.matchImageSnapshot();
    });

    it('contentRight', () => {
        mount(
            <CypressTestDecorator>
                <TextArea
                    value="Value"
                    placeholder="Placeholder"
                    helperText="Helper text"
                    contentRight={<IconEye color="inherit" size="s" />}
                />
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
