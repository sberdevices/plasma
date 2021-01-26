import { useContext, useEffect } from 'react';
import spatialContext from '../../src/spatialContext';
import { useMount } from 'react-use';

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

export default useAutoFocus;
