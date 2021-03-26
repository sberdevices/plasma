import React from 'react';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { useRef } from '@storybook/addons';

import { FormField, Form, Input, VoiceField } from '../src';

interface FormData {
    name: string;
    email: string;
}


const initialData: FormData = {
    name: '',
    email: '',
}

export const FormSample = () => {
    return (
        <Form
            sequence={['name', 'email']}
            initialData={initialData}
            onSubmit={action('onSubmit')}
            onChangeValueField={action('onChangeValueField')}
        >
            {({ active, onChange, onSubmit, data }) => (
                <>
                    <FormField name="name" active={active}>
                        <VoiceField
                            labels={object('field labels for Name', {
                                one: 'Имя',
                                suggestion: 'имя',
                            })}
                            onSubmit={onSubmit}
                            onChange={onChange}
                            value={data.name}
                            component={Input}
                        />
                    </FormField>
                    <FormField name="email" active={active}>
                        <VoiceField
                            value={data.email}
                            labels={object('field labels for Email', {
                                one: 'Email',
                                suggestion: 'email',
                            })}
                            onChange={onChange}
                            onSubmit={onSubmit}
                            component={Input}
                        />
                    </FormField>
                </>
            )}
        </Form>
    );
};

export default {
    title: 'Form',
};
