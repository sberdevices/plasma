import { useEffect, useMemo, useRef } from 'react';
import { spatnavInstance, Config, Section, SectionName } from '../../core';

export type SectionProps<S extends SectionName = SectionName> = { 'data-focusable-section': S };

export type CustomizeConfig = (config: Partial<Config>) => void;

export type SectionTuple<S extends SectionName = SectionName> = [SectionProps<S>, CustomizeConfig, S];

/**
 * Создаёт или отдаёт существующий набор инструментов для работы с секцией.
 * Секция создаётся со стандартным конфигом, но для удобства расширяется двумя свойствами:
 * - `selector = "[data-focusable-section=sectionName] [data-focusable]`"
 * - `defaultElement = "[data-focusable-section=${sectionName}] [data-focusable-default]"`
 *
 * При пересоздании секции конфиг не передаётся в новую секцию.
 *
 * @param sectionName имя секции, если передано существующее — хук вернёт tuple с данными существующей секции.
 * Иначе создаст новую и вернёт её tuple
 *
 * @returns tuple, содержащий готовый HTML аттрибут для применения в JSX через деструктуризацию,
 * функцию для изменения конфига данной секции,
 * и SectionName для тех, кто не применяет деструктуризацию в пропсах JSX
 *
 * Сам tuple и его содержимое мемоизированно с помощью useMemo и зависит только от `sectionName`.
 *
 * @example
 * ```typescript
 * const Page1: FC = () => {
 *      const [sectionProps, customizeMySection, sectionId] = useSection('mySection');
 *
 *      useEffect(() => {
 *          customizeMySection({
 *              enterTo: 'default-element',
 *              straightOnly: true
 *          })
 *      }, []);
 *
 *      const onSelect = useCallback((event: KeyboardEvent | MouseClick) => {
 *          // ваша обработка
 *      }, []);
 *
 *      return (
 *          <div {...sectionProps}> // или <div data-focusable-section={sectionId}>
 *             <FocusableButton handleEnterOrClick={onSelect} />
 *             <FocusableButton handleEnterOrClick={onSelect} />
 *          </div>
 *      );
 * };
 * ```
 */
export function useSection<S extends SectionName = SectionName>(sectionName: S): SectionTuple<S> {
    const previousSectionNameRef = useRef<string>(sectionName);

    const tuple = useMemo(
        function getSectionAndCustomizationFunction(): [Section<S>, CustomizeConfig] {
            const section = spatnavInstance.get(sectionName);

            function customizeConfig(sectionConfig: Partial<Config>) {
                spatnavInstance.set(sectionName, sectionConfig);
            }

            if (section) {
                return [section, customizeConfig];
            }

            const newSection = spatnavInstance.add(sectionName, {
                selector: `[data-focusable-section=${sectionName}] [data-focusable]`,
                defaultElement: `[data-focusable-section=${sectionName}] [data-focusable-default]`,
            });

            return [newSection, customizeConfig];
        },
        [sectionName],
    );

    useEffect(
        function handleSectionNameChange() {
            const previousSectionName = previousSectionNameRef.current;

            if (previousSectionName !== sectionName) {
                spatnavInstance.remove(previousSectionName);
                previousSectionNameRef.current = sectionName;
            }

            return function removeSection() {
                spatnavInstance.remove(sectionName);
                spatnavInstance.remove(previousSectionName);
            };
        },
        [sectionName],
    );

    return useMemo(
        function createResultTuple() {
            const [memoizedSection, customizeConfig] = tuple;

            return [
                {
                    'data-focusable-section': memoizedSection.id,
                },
                customizeConfig,
                memoizedSection.id,
            ];
        },
        [tuple],
    );
}
