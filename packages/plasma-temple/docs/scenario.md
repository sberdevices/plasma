# Взаимодействие со сценарием

Реакции на команды от ассистента, сценарные, навигационные реализуются с помощью хуков или прямой подпиской в экземляре ассистента.

## Хуки

Хуки можно использовать в любом месте приложения, будь то сам экран приложения, или какой-либо компонент, используемый внутри одного или нескольких экранов.

### `useAssistantOnSmartAppData`

Хук подписывается на событие `data` и проверяет тип входящей команды. Если входящая команда имеет тип [`smart_app_data`](https://github.com/sberdevices/assistant-client/blob/main/src/typings.ts#L151), то непосредственно значение ключа `smart_app_data` будет передано в качестве аргумента в функцию, которую принмает хук `useAssistantOnSmartAppData`.

```ts
const ScreenComponent = ({ pushScreen }) => {
    ...
    useAssistantOnSmartAppData((action /* a-ka `smart_app_data` */) => {
        if (action.type = 'goto') {
            pushScreen(action.payload.screen, action.payload.params);
        }
    })
}
```

### `useAssistantOnNavigation`

Хук подписывается на событие `data` и проверяет тип входящей команды. Если входящая команда имеет тип [`navigation`](https://github.com/sberdevices/assistant-client/blob/main/src/typings.ts#L137), то команда будет передана в качесвет аргурмента в функцию, которую принимает хук `useAssistantOnNavigation`.

```ts
const ScreenComponent = () => {
    ...
    useAssistantOnNavigation((command) => {
        if (command.navigation.command === 'DOWN') {
            window.scrollTo({
                top: window.scrollY + 600,
            })
        }

        if (command.navigation.command === 'UP') {
            window.scrollTo({
                top: window.scrollY - 600,
            })
        }
    })
}
```

### `useAssistantOnData`

Хук подписывается на событие `data` от ассистента и передает указанную функцию, как коллбек на событие.

```ts
const ScreenComponent = () => {
    ...
    useAssistantOnData((anyCommand) => {
        if (command.type === 'smart_app_error') {
            // do whatever with error
        }
    })
}
```

### `useAssistantAppState`

Подписками на команды взаимодействие с ассистентом не ограничивается. Сценарию для принятия решений необходимо текущее состояние интерфейса. Например понять, что скрывается под номером 4 в запросе "Открой номер 4". Для формирования состояния используется хук `useAssistantAppState`, который в качестве аргумента принимает объект типа [`AssistantAppState`](https://github.com/sberdevices/assistant-client/blob/main/src/typings.ts#L68)

```ts
const ScreenComponent = ({ name, state }) => {
    ...
    useAssistantAppState({
        name,
        item_selector: {
            items: state.gallery,
        }
    })
}
```

---

| Другие разделы             |                          |                           |                    |                             |                     |
| -------------------------- | ------------------------ | ------------------------- | ------------------ | --------------------------- | ------------------- |
| [Кофигурация](./config.md) | [Действия](./actions.md) | [Шаблоны](./templates.md) | [Хуки](./hooks.md) | Взаимодействие со сценарием | [Формы](./forms.md) |

---
