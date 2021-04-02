# Plasma-tokens-web

Пакет предоставляет набор `дизайн-токенов` реализующих дизайн «Plasma WEB».

<p align="center">
  <img width="768" src="https://user-images.githubusercontent.com/1813468/98609049-8cd87b80-22fd-11eb-826c-2279f4f3f1bd.png" alt="plasma-tokens" />
</p>

## Пример использования

_NB_ — Все примеры будут приведены с использованием [styled-components](https://styled-components.com/). Но использовать `plasma-tokens-web` можно и без этого инструмента.

```sh
npm i --save @sberdevices/plasma-tokens-web
```

```jsx
import React from 'react';
import styled from 'styled-components';

import { text, background, gradient } from '@sberdevices/plasma-tokens-web';

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
