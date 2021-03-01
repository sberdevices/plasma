import { useContext, useEffect } from 'react';

import { spatialContext } from '../spatialContext';

function useAutoFocus(sectionId: string): void {
    const sn = useContext(spatialContext);
    useEffect(() => {
        sn.focus(sectionId);
        sn.setDefaultSection(sectionId);
    }, []);

    useEffect(() => {
        if (document.activeElement === document.body) {
            sn.focus(sectionId);
            sn.setDefaultSection(sectionId);
        }
    });
}

export { useAutoFocus };
