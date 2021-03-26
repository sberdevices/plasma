# Взимодействе со сценарием

В пакете реализовано базовое взаимодействие со сценарием приложения

Первоначально необходимо сконфигурировать вызов навыка для локальной отладки

```ts
// App.tsx
const App = createApp({
    ...
    assistant: {
        initPrhase: 'запусти каталог',
        nativePanel: {
            defaultText: 'Открой игрульки'
        }
    }
})
```
В конфигурации Ассистента можно подписаться на следующие события:

* `onStart` - функция, в аррументе которой будут доступны методы работы с состоянием приложения.
* `onData` - функция для обработки сценарных комманд, так же может быть синхронной или асинхронной. Аргументами будут комманда и методы для работы с состоянием

Функции может быть как синхронной, так и асинхронной
```ts
// App.tsx
export const App = createApp({
    ...
    assistant: {
        ...
        onStart: (methods) => {
            // do something

            // функция установки нового состояния приложения
            methods.pushState({
                // new state
            });
        },
        onData: async (command, methods) => {
            // do something asynchonous

            // функция изменения текущего состояния приложения
            methods.setState({
                // changed state
            });
        },
    },
});
```

Можно обработать сценарную комманду внутри конктретного маршрута в конфигуации

```ts
// App.tsx
export const App = createApp({
    routes: [
        ...
        type: Screen.detail,
        onData: async (command, methods) => {
            // do something asynchonous

            // функция возврата к на шаг назад
            methods.popState()
        },
    ],
});
```

или внутри компонента интерфейса
```ts
// pages/MyTemplate.tsx
import { useOnDataHandler } from '@sberdevices/plasma-temple'

const MyTemplate: React.FC<PageProps<DetailPayload>> = () => {
    // some template logic

    useOnDataHandler((command, methods) => {
        // do something

        methods.setState({
            // changed state
        });
    })

    return (
        <some>
            <jsx>
                <markup />
            </jsx>
        </some>
    )
}

export default MyTemplate;

// App.tsx
import MyTemplate from './pages/MyTemplate.tsx'

export const App = createApp({
    routes: [
        ...
        type: Screen.detail,
        component: MyTemplate // кастомный шаблон интерфейса приложения
    ],
});
```

## Контракт взаимодействия со сценарием
### Экраны приложения
* Screen.gallery - главный экран приложения с галереей / несколькими галереями
* Screen.entity - экран развернутой информацией об элементе галерии
* Screen.detail - экран детализации об элементе галерееи

### Контракты данных
Для каждого из экранов имеется обязательный контракт данных

Общие данные для всех экранов

```ts
type AspectRatio = '1:1' | '4:3' | '16:9';

// любые данные не попадающие в описанный формат
interface MetaPayload {
    meta?: Record<string, any>;
}

// пропсы медиа объекта, в данном случае только для изображения
interface MediaObject {
    src: string[] | string;
    ratio?: AspectRatio;
}

// пропсы хедера
interface HeaderPropsPayload {
    title: string;
    subtitle?: string;
    logo?: string;
}
```

```ts
// Screen.gallery

// данные для элемента галерии
interface GalleryItemViewPayload extends MetaPayload {
    id: string;
    label: string;
    position: number;
    image: MediaObject;
    description?: string;
    tag?: string;
    time?: string;
}

interface GalleryViewPayload extends MetaPayload, HeaderPropsPayload {
    items: Array<GalleryItemViewPayload> | Array<Array<GalleryItemViewPayload>>;
    title: string;
}
```

```ts
// Screen.entity

interface ItemViewEntity extends MetaPayload {
    label: string;
    image: MediaObject;
    position: number;
}

interface EntityPayload extends MetaPayload, HeaderPropsPayload {
    background: MediaObject;
    entities: Array<ItemViewEntity>;
    id: string | number;
    description: { title: string; content: string }[];
    itemShowButtonText: string;
    entitiesTitle: string;
}
```

```ts
// Screen.detail

interface DetailPayload extends MetaPayload, HeaderPropsPayload {
    order?: string[];
}
```

---
|Другие разделы ||||||
|---|---|---|---|---|---|
| [Кофигурация](./config.md) | [Действия](./actions.md) | [Шаблоны](./templates.md) | [Хуки](./hooks.md) | Взаимодействие со сценарием | [Формы](./forms.md) |
---
