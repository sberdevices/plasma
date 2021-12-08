# @sberdevices/use-virtual

Виртуализация длинного списка элементов. Позволяет рендерить нужное количество элементов,
которое необходимо отобразить во "вьюпорте" или контейнере.
Это позволит значительно улучшить отзывчивость интерфейса за счет сокращения времени рендеринга.

## Installation

```bash
npm install @sberdevices/use-virtual --save
```

### Options

```ts
type VirtualProps = {
    // кол-во видимых элементов
    // Доступно только для useVirtualKeyboard
    limit: number;

    // контейнер, который скроллится
    parentRef: React.RefObject<HTMLDivElement>;

    // горизонтальная ориентация. Defaults to false.
    horizontal?: boolean;

    // количество всех элементов в списке
    itemsLength: number;

    // вычисление размера элемента в зависимости от индекса. Defaults to () => 50
    estimateSize: (index: number) => number;

    // отступы от первого элемент и от последнего. Defaults to 0px
    paddingStart?: number;
    paddingEnd?: number;

    // переопределение функции скролла к нужному элементу при вызове scrollToIndex
    // Не доступно для useVirtualKeyboard
    scrollToFn?: (offset: number) => void;

    // получение кастомного ключа для элемента по индекс
    keyExtractor?: (index: number) => number | string;

    // с какого элемента менять visibleItems при переключении с клавиатуры. Defaults to 'center'
    // Не доступно для useVirtualScroll, useVirtualDynamicScroll
    align?: 'center' | 'end';

    // Количество кадров для throttle при переключении с клавиатуры. Defaults to 12 (~200ms при 60 FPS)
    // Не доступно для useVirtualScroll, useVirtualDynamicScroll
    framesToThrottle?: number;

    // Сохранять текущее состояние скролла. Актуально если рендер элементов долгий,
    // и требуется отрендерить превью во избежание тормозов во время скролла.
    // Не доступно для useVirtualKeyboard
    useIsScrolling?: boolean;
};
```

### Example

```ts
const estimateSize = () => 300;

const VirtualKeyboard = () => {
    const { visibleItems, currentIndex } = useVirtualKeyboard({
        itemsLength: fixturesVirtualizedItems.length,
        limit: 5,
        estimateSize,
        horizontal: true,
    });

    return (
        <StyledCarouselWrapperHorizontal>
            {visibleItems.map(({ index }) => {
                const item = fixturesVirtualizedItems[index];

                return (
                    <CarouselItem
                        key={index}
                        focused={currentIndex === index}
                        width={300}
                        height={300}
                        item={item}
                        gap={20}
                    />
                );
            })}
        </StyledCarouselWrapperHorizontal>
    );
};
```
