import { useContext, useEffect, useMemo } from 'react';
import spatialContext from '../../src/spatialContext';
import { useMount } from 'react-use';
import { Config } from '../../src/utils/types';
import SpatialNavigation from '../../src/spts';

interface SectionFocusableProp {
    section: {
        'data-focusable-section': string;
    };
    sn: SpatialNavigation;
    sectionId: string;
}

interface UseFocusableSectionOptions {
    noWrapper?: boolean;
    isDefaultSection?: boolean;
}

function useFocusableSection(
    sectionId: string,
    config: Partial<Config> = {},
    options: UseFocusableSectionOptions = {
        isDefaultSection: false,
        noWrapper: false,
    },
): SectionFocusableProp {
    const sn = useContext(spatialContext);

    useMount(() => {
        if (!sn.has(sectionId)) {
            sn.add(sectionId, {
                selector: options.noWrapper
                    ? `[data-focusable-section=${sectionId}][data-focusable]`
                    : `[data-focusable-section=${sectionId}] [data-focusable]`,
                defaultElement: `[data-focusable-section=${sectionId}] [data-focusable-default]`,
                ...config,
            });
        }
        if (options.isDefaultSection) {
            sn.focus(sectionId);
            sn.setDefaultSection(sectionId);
        }
    });

    useEffect(() => {
        if (options.isDefaultSection && document.activeElement === document.body) {
            sn.focus(sectionId);
        }
    });

    return useMemo(() => {
        return { section: { 'data-focusable-section': sectionId }, sn, sectionId };
    }, [sectionId, sn]);
}

export { useFocusableSection };

export default useFocusableSection;
