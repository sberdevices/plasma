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
    /**
     * Контейнер, внутри которого виртуализация.
     * Если есть скролл, то контейнер со скроллом.
     */
    parentRef: React.RefObject<HTMLDivElement>;
    horizontal?: boolean;
    /**
     * Количество всех элементов в списке.
     */
    itemsLength: number;
    /**
     * Вычисление размера элемента в зависимости от индекса.
     * По умолчанию размер = 50px
     */
    estimateSize: (index: number) => number;
    /**
     * количество элементов для рендера за видимой областью
     * при скролле
     */
    overscan?: number;
    paddingStart?: number;
    paddingEnd?: number;
    /**
     * переопределение функции скролла
     * к нужному элементу при
     * вызове scrollToIndex
     */
    scrollToFn?: (offset: number) => void;
    /**
     * получение кастомного ключа
     * для элемента по индекс
     */
    keyExtractor?: (index: number) => number | string;
    /**
     * с какого элемента менять
     * visibleItems при переключении с клавиатуры
     */
    align?: 'center' | 'end';
    /**
     * Количество кадров для throttle
     * при переключении с клавиатуры.
     * По дефолту 12 (~200ms при 60 FPS)
     */
    framesToThrottle?: number;
    /**
     * Сохранять текущее состояние скролла.
     * Актуально если рендер элементов долгий,
     * и требуется отрендерить превью во избежание
     * тормозов во время скролла.
     */
    useIsScrolling?: boolean;
    /**
     * Начальный текущий элемент (currentIndex).
     * Если нужно при обновлении компонента изменить сurrentIndex,
     * то следует использовать upIndex / downIndex / upIndexAndRange / downIndexAndRange.
     * Учитывается только при монтировании компонента.
     */
    initialCurrentIndex?: number;
    /**
     * Начальные индексы (initialRange.start - initialRange.end) для отображения элементов (visibleItems).
     * Учитывается только при монтировании компонента.
     */
    initialRange?: Range;
    /**
     * Сколько кадров дебаунсить для
     * вычисления currentIndex после скролла.
     * По умолчанию debouncedFramesScrollSync = 1.
     * Для useVirtualSmoothScroll debouncedFramesScrollSync = 2.
     */
    debouncedFramesScrollSync?: number;
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
