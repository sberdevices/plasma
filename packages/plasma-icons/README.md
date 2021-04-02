# Plasma-icons

Пакет предоставляет самостоятельный набор иконок для совместного использования с `plasma-ui`.

## Использование

Компоненты реализованы на [typescript](https://www.typescriptlang.org/) с помощью [react](https://reactjs.org/);

Использование данного пакета предполагает использование `react` & `react-dom`;

### Установка пакета

```sh
npm i --save @sberdevices/plasma-icons
```

### Использование компонентов

Все иконки доступны из корня пакета
Пример:

```jsx
import { IconApps } from '@sberdevices/plasma-icons';

const App = () => {
    return <IconApps />;
};
```

Также имеется возможность использовать иконки через переиспользуемый компонент. В этом случае все иконки попадут в бандл при сборке.
Пример:

```jsx
import { Icon } from '@sberdevices/plasma-icons';

const App = () => {
    return <Icon icon="iconApps" />;
};
```

## Полезные ссылки:

Витрина с компонентами [storybook](https://master--5f96ec813d800900227e3b93.chromatic.com)

Документация о каждом компоненте: http://plasma.sberdevices.ru/
