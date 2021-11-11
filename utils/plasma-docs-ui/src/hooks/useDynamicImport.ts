import { useEffect, useState } from 'react';
import type { Props } from 'react-docgen-typescript';

type ComponentInfo = {
    props?: Props;
    description?: string;
    source?: string;
};

/**
 * Метод для полуечния динамического импорта
 * по переданному элиасу
 */
const getImport = (alias: string, name: string) => {
    if (alias.startsWith('@docgen')) {
        return import(`@docgen/${name}.json`);
    }

    return Promise.reject(new Error(`Alias ${alias} not found in list`));
};

/**
 * Хук для динамического импорта модуля
 */
export const useDynamicImport = (alias: string, name: string): ComponentInfo => {
    const [info, setInfo] = useState<ComponentInfo>({});

    useEffect(() => {
        let resolved = false;

        try {
            getImport(alias, name)
                .then((importedInfo) => {
                    if (!resolved) {
                        resolved = true;
                        setInfo(importedInfo.default);
                    }
                })
                .catch((e) => console.error(`Not found module in ${alias}/${name}.`, e));
        } catch (e) {
            console.error(e);
        }

        return () => {
            resolved = true;
        };
    }, [alias, name]);

    return info;
};
