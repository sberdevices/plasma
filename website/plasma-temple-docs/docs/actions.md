---
id: actions
title: Действия
sidebar_position: 3
---

# Действия

Внутри компонента экрана доступны действия для работы с историей

```ts
interface PageMethods {
    pushHistory(): void;
    pushScreen(): void;
    changeState(): void;
    popScreen(): void;
    goToScreen(): void;
}
```

## Описание методов доступно в разделе [Базовая функциональность](./core.md#компонент-экрана)
