```
██╗   ██╗██╗██╗
██║   ██║██║██║
██║   ██║██║██║
██║   ██║██║╚═╝
╚██████╔╝██║██╗
 ╚═════╝ ╚═╝╚═╝
```

# Библиотека компонентов `UI!`

## Использование

Использование данного пакета предполагает использование тем для `styled-components`.

### Установка пакета

```bash
$ npm install @sberdevices/ui
```

### Настройка

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
-   [x] Code Splitting
