# Библиотека компонентов Plasma B2C

Реализация компонентов для создания веб-приложений.

<p align="center">
  <img width="800" src="https://user-images.githubusercontent.com/1813468/98609687-ea20fc80-22fe-11eb-8d84-cd26385f01ed.png" alt="plasma-ui" />
</p>

## Использование

Компоненты реализованы на [typescript](https://www.typescriptlang.org/) с помощью [react](https://reactjs.org/) и [styled-components](https://styled-components.com/);

Использование данного пакета предполагает использование `react` & `react-dom`;
Использование `styled-components` на проект не обязательно, также как и использование `typescript`.
Но для того чтобы комопненты работали `styled-components` необходимо установить.

### Установка пакета

```bash
$ npm install --save react react-dom
$ npm install --save styled-components
$ npm install --save @sberdevices/plasma-b2c @sberdevices/plasma-icons @sberdevices/plasma-tokens-b2c @sberdevices/plasma-typo
```

### Тема и типографика

Для корректной работы необходимо создать глобальные стили:

```jsx
// Main.tsx
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { dark } from '@sberdevices/plasma-tokens-b2c/themes';
import { standard as standardTypo, compatible as compatibleTypo } from '@sberdevices/plasma-typo';

import { App } from './App.tsx';

const TypoStyle = createGlobalStyle(standardTypo);
const CompatibleTypoStyle = createGlobalStyle(compatibleTypo);

const Theme = createGlobalStyle(dark);

export const Main = () => {
    const Theme = themes[context.globals.theme];

    return (
        <>
            <TypoStyle />
            <CompatibleTypoStyle />
            <Theme />

            <App />
        </>
    );
};
```

### Использование компонентов

```jsx
// App.tsx
import { Button } from '@sberdevices/plasma-b2c';

export const App = () => {
    return <Button text="Hello, Plasma!" />;
};
```
