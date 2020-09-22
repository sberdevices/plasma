# Plasma-tokens


Пакет предоставляет набор дизайн-токенов реализующих дизайн «plasma-style» для разных устройств.

Дизайн-токены [синхронизированы](#Синхронизация) с [figma](https://www.figma.com).

## Пример использования

```sh
npm i --save 'plasma-tokens'
```

```js
import styled from 'styled-components';

import { text, background, gradient } from 'plasma-tokens';

const AppStyled = styled.div`
  padding: 30px;
  color: ${text};
  background-color: ${background};
  background-image: ${gradient};
`;

export default const App = () => {
  return (
    <AppStyled>
      <h2>Hello Plasma</h2>
    </AppStyled>
  );
}

```

Для более подробного ознакомления предлагается изучить [исходный код примера](example-codebases/example-styled-components/src/App.tsx).

## Типографическая Система

```js
import { typography } from 'plasma-tokens';
```
Включает в себя все необходимые константы для работы с тектом.

Сейчас это следующие готоые стилевые объекты:

Hero Unit:
  * display1
  * display2
  * display3

Заголовки:
  * headline1
  * headline2
  * headline3
  * headline4

Основной текст:
  * body1
  * body2
  * body3

  * paragraph1
  * paragraph2

Вспомогательный текст:
  * footnote1
  * footnote2

Контролы:
  * button1
  * button2

Дополнительные:
  * caption
  * underline

--

Также можно получить все возможные значения для `fontSizes`, `fonts`, `fontWeights`, `lineHeights`, `letterSpacings`;

```js
import { fonts } from 'plasma-tokens';

console.log(fonts);
// –> {
//     Medium: "'SB Sans Text','Helvetica','Arial',sans-serif",
//     Bold: "'SB Sans Text','Helvetica','Arial',sans-serif",
//     Semibold: "'SB Sans Text','Helvetica','Arial',sans-serif",
//     Regular: "'SB Sans Text','Helvetica','Arial',sans-serif"
// }
```

> **NB:** По умолчанию размеры `fontSize` & `lineHeight` увеличены вдвое, для того чтобы корректно смотреться на большом экране устройств.

Для получения типографических констант в первоначальном размере можно использовать следущий пример:

```js
import { typographyx1 } from 'plasma-tokens';
```

## Цвета

Цвета можно забират из корня пакета, для каждого цвета есть комеентарий описывающий его использование.


```js
import { accent } from 'plasma-tokens';

```

```js
/** Акцентный цвет призыва к действию */
export declare const accent = "var(--theme-colors-accent, #2AC673)";
```

Цвета представляют собой [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) c заданным цветом по умолчанию.

Это позволяет переопределять цвета с помощью [Тем](#Темы). И При этом без необходимости не загружать в рантайм лишний код темы.

Также доступны сами значения пременных:

```js
import { colorValues } from 'plasma-tokens';

console.log(colorValues.black); // –> '#080808'

```


## Темы

В пакете предоставлены 6 тем:

    * darkSber – Тема по умолчанию,
    * darkEva,
    * darkJoy,
    * lightSber,
    * lightEva,
    * lightJoy,

Подключение:

```js
import styled, { createGlobalStyle } from 'styled-components';

// Подключение не из корня пакета:
import { darkEva } from 'plasma-tokens/themes';

import { text, background, gradient } from 'plasma-tokens';

// Создаем глобальные стили
// Лучше такие места выносит из render() вашего компонента
const GlobalStyle = createGlobalStyle(darkEva);

const AppStyled = styled.div`
  padding: 30px;
  color: ${text};
  background-color: ${background};
  background-image: ${gradient};
`;
// text, background & gradient теперь устанавливаются согласно значениям из темы darkEva

export default const App = () => {
  return (
    <AppStyled>
      <GlobalStyle />
      <h2>Hello Plasma Theme</h2>
    </AppStyled>
  );
}

```


## Синхронизация


Все дизайн-токены взять из фигмы с помощью утилиты [Diez](https://diez.org/).



Для того чтобы обновить константы, выполните следующие команды
в корне пакета.

```sh
npm ci
npm run figma
```

После этого нужно изучить изменившиеся файлы внутри папки `design-language`.
Особенно внимательно нужно посмотреть на файл `design-language/src/designs/PlasmaStyles.figma.ts`

В нём хранятся вне токены стянутые из фигмы.

После того как вы убедились что ничего лишнего не удалено и все изменения дизайнеры сделали осознано можно приступать к следующему шагу:

```sh
npm run build
```

На этом этапе запускается скрипт `./generate.ts` который перекладывает токены из фигмы в необходимые форматы. И создаёт описанную выше структуры пакета.

Если что-то не собирается можно откатить часть изменений из `design-language`. И пойти разбираться что не так. 

