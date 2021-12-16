/* eslint-disable no-console */
import { getInput, setOutput, setFailed } from '@actions/core';

import { exec } from './exec';
import { getDocPackages } from './commits';
import { findAssociatedVersions, writeVersionsJson } from './fs';
import { getCommitList } from './github';
import { associatedPackages, associatedPrefixes } from './packages';

const createBuildFolder = async () => {
    const { stdout, stderr } = await exec('mkdir ../build');

    console.log('> Creating build folder', stdout, stderr);
};

const buildDocumentation = async (docpckgName: string, prefix: string, version: string) => {
    console.log(`> Building apllication for "${docpckgName}".`);

    const build = await exec(`npm run build --prefix="./website/${docpckgName}"`);

    console.log(build.stdout, build.stderr);

    console.log(`> Copying outputs for "${docpckgName}".`);

    const copying = await exec(`cp -R ./website/${docpckgName}/build ../build/${prefix}-${version}`);

    console.log(copying.stdout, copying.stderr);
};

/**
 * Разбор лога и пакетов, подвергшихся изменению.
 */
async function main() {
    const token = getInput('token', { required: true });
    // коммиты пуллреквеста/пуша
    const commits = await getCommitList(token);
    // Пакеты документации
    const docs = getDocPackages(commits);

    if (Object.keys(docs).length < 1) {
        console.log('> There are no changes in documentation, versioning will be skept.');
        return setOutput('result', false);
    }

    console.log(`> Found ${docs.length} packages for documentation versioning.`, docs);

    // Пакеты и их версии
    const versions = await findAssociatedVersions(docs);

    console.log('> Following versions will be tagged:', versions);

    await createBuildFolder();

    await Promise.all(
        docs.map(async (docPckgName) => {
            const pckgName = associatedPackages[docPckgName];
            const prefix = associatedPrefixes[docPckgName];
            const version = versions[pckgName];
            const url = `https://plasma.sberdevices.ru/${prefix}-${version}/`;

            console.log(`> Running build for package "${docPckgName}". URL would be: "${url}".`);

            await buildDocumentation(docPckgName, prefix, version);

            console.log(`> Writing versionsArchived.json for package "${docPckgName}".`);

            await writeVersionsJson(`./website/${docPckgName}/versionsArchived.json`, version, url);
        }),
    );

    console.log(`> Successfuly built versions for ${docs.length} packages.`);
    console.log('> Build artifacts and uncommited changes should be processed by following jobs.');
    setOutput('result', true);
}

main().catch((err) => setFailed(err.message));
