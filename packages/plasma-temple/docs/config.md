# Конфигурация

Пакет предоставляет фукнцию `createApp`, которая принимает в качестве агрумента конфиг приложения и возвращает корневой компонент всего приложения

```ts
import { createApp } from '@sberdevices/plasma-temple';

const App = createApp();

ReactDOM.render(<App />, document.getElementById('#root'));
```

```ts
interface CanvasAppConfig {
    routes: Route[];
    header: HeaderPropsPayload;
    assistant: AssistantConfig;
}
```

---
|Другие разделы ||||||
|---|---|---|---|---|---|
| Кофигурация | [Действия](./actions.md) | [Шаблоны](./templates.md) | [Хуки](./hooks.md) | [Взаимодействие со сценарием](./scenario.md) | [Формы](./forms.md) |
---
