# Plasma

<p align="center">
  <img width="800" src="https://user-images.githubusercontent.com/1813468/98610527-d37ba500-2300-11eb-87c3-80cc1c08ecb4.png" alt="plasma" />
</p>

Использование дизайн-системы Plasma позволяет реализовать [Canvas App](https://developer.sberdevices.ru/docs/ru/methodology/research/canvasapp) как часть экосистемы виртуальных ассистентов семейства "Салют" и клиентские приложения B2B- и B2C-ориентированности. Все текущие приложения в экосистеме SberDevices реализованы с помощью Plasma.

## Состав:

-   @sberdevices/plasma-ui
-   @sberdevices/plasma-web
-   @sberdevices/plasma-b2c
-   @sberdevices/plasma-tokens
-   @sberdevices/plasma-tokens-web
-   @sberdevices/plasma-tokens-b2c
-   @sberdevices/plasma-icons

### plasma-ui

Пакет с набором готовых компонентов и утилит для создания Canvas App. Компоненты реализованы с помощью [React](https://reactjs.org/). Для компонентов доступны [Storybook](https://plasma.sberdevices.ru/ui-storybook) и [документация](https://plasma.sberdevices.ru/ui).

[![npm ui](https://img.shields.io/npm/v/@sberdevices/plasma-ui?label=%40sberdevices%2Fplasma-ui&style=for-the-badge)](https://www.npmjs.com/package/@sberdevices/plasma-ui)

### plasma-web

Пакет с набором готовых компонентов для создания веб-приложений направленных на B2B-сегмент. [Документация](https://plasma.sberdevices.ru/web) и [Storybook](https://plasma.sberdevices.ru/web-storybook).

[![npm ui](https://img.shields.io/npm/v/@sberdevices/plasma-web?label=%40sberdevices%2Fplasma-web&style=for-the-badge)](https://www.npmjs.com/package/@sberdevices/plasma-web)

### plasma-b2c

Пакет с набором готовых компонентов для создания веб-приложений ориентированных на B2C-сегмент. [Документация](https://plasma.sberdevices.ru/web) и [Storybook](https://plasma.sberdevices.ru/b2c-storybook).

[![npm ui](https://img.shields.io/npm/v/@sberdevices/plasma-b2c?label=%40sberdevices%2Fplasma-b2c&style=for-the-badge)](https://www.npmjs.com/package/@sberdevices/plasma-b2c)

### plasma-tokens, plasma-tokens-web, plasma-tokens-b2c

Пакеты с набором _дизайн-токенов_. В пакет входят типографические и цветовые константы. Дизайн-токены поставляются в качестве [CSS custom propperties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) и JavaScript переменных. Перед использованием рекомендуется ознакомится с документацией по [токенам](https://plasma.sberdevices.ru/ui/design/tokens).

[![npm ui](https://img.shields.io/npm/v/@sberdevices/plasma-tokens?label=%40sberdevices%2Fplasma-tokens&style=for-the-badge)](https://www.npmjs.com/package/@sberdevices/plasma-tokens)
[![npm ui](https://img.shields.io/npm/v/@sberdevices/plasma-tokens-web?label=%40sberdevices%2Fplasma-tokens-web&style=for-the-badge)](https://www.npmjs.com/package/@sberdevices/plasma-tokens-web)
[![npm ui](https://img.shields.io/npm/v/@sberdevices/plasma-tokens-b2c?label=%40sberdevices%2Fplasma-tokens-b2c&style=for-the-badge)](https://www.npmjs.com/package/@sberdevices/plasma-tokens-b2c)

### plasma-icons

Пакет с набором иконок, которые доступны к просмотру в [хранилище](https://plasma.sberdevices.ru/icons), а также в [Storybook](https://plasma.sberdevices.ru/ui-storybook/?path=/story/content-icon--xs-size) и [документации](https://plasma.sberdevices.ru/ui/components/icon).

[![npm ui](https://img.shields.io/npm/v/@sberdevices/plasma-icons?label=%40sberdevices%2Fplasma-icons&style=for-the-badge)](https://www.npmjs.com/package/@sberdevices/plasma-icons)

## Быстрый старт

`Canvas App` это web-приложение, для его создания вам потребуется:

-   `Node.js` & `npm` [установка](https://nodejs.org/ru/)
-   `Create React App` – для быстрого создания основы вашего приложения. [CRA](https://create-react-app.dev/docs/getting-started#quick-start)
-   `React` Как основа для web интерфейса. Погружение для новичков: https://ru.reactjs.org/tutorial/tutorial.html

### Установка

После создания [основы приложения](https://create-react-app.dev/docs/getting-started#quick-start):

```sh
npm i -S styled-components @sberdevices/plasma-ui @sberdevices/plasma-tokens @sberdevices/plasma-icons
```

_Компоненты реализованы с помощью [styled-components](http://styled-components.com/). Поэтому необходимо поставить их в зависимость._

NB: Если вы решили не использовать `Create React App`, то вам потребуется установить `react` и `react-dom`:

```sh
npm i -S react react-dom
```

Более подробно можно ознакомиться на странице [документации](https://plasma.sberdevices.ru/ui/#%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0).

### Использование

```jsx
// ./src/App.jsx
import React from 'react';

import { Button } from '@sberdevices/plasma-ui';

function App() {
    return (
        <div className="App">
            <p>
                <Button view="primary">Hello Plasma</Button>
            </p>
        </div>
    );
}

export default App;
```

Более подробно можно ознакомиться на странице [документации](https://plasma.sberdevices.ru/ui/#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5).

## Обратная связь

Разработка дизайн-системы Plasma ведется в репозитории https://github.com/sberdevices/plasma.
Если вы хотите добавить новый компонент, вы можете прислать пулл-реквест следуя [правилам разработки](./CONTRIBUTING.md). Также вы можете [завести задачу](https://github.com/sberdevices/plasma/issues/new) на создание нового компонента или описать некоректное поведение текущего.
