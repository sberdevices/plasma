import { useContext, useEffect } from 'react';
import { useMount } from 'react-use';

import { spatialContext } from '../spatialContext';

function useAutoFocus(sectionId: string): void {
    const sn = useContext(spatialContext);
    useMount(() => {
        sn.focus(sectionId);
        sn.setDefaultSection(sectionId);
    });

    useEffect(() => {
        if (document.activeElement === document.body) {
            sn.focus(sectionId);
            sn.setDefaultSection(sectionId);
        }
    });
}

export { useAutoFocus };
