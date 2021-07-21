# Формы

Пакет имеет необходимое API для посторения форм, в которые можно вводить данные с использованием экранной клавиатуры и D-pad'а пульта, так и голосом с помощью сценарных команд

## API компонент

#### Form

```ts
interface FormState {
    readonly [key: string]: any;
}

interface FormContextApi<D extends FormState = FormState> {
    // Данные формы
    data: D;

    // Колбек перехода к следующему полю, необходим для компонент полей
    onSubmit: () => void;

    // Коллбек изменения значения текущего поля, необходим для компонент полей
    onChange: <V>(val: V) => void;

    // текущее активное поле
    active: string;
}

interface FormProps<D, K extends keyof D = keyof D> {
    // Последовательность полей формы
    sequence: string[];

    // Значения формы для инициализации
    initialData: D;

    // Поле которое откроется первым при переходе, если не укаано будет первый элемент sequence
    initialField?: string;

    children: (val: FormContextApi<D>) => React.ReactElement;

    // Коллбек сабмита формы
    onSubmit?: (data: D) => void;

    // Коллбек на изменение значения в активном поле формы
    onChangeValueField?: (val: D[K], field: K) => void;
}
```

#### FormField

```ts
interface FieldProps {
    // Текущее активное поле
    active: string;

    // Имя поля
    name: string;
}
```

#### VoiceField

```ts
interface VoiceLabels {
    // Лейбл для одного значения
    one: string;

    // Лейбл для множества значений
    many?: string;

    // Лейбл для экрана потвеждения значения полученного и сценария
    description?: string;

    // Лейбл для экрана выбора способа заполнения поля
    suggestion: string;

    // Посказка на экране выбора
    hint?: string;
}

interface VoiceFieldProps<T> {
    // Лейблы для состояний голосовго ввода
    labels: VoiceLabels;

    // Форматтер для значения, полученного из сценарного экшена
    formatter?: (value: T) => string;

    // Коллбек изменения значения текущего поля, необходим для компонент полей
    onChange: (value: T) => void;

    // Колбек перехода к следующему полю, необходим для компонент полей
    onSubmit: () => void;

    // Значение поля
    value: T;

    // Компонент ручного ввода
    component?: React.FC<FieldPropsWithRef<T>>;
}
```

## Использование

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

---

| Другие разделы             |                          |                           |                    |                                              |       |
| -------------------------- | ------------------------ | ------------------------- | ------------------ | -------------------------------------------- | ----- |
| [Кофигурация](./config.md) | [Действия](./actions.md) | [Шаблоны](./templates.md) | [Хуки](./hooks.md) | [Взаимодействие со сценарием](./scenario.md) | Формы |

---
