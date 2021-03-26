import { spatnavInstance } from './spatnavInstance';

/**
 * Устанавливает секцию по умолчанию с именем `sectionName`.
 * По умолчанию переводит фокус на эту секцию
 *
 * @param sectionName имя секции,
 *
 * @param needFocus нужно ли перевести фокус на на эту секцию
 *
 * @throws Выбросит исключение, если секции не существует
 */
export function setDefaultSectionByName(sectionName: string, needFocus = true): void {
    spatnavInstance.setDefaultSection(sectionName);

    if (needFocus) {
        spatnavInstance.focus(sectionName);
    }
}
