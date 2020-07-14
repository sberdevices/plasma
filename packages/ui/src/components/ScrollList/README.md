# ScrollList

`ScrollList` – компонент для создания списков с прокруткой. Для использования каждый дочерний элемент списка должен использовать `ListContext` для регистрации `ref` – это необходимо для рассчёта положения элементов на экране

## Пример подключения компонентов

```tsx
import React from 'react';
import styled from 'styled-components';
import { ScrollList, ListContext } from 'ui/components/ScrollList';

const StyledList = styled(ScrollList)`
  height: 300px;
  display: flex;
  align-items: center;
`;

const StyledListItem = styled.div`
  width: 200px;
  height: 300px;
`;

const ListItem = ({ item }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const ctx = React.useContext(ListContext);

  React.useEffect(() => {
    ctx.register(markerRef);
    return () => ctx.unregister(markerRef);
  }, [ctx]);

  ...

  return (
    <StyledListItem ref={ref}>{item.name}</StyledListItem>
  );
};

const List = ({ items }) => {
  const [index, setIndex] = React.useState(0);

  ...

  return (
    <StyledList axis="x" index={index}>
      {items.map((item) => (
        <StyledListItem item={item} key={item.id} />
      ))}
    </StyledList>
  )
};

```
