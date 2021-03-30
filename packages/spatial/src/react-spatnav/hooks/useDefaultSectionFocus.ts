import { useEffect } from 'react';
import { SectionName, spatnavInstance } from '../../core';
import { SectionProps } from './useSection';

/**
 * Устанавливает секцию по умолчанию и переводит фокус на неё, в случае если фокус не находится ни на одной из секций
 *
 * @param sectionPropsOrName пропсы для компонента секции или имя секции. Если не передан, то не выполняет никаких действий
 */
export function useDefaultSectionFocus(sectionPropsOrName?: SectionProps | SectionName): void {
    useEffect(function setDefaultSection() {
        if (typeof sectionPropsOrName === 'undefined') {
            return;
        }

        const sectionName =
            typeof sectionPropsOrName === 'string' ? sectionPropsOrName : sectionPropsOrName['data-focusable-section'];

        spatnavInstance.setDefaultSection(sectionName);

        if (!spatnavInstance.isAnySectionFocused()) {
            spatnavInstance.focus(sectionName);
        }
    });
}
