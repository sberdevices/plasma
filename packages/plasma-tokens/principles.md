# Принципы работы

## Схема получения `дизайн-токенов`

![Plasma-Tokens Generator](https://user-images.githubusercontent.com/1813468/106250439-b16d3100-6224-11eb-95f6-1c363203f53b.png)


1. Загружаем токены из `figma` с помощью [diez](https://diez.org/) и преобразуем в `design-language`;
1. Преобразуем токены в необходимый нам формат [Generator](./plasma-tokens/generate.ts) и насыщаем комментариями
1. Генерируем пакеты для [android](https://www.npmjs.com/package/@sberdevices/plasma-tokens-android) и [ios](https://www.npmjs.com/package/@sberdevices/plasma-tokens-ios-swift) с помощью [style-dictionary](https://github.com/amzn/style-dictionary)
