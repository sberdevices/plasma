import { mountHook } from '@cypress/react';

import { createEvent } from '../testHelpers/testRenderHelpers';

import { useForm } from './useForm';

const initialValues = {
    firstName: '',
    lastName: '',
    city: '',
};

const notValidData = {
    firstName: '',
    lastName: 'Джонни',
    city: 'Chicago',
};

const validData = {
    firstName: 'John',
    lastName: 'Doe',
    city: 'Moscow',
};

const initTestHook = (onSubmit: () => void, onChange: () => void) =>
    mountHook(() => {
        return useForm({
            initialValues,
            validators: {
                firstName: {
                    required: {
                        value: true,
                        message: 'Required field',
                    },
                },
                lastName: {
                    pattern: {
                        value: '[A-z]',
                        message: 'Only latin letters',
                    },
                },
                city: {
                    custom: {
                        isValid: (value) => value === 'Moscow',
                        message: "You're not living in Moscow",
                    },
                },
            },
            onChange,
            onSubmit,
        });
    });

describe('useForm hook', () => {
    it('correct mount hook', () => {
        const onSubmit = cy.stub();
        const onChange = cy.stub();

        initTestHook(onSubmit, onChange).then((hook) => {
            expect(hook.current?.data).deep.equals(initialValues);
            expect(hook.current?.errors).equals(null);
        });
    });

    it('check for not valid data', () => {
        const onSubmit = cy.stub();
        const onChange = cy.stub();

        initTestHook(onSubmit, onChange).then((hook) => {
            const target = document.createElement('input');

            for (const [key, value] of Object.entries(notValidData)) {
                target.name = key;
                target.value = value;

                hook.current?.handleChange(createEvent(target, 'change'));
            }

            expect(onChange).to.be.calledThrice;

            const form = document.createElement('form');
            hook.current?.handleSubmit(createEvent(form, 'submit'));

            expect(hook.current?.errors).deep.equals({
                firstName: 'Required field',
                lastName: 'Only latin letters',
                city: "You're not living in Moscow",
            });
            expect(hook.current?.data).deep.equals(notValidData);
            expect(onSubmit).not.to.be.called;
        });
    });

    it('check for valid data', () => {
        const onSubmit = cy.stub();
        const onChange = cy.stub();

        initTestHook(onSubmit, onChange).then((hook) => {
            const target = document.createElement('input');

            for (const [key, value] of Object.entries(validData)) {
                target.name = key;
                target.value = value;

                hook.current?.handleChange(createEvent(target, 'change'));
            }

            expect(onChange).to.be.calledThrice;

            const form = document.createElement('form');

            hook.current?.handleSubmit(createEvent(form, 'submit'));

            expect(hook.current?.errors).deep.equals(null);
            expect(hook.current?.data).deep.equals(validData);
            expect(onSubmit).to.be.called;
        });
    });

    it('check for valid data', () => {
        const onSubmit = cy.stub();
        const onChange = cy.stub();

        initTestHook(onSubmit, onChange).then((hook) => {
            const target = document.createElement('input');

            for (const [key, value] of Object.entries(notValidData)) {
                target.name = key;
                target.value = value;

                hook.current?.handleChange(createEvent(target, 'change'));
            }

            const form = document.createElement('form');

            hook.current?.handleSubmit(createEvent(form, 'submit'));

            target.name = 'lastName';
            target.value = 'Doe';
            hook.current?.handleChange(createEvent(target, 'change'));

            expect(hook.current?.errors).deep.equals({
                firstName: 'Required field',
                lastName: undefined,
                city: "You're not living in Moscow",
            });
        });
    });
});
