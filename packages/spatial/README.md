# Spatial navigation для Canvas Apps

## Установка

```sh
npm install --save @sberdevices/spatial
```

Для использования с React и styled-components придётся установить `peerDependencies` самим.

```sh
npm install react styled-components @types/styled-components
```

## Использование

### Включение навигации

По умолчанию объект SpatialNavigation уже создан и ждёт инициализации:

```typescript
import { spatnavInstance } from '@sberdevices/spatial';

spatnavInstance.init();
```

Но так же существует react hook `useSpatnavInitialization()`

В корневом компоненте инициализируется `spatnav instance`. Устанавливается секция по умолчанию, она будет в фокусе после рендера.

Hook `useSpatnavInitialization()` используется только один раз в корневом компоненте.

```typescript
import React, { FC } from 'react';
import { useSpatnavInitialization } from '@sberdevices/spatial';

const App: FC = () => {
    useSpatnavInitialization();

    return (
        <div>
            <Page1 />
        </div>
    );
};

export default App;
```

### Использование секций

В дочернем компоненте определяем секцию под названием `Page1SectionId`. Делаем кнопку из библиотеки компонентов активной с помощью HOC `withSpatnav`. После рендера все 5 кнопок будет доступны для навигации клавишами.

```typescript
import React, { FC } from 'react';
import { useSection, withSpatnav } from '@sberdevices/spatial';
import { Button } from '@sberdevices/plasma-ui';

const FocusableButton = withSpatnav(Button);

const Page1: FC = () => {
    const [sectionProps, customize, sectionId] = useSection('Page1SectionId');


    useEffect(() => {
        customize({
            enterTo: 'default-element',
            straightOnly: true
        })
    }, [])

    const onSelect = useCallback((event: KeyboardEvent | MouseClick) => {
        // ваша обработка
    }, []);

    return (
      <div {...section}> // или <div data-focusable-section={sectionId}'>
        <FocusableButton handleEnterOrClick={onSelect} />
        <FocusableButton handleEnterOrClick={onSelect} />
        <FocusableButton handleEnterOrClick={onSelect} />
        <FocusableButton handleEnterOrClick={onSelect} />
     </div>
    );
};

export default Page1;
```
