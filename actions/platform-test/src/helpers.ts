import debug from 'debug';
import fs, { promises } from 'fs';
import invariant from 'invariant';
import path from 'path';

import { Params } from './types';

export const log = debug('platform-test');
export const reArgPrefix = /^(--)/i;

export const isDir = (pathname: string) => fs.lstatSync(pathname).isDirectory();

export function asyncChain<T extends (...args: any) => any, Args>(
    callback: T,
    ...args: Args[]
): () => Promise<ReturnType<T>> {
    const [arg, ...rest] = args;
    return rest.reduce((fn, restArg) => {
        return fn.then(() => callback(restArg));
    }, callback(arg));
}

export function parseArg(arg: string): string[] {
    return arg.replace(reArgPrefix, '').split('=');
}

export function wrapPromise<T>(promiseGetter: () => Promise<T>) {
    return promiseGetter().then<[T, null], [null, Error]>(
        (res) => [res, null],
        (error) => [null, error],
    );
}

export async function readDir(pathname: string) {
    const [files, error] = await wrapPromise(() => promises.readdir(pathname));

    invariant(files, error?.message || 'Cannot read dir');

    return files.map((fileInDir) => path.resolve(pathname, fileInDir));
}

export function getRunnerParams(): Params {
    const { argv } = process;
    const runParams: Params = {} as Params;

    for (let i = 0; i < argv.length; i += 1) {
        const flag = argv[i];

        if (reArgPrefix.test(flag)) {
            const parsed = parseArg(flag);
            let value = parsed[1];

            if (value == null) {
                value = argv[++i];
            }

            runParams[parsed[0]] = value;
        }
    }

    return runParams;
}
