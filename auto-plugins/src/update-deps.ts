import { Auto, IPlugin } from '@auto-it/core';
import fetch from 'node-fetch';

type Response = {
    preparedServices: Array<string>;
    failedServices: Array<{ serviceName: string; message?: string }>;
    notNeededServices: Array<{ serviceName: string; message?: string }>;
};

const baseUrl = process.env.UPDATE_SERVICE_BASE_URL;
export default class UpdateDepsPlugin implements IPlugin {
    name = 'update-deps';

    apply(auto: Auto) {
        auto.hooks.afterRelease.tapPromise(this.name, async ({ newVersion, response }) => {
            try {
                if (!newVersion || !response) {
                    return undefined;
                }
                auto.logger.verbose.info('Обновление зависимостей в монорепозитории');

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
                    auto.logger.verbose.info('Обновление зависимостей не требуется');
                    return undefined;
                }

                const url = `${baseUrl}/deps-keeper/api/update-services`;

                const body = JSON.stringify({
                    updates,
                });

                const res = await fetch(url, {
                    method: 'POST',
                    body,
                    headers: { 'Content-Type': 'application/json' },
                });
                const resJson: Response = await res.json();

                auto.logger.verbose.info(`Обновление зависимостей завершено. Результат: ${resJson}`);
            } catch (error) {
                console.error(`Ошибка при обновлении зависимостей: ${error}`);
            }
        });
    }
}
