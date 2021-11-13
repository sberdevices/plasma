# SberDevices Ad SDK

Показывающий код SberDevices

## Создание смартапа

Создайте проект в [SmartApp Studio](https://developers.sber.ru/docs/ru/salute/studio/project/create)

В качестве Webhook смартапа укажите либо готовый webhook: `https://smartapp-code.sberdevices.ru/chatadapter/chatapi/webhook/sber_nlp2/akvMhQEy:73931a63e07450a5260600c7f9f6e6d6a992578b`
Либо собственный веб-хук который будет присылать данные для инициализации по [данному](./api/hook.js) примеру;

В качестве Хостинг фронтенда укажите ссылку на свой клиентский код;

Подключите `SberDevices Ad SDK` к клиентской части вашего приложения.

## Установка Ad SDK

Подключите [assistantClient](https://github.com/sberdevices/assistant-client#%D0%B0%D0%BB%D1%8C%D1%82%D0%B5%D1%80%D0%BD%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5-%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D0%B5)

Подключите показывающий код через тег script в ваше приложение:

```html
<script src="https://cdn-app.sberdevices.ru/shared-static/0.0.0/js/@sberdevices/ad-sdk/ad-sdk.min.js"></script>
```

## Использование

После загрузки скрипта вам будет доступен объект `window.SberDevicesAdSDK`;
У этого объекта есть три основных метода:

- `init()`
- `runVideoAd()`
- `runBanner()`

### Инициализация

_NB_ Для корректной инициализации показывающего кода, необходимо подключить assistantClient до инициализации SberDevicesAdSDK.

`SberDevicesAdSDK` имеет несколько вариантов инициализации:

Самый простой способ инициализации:

#### init()

```js
window.SberDevicesAdSDK.init({ onError, onSuccess });
```

После успешной инициализации вызовется `onSuccess`; После чего можно [запустить рекламу](#Запуск_рекламы)

Также можно проверить инициализацию вызвав метод `window.SberDevicesAdSDK.isInited()`;

**NB** метод `SberDevicesAdSDK.init` предполагает что ваше приложение запущено в окружении с поддержкой голосового Ассистента;

Пример использования этого метода можно посмотреть в [данном Демо-проекте](./src/index.js)

#### initDev()

Метод `window.SberDevicesAdSDK.initDev` предназначен только для локальной отладки, он работает также как метод `init` но принимает два дополнительных параметра: `token`, `initPhrase`;

`initPhrase` – Фраза для запуска вашего смартап, строится следующим образом `Запусти + Активационное имя (Запусти мой апп)`; Пример: `Запусти кубик Рубика`
`token` – Токен для дебага, получить его можно в SmartApp Studio по [инструкции](https://developers.sber.ru/docs/ru/salute/assistant-client/overview#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81%D0%BE%D0%B2).

```js
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const DEV_TOKEN = process.env.DEV_TOKEN;
const DEV_PHRASE = process.env.DEV_PHRASE;

if (IS_DEVELOPMENT) {
  window.SberDevicesAdSDK.initDev({ token: DEV_TOKEN, initPhrase: DEV_PHRASE, onSuccess, onError });
} else {
  window.SberDevicesAdSDK.init({ onSuccess, onError });
}
```

Пример использования этого метода можно посмотреть в [данном Демо-проекте](./src/index.js)

#### initWithAssistant()

Если вы хотите контролировать создание assistantClient самостоятельно, и например подписаться на [смену персонажей](https://github.com/sberdevices/assistant-client#AssistantCharacterCommand);
То создайте инстанс a и передайте его в метод `window.SberDevicesAdSDK.initWithAssistant()`;

```js
const assistant = initializeAssistant();

initWithAssistant({
  assistant,
  onSuccess,
  onError,
});
```

Пример создания `assistant` можно посмотреть в [документации](https://github.com/sberdevices/assistant-client#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F);

Пример использования метода `initWithAssistant` можно посмотреть в [данном Демо-проекте](./src/initWithAssistant.js)

_NB_ – При таком методе инициализации `SberDevicesAdSDK` рассчитывает что в качестве webhook указан готовый webhook либо сценарий отправляет все необходимые данные на старте. [Пример такого сценария](./api/hook.js) можно посмотреть в данном репозитории.

#### initWithParams()

Если вы хотите написать свой собственный сценарий и использовать его в качестве веб-хука, возьмите за основу [пример такого сценария](./api/hook.js)
Пример написан с использованием фреймворка [SaluteJS](https://github.com/sberdevices/salutejs)
Вы можете написать сценарий с использованием любого другого [инструмента](https://developers.sber.ru/docs/ru/salute/overview#%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B)

Инициализируйте [AssistantClient](https://github.com/sberdevices/assistant-client#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)
Подпишитесь на получения необходимых данных и после получения инициализируйте SberDevicesAdSDK

```js
assistant.on("data", (command) => {
  if (command.type === "smart_app_data" && command.smart_app_data.type === "sub") {
    initWithParams({
      params: command.smart_app_data.payload,
      onSuccess: () => {
        console.log("AdSdk Inited with params");
        testBtn.disabled = false;
      },
      onError,
    });
  }
});
```

**NB** `smart_app_data.type` отправленный на сценарии должен быть такой-же, который вы ожидаете в подписке `assistant.on('data', ...)`

Параметры которые ожидает метод `window.SberDevicesAdSDK.initWithParams()`:

```js
{
    onSuccess,
    onError,
    params: {
        sub: '42l/Y1...', // идентификатор пользователя
        projectName: 'y2dw...', // идентификатор проекта
        device: { ... }, // информация об устройстве пользователя
        app_info: { ... }, // информация о приложении
    }
}
```

Всю эту информацию необходимо получить c помощью ассистента;

### Запуск баннера

После инициализации показывающего кода, необходимо воспользоваться командой `runBanner()`, для показа видео-рекламы.

```js
runBanner({
  onSuccess: () => {}, // Вызовется при закрытии баннера
  onError: () => {}, // Вызовется в случае ошибки при показе баннера
});
```

[Пример](./src/index.js) для запуска баннера расположен в данном репозитории.

### Запуск видео-рекламы

После инициализации показывающего кода, необходимо воспользоваться командой `runVideoAd()`, для показа видео-рекламы.

```js
runVideoAd({
  onSuccess: () => {}, // Вызовется при переходе или при полном показе рекламы
  onError: () => {}, // Вызовется во время ошибки при показе рекламы
});
```

[Пример](./src/index.js) для запуска рекламы также расположен в данном репозитории.

## Запуск демо проекта

Перед началом работы создайте свой смартапп(canvas) в [SmartMarket Studio](https://smartapp-studio.sberdevices.ru/)

и скопируйте `.env.sample` в `.env`. Заполните необходимые переменные.

Демо-проект использует [vercel](https://vercel.com/) для поднятия локального сервера разработки;

```
npm ci
npm start
```

После запуска поднимите тунель например с помощью `ngrok` на порт 3000 и пропишите в созданном ранее смартапе пути до тунеля:

- Webhook смартапа: туннель+/api/hook
- Frontend Endpoint: туннель
