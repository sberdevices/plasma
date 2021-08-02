#Базовая функциональность

Основная задача базовой функциональности пакета, состоит в том, чтобы максимально быстро перейти к разработке функционала [Canvas App](https://developer.sberdevices.ru/docs/ru/methodology/research/canvasapp) непосредственно относящегося к бизнес требованиям, предъявляемых к разрабатываемому приложению и включает в себя следущую функциональность:

-   настройка взаимодействия с [Assistant Client](https://github.com/sberdevices/assistant-client)
-   роутинг между экранами приложения
-   хранение состояния приложения, включая историю состояния экранов приложения.

## Основные компоненты

-   PlasmaApp
-   Page

### PlasmaApp

Базовый компонент приложения, используемый при построении приложения на базе пакета `@sberdevices/plasma-temple`.

Отвечает за следующий функционал приложения:

-   инициализация [Assistant Client](https://github.com/sberdevices/assistant-client)
-   роутинг между экранами приложения
-   хранение состояния приложения

Принимает следующие пропсы:
| Имя | Обязательный | Описание |
| :--------------- | :----------: | :------------------------------------------------------------------------- |
| children | Да | Список экранов приложения созданных на базе компонента [Page](#page)|
| assistantParams | Да | Параметры инициализации [Assistant Client](https://github.com/sberdevices/assistant-client)|
| header | Нет | Пропсы [plasma-ui/Header](https://plasma.sberdevices.ru/current/?path=/docs/layout-header--default)|
| onStart | Нет | Функция, которая вызывается после того как ассистент готов к работе. Например в данном колбэке можно выполнить переход на какой-либо экран приложения |

### Page

Отвечает за рендер компонента экрана.

Принимает следующие пропсы:

| Имя               | Обязательный | Описание                                                                                                                                                                                                                                                                                |
| :---------------- | :----------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name              |      Да      | Имя экрана приложения                                                                                                                                                                                                                                                                   |
| component         |      Да      | Компонент экрана приложения, должен удовлетворять [контракту](#компонент-экрана)                                                                                                                                                                                                        |
| fallbackComponent |     Нет      | Компонент отображаемый, пока код исходного компонента не загружен                                                                                                                                                                                                                       |
| header            |     Нет      | Переопределяет пропсы заголовка, определенные на уровне компонента [PlasmaApp](#PlasmaApp)                                                                                                                                                                                              |
| ignoreInsets      |     Нет      | По умолчанию странице добавляются паддинги соответствующие размерам нативной панели ассистента, если данные паддинги необходимо игнорировать, например контент страницы полность умещается на экран и не перекрывается нативной панелью, то необходимо данный пропс установить в `true` |

#### Компонент экрана

Отвечает за содержимое конкретного экрана приложения. Создается непосредственно в рамках разрабатываемого приложения.

Принимает следующие пропсы:
| Имя | Обязательный | Описание |
| :--------------- | :----------: | :------------------------------------------------------------------------- |
| name | Да | Соответствует значению пропса компонента [Page](#page) |
| state | Да | Состояние экрана |
| params | Да | Параметры экрана, с которыми он открывается при вызове с помощью метода `pushScreen` |
| assistant | Да | Ссылка на инстант [Assistant Client](https://github.com/sberdevices/assistant-client) |
| fallbackComponent| Нет | Компонент, отображаемый до момента пока основной контент экрана не готов |
| header | Нет | Пропсы заголовка |
| pushHistory | Да | Выполняет переход на новый экран. В качестве параметров принимает имя нового экрана и состояние нового экрана |
| pushScreen | Да | Выполняет переход на новый экран. В качестве параметров принимает имя нового экрана и параметры с которыми открывается экран |
| goToScreen | Да | Выполняет переход на экран, котороый уже есть в истории экранов приложения. При этом вся история до этого экрана очищается. Принимает в качестве значения имя экрана |
| popScreen | Да | Удаляет текущий экран из истории приложения, тем самым возвращаясь на предыдущий экран |
| changeState | Да | Изменяет состояние текущего экрана |
| sendData | Да | Осуществляет отправку сообщения ассистенту. Если тип отправляемого сообщения равен `REQUEST_DATA`, то отправка сообщения ассистенту не будет выполнена, но при этом подписчики ассистента на тип события 'data' получат сообщение |
| setAssistantState| Да | Устанавливает состояние Canvas App |

Компонент Page поддерживает динамический импорт компонента экрана, например, возможны следующие варианты:

-   Использование `React.lazy`:

```typescript
const Gallery = React.lazy(() => import('./pages/Main'));
...
<Page name="gallery" component={Gallery} />
...
```

-   Использование `Page.lazy` с возможностью инициализации состояния компонента страницы до рендера:

`Page.lazy` в качестве аргумента принимает функцию, которая должна вызвать динамический import(). Результатом возвращённого Promise является модуль, который экспортирует по умолчанию React-компонент (export default) и функцию инициализации состояния компонента `getInitialProps` (может быть реализована в модуле компонента, как отдельная экспортируемая функция или как свойство функции компонента страницы). Функция `getInitialProps` в качестве аргумента принимает объект, содержащий свойство `params`, в котором содержаться параметры, открываемого экрана.

```typescript
// pages/Main.tsx

import React from 'react';

import { GalleryPage, PageComponent } from '@sberdevices/plasma-temple';

import { PageParamsType, PageStateType } from '../types';

// Инициализация состояния компонента до его рендера
export const getInitialProps = () => Promise.resolve('some gallery state');

export const Gallery: PageComponent<PageStateType, 'gallery', PageParamsType> = ({ state, header, changeState }) => {
    const onCardClick = React.useCallback(() => {
        /* do something */
    }, []);

    return <GalleryPage header={header} state={state} changeState={changeState} onCardClick={onCardClick} />;
};

export default Gallery;
```

```typescript
// App.tsx

const Gallery = Page.lazy(() => import('./pages/Main'));
...
<Page name="gallery" component={Gallery} />
...
```

## Пример

Рассмотрим небольшой пример разработки приложения с помощью пакета. Необходимо разработать приложение, состоящее из двух экранов: галерея фильмов, информация о фильме

Пример рассмотрим с двумя возможными вариантами инициализации состояния:

-   [после первого рендера компонента](#после-первого-рендера-компонента)
-   [до первого рендера компонента](#до-первого-рендера-компонента)

### После первого рендера компонента

В данном случае инициализация состояния экранов будет выполняться после монтирования компонента экрана. В нашем примере в хуке `useMount`.

```typescript
// types.ts

import { AssistantSmartAppData } from '@sberdevices/assistant-client';
import { GalleryPageState, PlasmaAppProps } from '@sberdevices/plasma-temple';

export type AssistantProps = PlasmaAppProps['assistantParams'];
export type AppHeaderProps = PlasmaAppProps['header'];

export interface Film {
    id: string;
    name: string;
    poster: string;
    genre: string;
    rating: number;
}

// Тип описывает состояние экранов приложения
export interface PageStateType {
    gallery: GalleryPageState<Film> | null;
    film: Film | null;
}

// Тип описывает параметры экранов с которыми они открываются при использовании pushScreen
export interface PageParams {
    film: { id: string };
}

// Экшены взаимодействия с ассистентом
export enum ActionType {
    OPEN_ITEM = 'openItem',
}

export type OpenItemAction = { type: ActionType.OPEN_ITEM; payload: { id: string } };

export type AssistantAction = OpenItemAction;

export interface AssistantDataAction extends AssistantSmartAppData {
    smart_app_data: AssistantAction;
}
```

```typescript
// App.ts

import React from 'react';
import { PlasmaApp, Page, OnStartFn } from '@sberdevices/plasma-temple';

import { AppHeaderProps, AssistantProps, PageStateType } from './types';

import { Gallery } from './pages/Gallery/Gallery';
import { Film } from './pages/Film/Film';

const assistantParams: AssistantProps = {
    initPhrase: 'запусти галерею фильмов',
    token: process.env.REACT_APP_SMARTAPP_TOKEN ?? '',
};

const headerProps: AppHeaderProps = {
    title: 'Галерея фильмов',
    logo: 'logo192.png',
};

// После того как ассистент готов к работе открываем экран галереи
const onStart: OnStartFn<PageStateType, {}> = async ({ pushScreen }) => {
    pushScreen('gallery');
};

export const App: React.FC = () => {
    return (
        <PlasmaApp onStart={onStart} assistantParams={assistantParams} header={headerProps}>
            <Page name="gallery" component={Gallery} ignoreInsets />
            <Page name="film" component={Film} ignoreInsets />
        </PlasmaApp>
    );
};
```

```typescript
// pages/Gallery/Gallery.tsx

import React from 'react';
import {
    GalleryPage,
    useMount,
    useAssistantOnSmartAppData,
    PageComponent,
    GalleryPageState,
    useAssistantAppState,
} from '@sberdevices/plasma-temple';

import { ActionType, AssistantDataAction, Film, PageParams, PageStateType } from '../../types';

// Имитируем получение данных экрана
const getGallery = (): Promise<GalleryPageState<Film>> => {
    return Promise.resolve({
        activeGalleryIndex: 0,
        gallery: {
            activeCardIndex: 0,
            title: ' ',
            items: [
                {
                    id: '1',
                    label: 'Первый фильм',
                    name: 'Первый фильм',
                    position: 1,
                    image: {
                        src: '',
                    },
                    poster: '',
                    rating: 4.5,
                    genre: 'comedy',
                },
                {
                    id: '2',
                    label: 'Второй фильм',
                    name: 'Второй фильм',
                    position: 2,
                    image: {
                        src: '',
                    },
                    poster: '',
                    rating: 5,
                    genre: 'fantasy',
                },
            ],
        },
    });
};

const getItemSelectorItems = (gallery: GalleryPageState['gallery']) => {
    return Array.isArray(gallery) ? gallery : [gallery];
};

/*
    Для создания компонента используем PageComponent, что позволяет нам строго типизировать
    пропсы компонента экрана
*/
export const Gallery: PageComponent<PageStateType, 'gallery', PageParams> = (props) => {
    const { pushScreen, changeState, state, name, header } = props;
    const gallery = state ? state.gallery : [];

    const handleClick = React.useCallback(
        (card: Partial<Film>) => {
            pushScreen('film', { id: card.id ?? '' });
        },
        [pushScreen],
    );

    useMount(() => {
        // после монтирования компонента инициализируем состояние экрана
        getGallery().then((data) => changeState(data));
    });

    // Устанавливаем состояние Canvas App
    useAssistantAppState({
        screen: name,
        item_selector: {
            items: getItemSelectorItems(gallery).flatMap(({ items }) =>
                items.map((item) => ({
                    title: item.label,
                    number: item.position,
                    id: String(item.id),
                    action: {
                        type: ActionType.OPEN_ITEM,
                        payload: { id: item.id },
                    },
                })),
            ),
        },
    });

    // Подписываемся на событие ассистента 'data' с типом 'smart_app_data'
    useAssistantOnSmartAppData<AssistantDataAction>((action) => {
        if (action && action.type === ActionType.OPEN_ITEM) {
            handleClick(action.payload);
        }
    });

    if (!state?.gallery) {
        return null;
    }

    // В качестве галереии используется компонент галереии из пакета @sberdevices/plasma-temple
    return <GalleryPage<Film> header={header} onCardClick={handleClick} state={state} changeState={changeState} />;
};
```

```typescript
// pages/Film/Film.tsx

import React from 'react';
import { useMount, PageComponent, ItemPage, ItemPageState } from '@sberdevices/plasma-temple';

import { PageStateType, Film as FilmType, PageParams } from '../../types';

// Имитируем получение данных экрана
const getFilm = (id: string): Promise<FilmType> =>
    Promise.resolve({
        id,
        name: 'Имя фильма',
        rating: 5,
        genre: 'комедия',
        poster: '',
    });

export const Film: PageComponent<PageStateType, 'film', PageParams> = ({ state, header, params, changeState }) => {
    useMount(() => {
        if (!state) {
            // Если экран открыт с помощью вызова pushScreen
            getFilm(params.id).then((film) => {
                changeState(film);
            });
        }
    });

    const onItemShow = React.useCallback(() => {}, []);

    if (!state) {
        return null;
    }

    const { id, name, poster, genre, rating } = state;

    const itemPageState: ItemPageState = {
        id,
        title: name,
        background: { src: poster },
        entities: [],
        entitiesTitle: '',
        description: [
            {
                title: 'Жанр',
                content: genre,
            },
            {
                title: 'Рейтинг',
                content: rating,
            },
        ],
        actionButtonText: 'Просмотр',
    };

    // В качестве компонента экрана используется компонент ItemPage из пакета @sberdevices/plasma-temple
    return <ItemPage header={header} state={itemPageState} onItemShow={onItemShow} />;
};
```

### До первого рендера компонента

В данном случае данные экрана будут инициализироваться не в эффекте после монтирования компонента, а до первого рендера путем вызова функции `getInitialProps`, которая должна быть объявлена внутри модуля компонента

```typescript
import { AssistantSmartAppData } from '@sberdevices/assistant-client';
import { GalleryPageState, PlasmaAppProps } from '@sberdevices/plasma-temple';

export type AssistantProps = PlasmaAppProps['assistantParams'];
export type AppHeaderProps = PlasmaAppProps['header'];

export interface Film {
    id: string;
    name: string;
    poster: string;
    genre: string;
    rating: number;
}

/*
    По сравнению с предыдущим подходом, состояние не может быть null, т.к. данные инициализируем до монтирования компонента экрана
*/
export interface PageStateType {
    gallery: GalleryPageState<Film>;
    film: Film;
}

export interface PageParams {
    film: { id: string };
}

// Тип для типизации метода getInitialProps
export type GetInitialProps<K extends keyof PageStateType> = K extends keyof PageParams
    ? (val: { params: PageParams[K] }) => Promise<PageStateType[K]>
    : () => Promise<PageStateType[K]>;

export enum ActionType {
    OPEN_ITEM = 'openItem',
}

export type OpenItemAction = { type: ActionType.OPEN_ITEM; payload: { id: string } };

export type AssistantAction = OpenItemAction;

export interface AssistantDataAction extends AssistantSmartAppData {
    smart_app_data: AssistantAction;
}
```

```typescript
// Apps.ts

import React from 'react';
import { PlasmaApp, Page, OnStartFn } from '@sberdevices/plasma-temple';

import { AppHeaderProps, AssistantProps, PageStateType } from './types';

const assistantParams: AssistantProps = {
    initPhrase: 'запусти галерею фильмов',
    token: process.env.REACT_APP_SMARTAPP_TOKEN ?? '',
};

const headerProps: AppHeaderProps = {
    title: 'Галерея фильмов',
    logo: 'logo192.png',
};

const onStart: OnStartFn<PageStateType, {}> = async ({ pushScreen }) => {
    pushScreen('gallery');
};

// Используем динамическую загрузку компонентов экрана
const Gallery = Page.lazy(() => import('./pages/Gallery/Gallery'));
const Film = Page.lazy(() => import('./pages/Film/Film'));

export const App: React.FC = () => {
    return (
        <PlasmaApp onStart={onStart} assistantParams={assistantParams} header={headerProps}>
            <Page name="gallery" component={Gallery} ignoreInsets />
            <Page name="film" component={Film} ignoreInsets />
        </PlasmaApp>
    );
};
```

```typescript
// pages/Gallery/Gallery.ts

import React from 'react';
import {
    GalleryPage,
    useAssistantOnSmartAppData,
    PageComponent,
    GalleryPageState,
    useAssistantAppState,
} from '@sberdevices/plasma-temple';

import { ActionType, AssistantDataAction, Film, GetInitialProps, PageParams, PageStateType } from '../../types';

// Получение данных выполняем в методе getInitialProps. Функция будет вызвана автоматически в процессе загрузки компонента
export const getInitialProps: GetInitialProps<'gallery'> = async () => {
    return Promise.resolve({
        activeGalleryIndex: 0,
        gallery: {
            activeCardIndex: 0,
            title: ' ',
            items: [
                {
                    id: '1',
                    label: 'Первый фильм',
                    name: 'Первый фильм',
                    position: 1,
                    image: {
                        src: '',
                    },
                    poster: '',
                    rating: 4.5,
                    genre: 'comedy',
                },
                {
                    id: '2',
                    label: 'Второй фильм',
                    name: 'Второй фильм',
                    position: 2,
                    image: {
                        src: '',
                    },
                    poster: '',
                    rating: 5,
                    genre: 'fantasy',
                },
            ],
        },
    });
};

const getItemSelectorItems = (gallery: GalleryPageState['gallery']) => {
    return Array.isArray(gallery) ? gallery : [gallery];
};

/*
    В отличие от предыдущего способа получение данных в эффекте не требуется,
    а так же нет проверки на пустое состояние, т.к. оно инициализируется до первого рендера
*/
export const Gallery: PageComponent<PageStateType, 'gallery', PageParams> = (props) => {
    const { pushScreen, changeState, state, name, header } = props;

    const handleClick = React.useCallback(
        (card: Partial<Film>) => {
            pushScreen('film', { id: card.id ?? '' });
        },
        [pushScreen],
    );

    // Устанавливаем состояние Canvas App
    useAssistantAppState({
        screen: name,
        item_selector: {
            items: getItemSelectorItems(state.gallery).flatMap(({ items }) =>
                items.map((item) => ({
                    title: item.label,
                    number: item.position,
                    id: String(item.id),
                    action: {
                        type: ActionType.OPEN_ITEM,
                        payload: { id: item.id },
                    },
                })),
            ),
        },
    });

    // Подписываемся на событие ассистента 'data' с типом 'smart_app_data'
    useAssistantOnSmartAppData<AssistantDataAction>((action) => {
        if (action && action.type === ActionType.OPEN_ITEM) {
            handleClick(action.payload);
        }
    });

    return <GalleryPage<Film> header={header} onCardClick={handleClick} state={state} changeState={changeState} />;
};

// Для динамической загрузки через Page.lazy необходимо добавить дефолтный экспорт
export default Gallery;
```

```typescript
// pages/Film/Film.tsx

import React from 'react';
import { PageComponent, ItemPage, ItemPageState } from '@sberdevices/plasma-temple';

import { PageStateType, PageParams, GetInitialProps } from '../../types';

export const getInitialProps: GetInitialProps<'film'> = async ({ params: { id } }) =>
    Promise.resolve({
        id,
        name: 'Имя фильма',
        rating: 5,
        genre: 'комедия',
        poster: '',
    });

export const Film: PageComponent<PageStateType, 'film', PageParams> = ({ state, header }) => {
    const onItemShow = React.useCallback(() => {}, []);

    if (!state) {
        return null;
    }

    const { id, name, poster, genre, rating } = state;

    const itemPageState: ItemPageState = {
        id,
        title: name,
        background: { src: poster },
        entities: [],
        entitiesTitle: '',
        description: [
            {
                title: 'Жанр',
                content: genre,
            },
            {
                title: 'Рейтинг',
                content: rating,
            },
        ],
        actionButtonText: 'Просмотр',
    };

    return <ItemPage header={header} state={itemPageState} onItemShow={onItemShow} />;
};

export default Film;
```
