import React from 'react';
import { FormField, VoiceField, Input, FormContextApi } from '@sberdevices/plasma-temple';

import { Recipient } from '../../../../types';
import { useAssistantState } from '../../../../hooks/useAssistantState';
import { AddressField } from '../AddressField/AddressField';

interface FormContentProps extends FormContextApi<Recipient> {
    screen: string;
    manualMode: boolean;
    setManualMode: (manual: boolean) => void;
}

export const FormContent: React.FC<FormContentProps> = ({
    screen,
    manualMode,
    active,
    data,
    onChange,
    onSubmit,
    setManualMode,
}) => {
    const { name, phone, email, address } = data;

    useAssistantState({ screen, active });

    React.useEffect(() => setManualMode(['address', 'phone', 'email'].includes(active)), [active, setManualMode]);

    return (
        <>
            <FormField name="address" active={active as string}>
                <AddressField value={address} onChange={onChange} onSubmit={onSubmit} />
            </FormField>
            <FormField name="name" active={active as string}>
                <VoiceField
                    labels={{
                        one: 'Имя и фамилия',
                        suggestion: 'Имя и фамилия',
                        reject: 'Нет, ввести другую',
                    }}
                    onSubmit={onSubmit}
                    onChange={onChange}
                    value={name}
                    manualMode={manualMode}
                >
                    <Input
                        onSubmit={onSubmit}
                        onChange={onChange}
                        value={name}
                        label="Имя и фамилия"
                        required
                        validationMessages={{
                            valueMissing: 'Поле обязательно',
                        }}
                    />
                </VoiceField>
            </FormField>
            <FormField name="phone" active={active as string}>
                <VoiceField
                    labels={{
                        one: 'Номер телефона',
                        suggestion: 'Номер телефона',
                    }}
                    onSubmit={onSubmit}
                    onChange={onChange}
                    value={phone}
                    manualMode={manualMode}
                >
                    <Input
                        value={phone}
                        onChange={onChange}
                        onSubmit={onSubmit}
                        label="Номер телефона"
                        pattern="((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}"
                        required
                        validationMessages={{
                            patternMismatch: 'Номер телефона указан неверно',
                            valueMissing: 'Обязательное поле',
                        }}
                    />
                </VoiceField>
            </FormField>
            <FormField name="email" active={active as string}>
                <Input
                    type="email"
                    value={email}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    label="Адрес электронной почты"
                    required
                    validationMessages={{
                        typeMismatch: 'Адрес электронной почты указан неверно',
                        valueMissing: 'Обязательное поле',
                    }}
                    helperText="Электронная почта нужна для того, чтобы вы могли отслеживать статус заказа"
                />
            </FormField>
        </>
    );
};
