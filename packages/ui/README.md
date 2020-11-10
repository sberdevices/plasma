# Библиотека компонентов `plasma-ui`

Реализация компонент для создания смартаппов.

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
$ npm install --save @sberdevices/ui @sberdevices/plasma-tokens
```
















<!-- ### Настройка

Пакет использует `react`, `react-dom` и `styled-components`, поэтому на проекте необходимо настроить сборщик таким образом, чтобы зависимости резолвились на проектную директорию `node_modules`. Пример для `customize-cra`:

```javascript
const path = require('path');

const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
    addWebpackAlias({
        react: path.resolve(__dirname, 'node_modules', 'react'),
        'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
        'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
    }),
);
```

### Настройка контекстов

```typescript
// styled.d.ts
import 'styled-components';
import { UITheme } from '@sberdevices/ui/theme';

declare module 'styled-components' {
    export interface DefaultTheme extends UITheme {
        // любые дополнительные свойства
    }
}

// App.tsx
import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { defaultTheme } from '@sberdevices/ui/theme';
import { ActionButton } from '@sberdevices/ui/ActionButton';
import { Icon } from '@sberdevices/ui/Icon';

const theme: DefaultTheme = {
    ...defaultTheme,
    // любые дополнительные свойства или переопределение UITheme
};

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <ActionButton size="l">
                <Icon icon="plus" size="m" />
            </ActionButton>
        </ThemeProvider>
    );
};
```

### Сборка

Для сборки используется `tsc` без каких-либо дополнений: `$ npm run build`

## Компоненты

-   [x] ActionButton
-   [ ] Button
-   [x] Card
-   [x] Cart
-   [x] Icon
-   [x] ScrollList
-   [ ] Typography

## TODO

-   [ ] Регрессионное тестирование (Hermione?, Cypress?)
-   [ ] Документация
-   [x] Code Splitting -->
