import path from 'path';
import { writeFile, pathExistsSync } from 'fs-extra';
import puppeteerCore from 'puppeteer-core';
import express from 'express';
import getPort from 'get-port';

const useLocation: (input: string) => Promise<[string, () => void]> = async (input: string) => {
    if (input.match(/^http/)) {
        return [input, async () => {}];
    }

    if (!pathExistsSync(input)) {
        throw Error('storybook build does not exist');
    }

    const app = express();

    app.use(express.static(input));

    const port = await getPort();

    return new Promise((resolve) => {
        const server = app.listen(port, () => {
            const result = `http://localhost:${port}/iframe.html`;

            console.info(`connecting to: ${result}`);

            resolve([result, server.close.bind(server)]);
        });
    });
};

const usePuppeteerBrowser: () => Promise<puppeteerCore.Browser> = async () => {
    const args = ['--no-sandbox ', '--disable-setuid-sandbox'];
    try {
        return await puppeteerCore.launch({ args });
    } catch (e) {
        // it's not installed
        console.info('installing puppeteer...');
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line global-require
            require('child_process').exec(
                `node ${require.resolve(path.join('puppeteer-core', 'install.js'))}`,
                (error: any) => (error ? reject(error) : resolve(puppeteerCore.launch({ args }))),
            );
        });
    }
};

const read = async (url: string) => {
    const browser = await usePuppeteerBrowser();
    const page = await browser.newPage();

    await page.goto(url);

    await page.waitForFunction(
        'window.__STORYBOOK_STORY_STORE__ && window.__STORYBOOK_STORY_STORE__.extract && window.__STORYBOOK_STORY_STORE__.extract()',
    );

    const data = JSON.parse(
        await page.evaluate(async () => {
            // @ts-ignore
            return JSON.stringify(window.STORYBOOK_REACT_CLASSES, null, 2);
        }),
    ) as Record<string, any>;

    if (!data || !Object.keys(data).length) {
        throw Error('build does not contain docgenInfo. check for window.STORYBOOK_REACT_CLASSES variable in it');
    }

    console.log(`extracting info for ${Object.keys(data).length} components...`);

    const info = Object.entries(data).reduce<Record<string, object>>((acc, [, { docgenInfo, name }]) => {
        acc[name] = docgenInfo;
        return acc;
    }, {});

    setImmediate(() => {
        browser.close();
    });
    return info;
};

export async function extract(input: string, targetPath: string) {
    if (!input || !targetPath) {
        throw new Error(
            'Extract: please specify a path where your built-storybook is (can be a public url) and a target directory',
        );
    }

    const [location, exit] = await useLocation(input);
    const data = await read(location);

    console.log(`writing info to ${targetPath}`);

    await writeFile(targetPath, JSON.stringify(data, null, 2));
    exit();
}
