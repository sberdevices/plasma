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
$ npm install ui
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

### Настройка темы

```typescript
// styled.d.ts
import 'styled-components';
import { UITheme } from 'ui/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends UITheme {
    // любые дополнительные свойства
  }
}

// App.tsx
import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { defaultTheme } from 'ui/theme';
import { ActionButton } from 'ui/ActionButton';
import { Icon } from 'ui/Icon';

const theme: DefaultTheme = {
  ...defaultTheme,
  // любые дополнительные свойства или переопределение UITheme
};

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <ActionButton size="l">
      <Icon icon="plus" size="m" />
    </ActionButton>
  </ThemeProvider>
);
```

### Сборка

Для сборки используется `tsc` без каких-либо дополнений: `$ npm run build`

## Компоненты

- [x] ActionButton
- [x] Card
- [x] Cart
- [x] Icon

## TODO

- [ ] Регрессионное тестирование (Hermione?, Cypress?)
- [ ] Документация
- [x] Code Splitting
