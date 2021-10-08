import { useState, useContext } from 'react';

import { SSRContext } from '../components/SSRProvider';

let noSSRId = 0;

export function useUniqId(): string {
    const context = useContext(SSRContext);
    const [id] = useState(() => {
        if (context.uniqId !== null) {
            return `plasma-uniq-id-ssr-${++context.uniqId}`;
        }
        return `plasma-uniq-id-${++noSSRId}`;
    });
    return id;
}
