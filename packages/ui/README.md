---
name: Plasma UI
route: /
---

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
$ npm install --save @sberdevices/ui@rc @sberdevices/plasma-tokens@rc
```

### Использование компонент

Все компоненты доступны из папки `components`
Пример:

```jsx
import { Button } from '@sberdevices/ui/components/Button/Button';

const App = () => {
    return <Button>Hello Plasma</Button>;
};
```

## Полезные ссылки:

Витрина с компонентами [storybook](https://master--5f96ec813d800900227e3b93.chromatic.com)

Документация о каждом компоненте: http://plasma.sberdevices.ru/
