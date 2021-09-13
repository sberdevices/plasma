import { useEffect, useState } from 'react';
import type { Props } from 'react-docgen-typescript';

type DocgenInfo = {
    props?: Props;
    description?: string;
};

export const useDynamicImport = (name: string): DocgenInfo => {
    const [info, setInfo] = useState<DocgenInfo>({});

    useEffect(() => {
        let resolved = false;

        try {
            import(`@docgen/${name}.json`)
                .then((importedInfo) => {
                    if (!resolved) {
                        resolved = true;
                        setInfo(importedInfo.default);
                    }
                })
                .catch(() => console.error(`Not found DocgenInfo for ${name}.`));
        } catch (e) {
            console.error(e);
        }

        return () => {
            resolved = true;
        };
    }, [name]);

    return info;
};
