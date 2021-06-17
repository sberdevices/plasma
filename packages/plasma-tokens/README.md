# Plasma Tokens

Пакет предоставляет набор _дизайн-токенов_ реализующих дизайн «Plasma» для разных устройств.

<p align="center">
  <img width="768" src="https://user-images.githubusercontent.com/1813468/98609049-8cd87b80-22fd-11eb-826c-2279f4f3f1bd.png" alt="plasma-tokens" />
</p>

## Пример использования

_NB_ — Все примеры будут приведены с использованием [styled-components](https://styled-components.com/). Но использовать `plasma-tokens` можно и без этого инструмента.

```sh
npm i --save @sberdevices/plasma-tokens
```

```jsx
import React from 'react';
import styled from 'styled-components';

import { text, background, gradient } from '@sberdevices/plasma-tokens';

const AppStyled = styled.div`
    padding: 30px;
    color: ${text};
    background-color: ${background};
    background-image: ${gradient};
`;

const App = () => {
    return (
        <AppStyled>
            <h2>Hello Plasma</h2>
        </AppStyled>
    );
};

export default App;
```

## Реализация

Все `css` переменные завернуты в `js` переменные для более удобного доступа.
Каждая переменная имеет описание ввиде комментария. Современные `IDE` будут выводить этот комментарий ввиде подсказки.

Пример:

```js
/** Цвет предупреждения */
export const warning = 'var(--plasma-colors-warning)';
```

## Состав

В пакете реализованы несколько сущностей:

-   [Типографическая Система](#типографическая-система)
-   [Цветовая палитра](#цветовая-палитра)
-   [Управление темой приложения](#темы)

Разберём каждую сущность подробнее:

### Типографическая Система

Текст – это основа любого интерфейса. Для того чтобы текст выглядел единообразно во всей экосистеме `SberDevices`, разработана данная типографическая система.

#### Использование

```js
import { typography } from '@sberdevices/plasma-tokens';
```

`typography` включает в себя следующие готовые стилевые объекты:

-   Hero Unit:

    -   display1
    -   display2
    -   display3

-   Заголовки:

    -   headline1
    -   headline2
    -   headline3
    -   headline4

-   Основной текст:

    -   body1
    -   body2
    -   body3

    -   paragraph1
    -   paragraph2

-   Вспомогательный текст:

    -   footnote1
    -   footnote2

-   Контролы:

    -   button1
    -   button2

-   Дополнительные:
    -   caption
    -   underline

Посмотреть в живую можно в документации [типографической системы](https://plasma.sberdevices.ru/current/?path=/docs/typography--default#%D0%B2%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%82%D1%8B)

Все стилевые объекты также можно импортировать по одному:

```jsx
import React from 'react';
import styled from 'styled-components';

import { body1, headline2 } from '@sberdevices/plasma-tokens';

const AppStyled = styled.div`
    padding: 30px;
    ${body1}
`;

const App = () => {
    return (
        <AppStyled>
            <h2 style={headline2}>Hello Plasma</h2>
            <div>
                <span>Сил человеческих хватает до известного предела.</span>
                <br />
                <span>Кто виноват, что именно этот предел играет решающую роль?</span>
            </div>
        </AppStyled>
    );
};

export default App;
```

Если запустить приведенный выше пример, можно заметить две вещи:

-   Текст написан не фирменным шрифтом.
-   Размер шрифта выглядит хорошо на декстопном девайсе, но будет мелковат на ТВ-платформе.

#### Установка шрифта

Типографическая система основана на фирменном шрифте `SB Sans Text`. Для того чтобы шрифт было удобно поставлять в web-приложения, шрифт был загружен на [CDN](https://ru.wikipedia.org/wiki/Content_Delivery_Network).

Для использования типографической системы вам достаточно загрузить один `css` файл:
Его необходимо добавить внутрь тега `head`. Если в качестве основы web-приложения вы используете [create-react-app](https://create-react-app.dev), вам необходимо изменить файл `./public/index.html`.

```html
<html>
    <head>
        <link rel="stylesheet" href="https://cdn-app.sberdevices.ru/shared-static/0.0.0/styles/SBSansText.0.1.0.css" />
    </head>
    <body>
        ...
    </body>
</html>
```

#### Размеры

Если посмотреть на объекты стилей которые предоставляет типографическая сетка, можно заметить что размер текста задан в единицах измерения `rem`.

```js
export const body1 = {
    fontFamily: "'SB Sans Text','Helvetica','Arial',sans-serif",
    fontWeight: 500,
    fontStyle: 'normal',
    fontSize: 'var(--plasma-typo-body1-font-size, 1rem)',
    letterSpacing: '-0.0190em',
    lineHeight: 'var(--plasma-typo-body1-line-height, 1.25rem)',
};
```

Это позволяет масштабировать весь интерфейс за счёт указания `font-size` на `html` теге.

Значение для устройств `SberBox` & `SberPortal` необходимо установить в значение `32px`.
Для остальных поверхностей предпологается использовать значение по умолчанию: `16px`.

```css
html {
    font-size: 32px;
}
```

Необходимые значения также предоставляются в пакете `plasma-tokens`.

```js
import { sberBox } from '@sberdevices/plasma-tokens/typo';
```

Пример использования со [style-components][style-components]

```js
import React from 'react';
// createGlobalStyle нужен для создания глобальных стилей
import styled, { createGlobalStyle } from 'styled-components';

// получаем значение для целевой платформы
import { sberBox } from '@sberdevices/plasma-tokens/typo';

// получаем стилевые объекты для нашего интерфейса
import { body1, headline2 } from '@sberdevices/plasma-tokens';

const AppStyled = styled.div`
    padding: 30px;
    ${body1}
`;

// создаем react-компонент c глобальными стилями
const TypoScale = createGlobalStyle(sberBox);

const App = () => {
    return (
        <AppStyled>
            {/* Используем  react-компонент один раз */}
            <TypoScale />

            <h2 style={headline2}>Hello Plasma</h2>
            <div>
                <span>Сил человеческих хватает до известного предела.</span>
                <br />
                <span>Кто виноват, что именно этот предел играет решающую роль?</span>
            </div>
        </AppStyled>
    );
};

export default App;
```

#### Дополнительно

Также из пакета можно получить все возможные значения для:

-   `fontSizes`
-   `fonts`
-   `fontWeights`
-   `lineHeights`
-   `letterSpacings`;

```js
import { fonts } from '@sberdevices/plasma-tokens';

console.log(fonts);
// –> {
//     Medium: "'SB Sans Text','Helvetica','Arial',sans-serif",
//     Bold: "'SB Sans Text','Helvetica','Arial',sans-serif",
//     Semibold: "'SB Sans Text','Helvetica','Arial',sans-serif",
//     Regular: "'SB Sans Text','Helvetica','Arial',sans-serif"
// }
```

### Цветовая палитра

Цветовая палитра это вторая основная часть ощущения платформы `SberDevices`.
Цвета можно забират из корня пакета, для каждого цвета есть коментарий описывающий его использование.

```js
import { accent } from '@sberdevices/plasma-tokens';
```

```js
/** Акцентный цвет призыва к действию */
export const accent = 'var(--theme-colors-accent, #2AC673)';
```

Цвета представляют собой [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) c заданным цветом по умолчанию.
Это позволяет переопределять цвета с помощью [Тем](#темы).
Всю представленную палитру можно посмотреть в документации: https://plasma.sberdevices.ru/current/?path=/docs/colors--default

Также доступны сами значения пременных:

```js
import { colorValues } from '@sberdevices/plasma-tokens';

console.log(colorValues.black); // –> '#080808'
```

Пример использования цветов для создания основной подложки web-приложения:

```jsx
import React from 'react';
// createGlobalStyle нужен для создания глобальных стилей
import { createGlobalStyle } from 'styled-components';
// получаем цвета для нашего интерфейса
import { text, background, gradient } from '@sberdevices/plasma-tokens';
/**
 * text - основной цвет текста
 * background - овновной цвет фона
 * gradient - градиентная заливка фона
 */

const DocStyles = createGlobalStyle`
  html {
    color: ${text};
    background-color: ${background};
    background-image: ${gradient};

    /** необходимо залить градиентом всю подложку */
    min-height: 100vh;
  }
`;

const App = () => {
    return (
        <div>
            {/* Используем глобальные react-компоненты один раз */}
            <DocStyles />
        </div>
    );
};

export default App;
```

### Темы

Каждая тема соотносится с персонажем ассистента, и меняет цветовую гамму web-приложения.

В пакете предоставлены 6 тем:

-   `darkSber` – Тема по умолчанию,
-   `darkEva`
-   `darkJoy`
-   `lightSber`
-   `lightEva`
-   `lightJoy`

Подключение:

```jsx
import React from 'react';
// createGlobalStyle нужен для создания глобальных стилей
import { createGlobalStyle } from 'styled-components';
// получаем тему персонажа
import { darkJoy } from '@sberdevices/plasma-tokens/themes';
// получаем цвета для нашего интерфейса
import { text, background, gradient } from '@sberdevices/plasma-tokens';

const DocStyles = createGlobalStyle`
  html {
    color: ${text};
    background-color: ${background};
    background-image: ${gradient};

    /** необходимо залить градиентом всю подложку */
    min-height: 100vh;
  }
`;

// создаем react-компонент для персонажа
const Theme = createGlobalStyle(darkJoy);

const App = () => {
    return (
        <div>
            {/* Используем глобальные react-компоненты один раз */}
            <DocStyles />
            <Theme />
        </div>
    );
};

export default App;
```

## Готовый пример

Все описанные выше примеры можно посмотреть в [демо-приложении](https://github.com/sberdevices/plasma/blob/master/examples/demo-tokens/src/App.tsx).

Приложение основано на [create-react-app](https://create-react-app.dev) c использованием [typescript](https://www.typescriptlang.org/) и [styled-components](https://styled-components.com/).

Для запуска приложение прочитайте [README](https://github.com/sberdevices/plasma/blob/master/examples/demo-tokens/README.md).
