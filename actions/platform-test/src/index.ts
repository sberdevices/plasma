import path from 'path';
import invariant from 'invariant';

import { asyncChain, isDir, readDir, log, getRunnerParams } from './helpers';
import { spawnCyCommand } from './spawn';

export async function platfomTest() {
    const params = getRunnerParams();

    log('recieved params', params);

    const { config, command, platform, ...rest } = params;
    const testConfig = path.resolve(process.cwd(), config);

    invariant(testConfig, 'Hm... Look, you`re missed config');

    const outerParams = Object.entries(rest).reduce<string[]>((acc, [key, value]) => {
        acc.push(`--${key}`, value);
        return acc;
    }, []);

    if (isDir(testConfig)) {
        process.env.PLATFORM_TESTS = 'true';

        log('run tests by platforms');
        const files = await readDir(testConfig);

        invariant(files, `Cannot read configs files for ${process.env.PACKAGE_NAME}`);

        if (command === 'open-ct') {
            const foundConf = files.find((file) => file.includes(platform));

            invariant(foundConf, `Cannot find config for platform ${platform}`);

            return spawnCyCommand(command, ['--config-file', foundConf, ...outerParams]);
        }

        log('run specs', files);

        return asyncChain((file) => spawnCyCommand(command, ['--config-file', file, ...outerParams]), ...files);
    }

    return spawnCyCommand(command, ['--config-file', testConfig, ...outerParams]);
}

platfomTest().catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
    process.exit(1);
});
