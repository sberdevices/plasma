---
id: scenario
title: Взаимодействие со сценарием
sidebar_position: 6
---

# Взаимодействие со сценарием

Для реакции на команды ассистента (сценарные или навигационные), используйте хуки или подписку на команды в экземпляре ассистента.

## Хуки

Хуки можно использовать в любом месте смартапа, как на экранах, так и в компонентах одного или нескольких экранов.

### `useAssistantOnSmartAppData`

Хук подписывается на событие `data` и проверяет тип входящей команды. Если входящая команда имеет тип [`smart_app_data`](https://github.com/sberdevices/assistant-client/blob/main/src/typings.ts#L151), то значение ключа `smart_app_data` передается в качестве аргумента в функцию, которую принимает хук `useAssistantOnSmartAppData`.

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

Хук подписывается на событие `data` и проверяет тип входящей команды. Если входящая команда имеет тип [`navigation`](https://github.com/sberdevices/assistant-client/blob/main/src/typings.ts#L137), то команда будет передана в качестве аргумента в функцию, которую принимает хук `useAssistantOnNavigation`.

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

Хук подписывается на событие `data` от ассистента и передает указанную функцию, как колбек на событие.

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

Хук useAssistantAppState принимает в качестве аргумента объект типа AssistantAppState.

Используйте хук для формирования состояний интерфейса. Такой подход поможет сценарию смартапа принимать решения, например понять, что скрывается под номером 4 в запросе «Открой номер 4». [`AssistantAppState`](https://github.com/sberdevices/assistant-client/blob/main/src/typings.ts#L68)

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
