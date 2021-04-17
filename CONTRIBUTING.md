# Contributing

Процесс внесения изменений в репозиторий

## Commit step

Мы используем conventional commits (https://www.conventionalcommits.org/). Git commit message должен быть на английском языке.
Изменения в коммите должны затрагивать только один пакет.
Версионирование пакетов происходит автоматически, руками версию в `package.json` не поднимаем.

Пример коммита в пакет plasma-ui:

```sh
git commit -m "feat(plasma-ui): Component X added"
```

## Pull request

-   Создаем PR в ветку `master`, дожидаемся успешного завершения работы ci. Если последний commit-message содержит `[skip ci]` - ci запущен не будет.
-   По завершению должны выпуститься canary-версии затронутых пакетов.
-   Дожидаемся аппрува от всех ревьюеров ПРа.
-   Мержим ПР.

После успешного завешения работы ci для каждого затронутого пакета будет:

-   Поднята версия
-   Собран `CHANGELOG.md` (+ общий для всего монорепозитория)
-   Выпущена новая версия в npm-registry
-   Собран storybook для пакета plasma-ui (https://5f96ec813d800900227e3b93-eobodfvrnh.chromatic.com/)

## Запуск тестов со скриншотами

В `packages/plasma-ui`:

```sh
npm run storybook
```

После этого в корне:

```sh
npm run cy:run
```

Принять изменения в скриншотах:

```sh
npm run cy:accept-diffs
```
