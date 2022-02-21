# Утилита запуска тестов по платформам

### Конфигурация по платформам

Конфигурация для Cypress состоит из нескольких конфигов отдельно для каждой из платформ

```
cypress
    - config
        - sberbox.json
        - sberportal.json
        - mobile.json
```

```js
// sberbox.json
{
    "componentFolder": "./packages/plasma-temple/src",

    // файлы со спекам тестов разделены на общие тесты для всех платформ и специфичные под текущую
    "testFiles": ["**/*@{common,sberbox}.component-test.{ts,tsx}"],

    // высота вьюпорта браузера
    "viewportHeight": 1080,

    // ширина вьюпорта браузера
    "viewportWidth": 1920,

    "env": {
        // директория для скриншотов специфичная для платформы
        "snapshotsDir": "cypress/snapshots/temple@sberbox",
        "packageDir": "packages/plasma-temple",
        "package": "plasma-temple"
    },

    // упрощенный userAgent *
    "userAgent": "sberbox",
    "retries": 0,
    "video": false,
    "scrollBehavior": false
}

```

На основании userAgent опрделеляются размеры для окна браузера при прогоне тестов. Доступные значения `sberbox | sberportal | mobile`

Тесты так же запускаюся в докере, запуск проиcходит последовательно для каждой найденной конфигурации.

### Запуск тестов отдельной платформы

Для локального запуска тестов может потребоваться запускать тесты на одной платформе, например на Портале. Для пакета @sberdevides/plasma-temple по умолчанию тесты запускаются для платформы `sberbox`

```sh
$ TEST_PLATFORM=sberportal npm run cy:temple:open-ct
```

### API

```sh
# команда запуска
node actions/platform-test/lib/index.js
# параметры
--config { path/to/config/dir } # путь до директории конфигов относительно корня репозитория
--platform { sberbox | sberportal | mobile } # платформа
--command { run-ct | open-ct } # команда тестирования
```
