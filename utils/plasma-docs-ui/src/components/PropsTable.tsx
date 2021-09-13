import React, { FC, HTMLAttributes, useMemo } from 'react';

import type { ComponentProps } from '../types';

export interface PropsTableProps extends HTMLAttributes<HTMLTableElement> {
    props: ComponentProps;
    exclude?: string[];
}

const defaultExclude = ['forwardedAs', 'as', 'theme', 'ref'];

/**
 * Компонент для вывода таблицы пропсов.
 */
export const PropsTable: FC<PropsTableProps> = ({ props, exclude: propsExclude = [] }) => {
    const filteredPropsList = useMemo(() => {
        if (!props) {
            return null;
        }
        const exclude = propsExclude.concat(defaultExclude);
        return Object.entries(props).filter((entry) => !exclude.includes(entry[0]));
    }, [props, propsExclude]);

    if (!filteredPropsList?.length) {
        return null;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {filteredPropsList.map(([key, prop]) => {
                    return (
                        <tr key={key}>
                            <td>
                                <code>
                                    {key}
                                    {prop.required && '*'}
                                </code>
                            </td>
                            <td>
                                <code>{prop.type?.name}</code>
                            </td>
                            <td>{prop.defaultValue && <code>{prop.defaultValue.value}</code>}</td>
                            <td>{prop.description}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
