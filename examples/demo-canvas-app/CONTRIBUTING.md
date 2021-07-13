# Contributing
Внесение изменений в Demo Canvas App

## Добавление страничек
Чтобы добавить тестовую страницу, необходимо в директории [examples/demo-canvas-app/pages/test/components](https://github.com/sberdevices/plasma/tree/master/examples/demo-canvas-app/pages/test/components) создать файл страницы, пример:

```tsx
 // example.tsx
 import { Button } from '@sberdevices/plasma-ui';
 
 export default function ExamplePage() {
     // Здесь нужно разместить код страницы компонента,
     // К примеру, можно вывести кнопку
     return <Button text="Привет!" />
 }
```

Полученная страница станет доступна:
+ локально по адресу http://localhost:3100/test/components/example;
+ для pull-request'a с номером, к примеру `600`, будет страница https://plasma.sberdevices.ru/demo-canvas-app-pr-600/test/components/example
+ при влитии в `master` по адресу https://plasma.sberdevices.ru/demo-canvas-app/test/components/example.
