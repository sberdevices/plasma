---
id: forms
title: Формы
sidebar_position: 7
---

# Формы

Пакет содержит API для построения форм.

Данные можно вводить в формы с помощью экранной клавиатуры, D-pad пульта или голосовыми командами сценария.

## API компонент

### Form

```ts
interface FormState {
    readonly [key: string]: any;
}

interface FormContextApi<D extends FormState = FormState> {
    // Данные формы
    data: D;

    // Колбэк перехода к следующему полю, необходим для компонент полей
    onSubmit: () => void;

    // Коллбек изменения значения текущего поля, необходим для компонент полей
    onChange: <V>(val: V) => void;

    // Tекущее активное поле
    active: string;
}

interface FormProps<D, K extends keyof D = keyof D> {
    // Последовательность полей формы
    sequence: string[];

    // Значения формы для инициализации
    initialData: D;

    // Поле которое откроется первым при переходе. Если не укаано будет первый элемент `sequence`
    initialField?: string;

    children: (val: FormContextApi<D>) => React.ReactElement;

    // Колбэк сабмита формы
    onSubmit?: (data: D) => void;

    // Колбэк изменения значения в активном поле формы
    onChangeValueField?: (val: D[K], field: K) => void;
}
```

### FormField

```ts
interface FieldProps {
    // Текущее активное поле
    active: string;

    // Имя поля
    name: string;
}
```

### VoiceField

```ts
interface VoiceLabels {
    // Лейбл для одного значения
    one: string;

    // Лейбл для множества значений
    many?: string;

    // Лейбл для экрана потвеждения значения, полученного из сценария
    description?: string;

    // Лейбл для экрана выбора способа заполнения поля
    suggestion: string;

    // Подсказка на экране выбора
    hint?: string;
}

interface VoiceFieldProps<T> {
    // Лейблы для состояний голосовго ввода
    labels: VoiceLabels;

    // Обработчик значения, полученного из сценарного действия
    formatter?: (value: T) => string;

    // Колбэк изменения значения текущего поля. Необходим для компонент полей
    onChange: (value: T) => void;

    // Колбэк перехода к следующему полю. Необходим для компонент полей
    onSubmit: () => void;

    // Значение поля
    value: T;

    // Компонент ручного ввода
    component?: React.FC<FieldPropsWithRef<T>>;
}
```

## Пример

```ts
// pages/Form.tsx

...
import { Form, FormField, Input, PageProps } from '@sberdevices/plasma-temple'

interface FormData {
    name: string;
    email: string;
}

export const MyForm: React.FC<PageProps<FormData>> = (props) => (
    <>
        <Header {...props.header} />
        <Form sequence={['name', 'email']} initialData={props.data}>
            {({ active, onChange, onSubmit, data }) => (
                <>
                    <FormField name="name" active={active}>
                        <Input value={data.name} onChange={onChange} onSubmit={onSubmit} />
                    </FormField>
                    <FormField name="email" active={active}>
                        <Input value={data.email} onChange={onChange} onSubmit={onSubmit} />
                    </FormField>
                </>
            )}
        </Form>
    </>
)

/** App.tsx */

...
import { MyForm } from './pages/Form.tsx'

export const App = () => (
    <PlasmaApp {...appParams}>
        ...
        <Page name="form" component={MyForm}>
    </PlasmaApp>
)
```
