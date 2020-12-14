import { Auto, IPlugin } from '@auto-it/core';

type Response = {
    preparedServices: Array<string>;
    failedServices: Array<{ serviceName: string; message?: string }>;
    notNeededServices: Array<{ serviceName: string; message?: string }>;
};
export default class UpdateDepsPlugin implements IPlugin {
    name = 'update-deps';

    apply(auto: Auto) {
        auto.hooks.afterRelease.tapPromise(this.name, async ({ newVersion, response }) => {
            try {
                if (!newVersion || !response) {
                    return undefined;
                }
                auto.logger.log('Обновление зависимостей в монорепозитории');

                const releases = Array.isArray(response) ? response : [response];

                const updates = releases.map(({ data }) => {
                    const pkg = (data.name || data.tag_name).slice(1);
                    const [packageName, packageVersion] = pkg.split('@');
                    return {
                        packageName: `@${packageName}`,
                        packageVersion,
                    };
                });

                if (!updates.length) {
                    auto.logger.log('Обновление зависимостей не требуется');
                    return undefined;
                }

                const url = 'http://37.18.9.207:3000/deps-keeper/api/update-services';

                const body = JSON.stringify({
                    updates,
                });

                const res = await fetch(url, {
                    method: 'POST',
                    body,
                    headers: { 'Content-Type': 'application/json' },
                });
                const resJson: Response = await res.json();

                auto.logger.log(`Обновление зависимостей завершено. Результат: ${resJson}`);
            } catch (error) {
                auto.logger.log(`Ошибка при обновлении зависимостей: ${error}`);
            }
        });
    }
}
