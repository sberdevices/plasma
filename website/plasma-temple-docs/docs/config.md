---
id: config
title: Конфигурация
sidebar_position: 2
---

# Конфигурация

Пакет содержит компоненты `<PlasmaApp />` и `<Page />` для конфигурации приложения

```ts
import { PlasmaApp, Page } from '@sberdevices/plasma-temple';

export const App = () => (
    <PlasmaApp>
        <Page name="home" component={() => 'Hello world'} />
    </PlasmaApp>
);
```

Подробее о компонентах в разделе [Базовая функциональность](./core.md)
