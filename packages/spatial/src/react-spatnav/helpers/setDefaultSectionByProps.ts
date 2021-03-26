import { SectionProps } from '../hooks';
import { spatnavInstance } from '../../core';

/**
 * Устанавливает секцию по умолчанию исходя из пропсов.
 * По умолчанию переводит фокус на эту секцию
 *
 * @param sectionProps пропсы секции
 *
 * @param needFocus нужно ли перевести фокус на на эту секцию
 *
 * @throws Выбросит исключение, если секции не существует
 */
export function setDefaultSectionByProps(sectionProps: SectionProps, needFocus = true): void {
    const name = sectionProps['data-focusable-section'];

    spatnavInstance.setDefaultSection(name);

    if (needFocus) {
        spatnavInstance.focus(name);
    }
}
