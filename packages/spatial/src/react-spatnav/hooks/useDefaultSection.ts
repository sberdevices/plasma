import { useEffect } from 'react';
import { SectionName, spatnavInstance } from '../../core';
import { SectionProps } from './useSection';

export function useDefaultSection(sectionPropsOrName: SectionProps | SectionName): void {
    useEffect(
        function setDefaultSection() {
            const sectionName =
                typeof sectionPropsOrName === 'string'
                    ? sectionPropsOrName
                    : sectionPropsOrName['data-focusable-section'];

            spatnavInstance.setDefaultSection(sectionName);
            spatnavInstance.focus(sectionName);
        },
        [sectionPropsOrName],
    );
}
