import React from 'react';
import type { AsProps } from '@sberdevices/plasma-core/types';

import { ShowcaseSectionName } from './Showcase';
import { ShowcaseGridTable } from './ShowcaseGridTable';

/**
 * Шоукейсы - обертки для демонстрации / тестирования полной раскладки презентуемого компонента.
 */
export const BadgeShowcase = ({
    sections = [{}],
    ...rest
}: {
    sections?: { title?: string; subTitle?: string; props?: object }[];
    rows: Record<string, object>;
    cols: Record<string, object>;
    component: React.ComponentType<any>;
}) => (
    <>
        {sections.map(({ title, subTitle, props }, i) => (
            <React.Fragment key={`section:${i}`}>
                {title && <ShowcaseSectionName title={title} subTitle={subTitle} />}
                <ShowcaseGrid props={props} {...rest} />
            </React.Fragment>
        ))}
    </>
);

const ShowcaseGrid = ({
    props,
    rows,
    cols,
    component: Badge,
    ...rest
}: {
    props?: object;
    rows: Record<string, object>;
    cols: Record<string, object>;
    component: React.ComponentType<any>;
} & AsProps) => {
    const colsList = Object.entries(cols);
    const c = Object.keys(cols);
    const r = Object.keys(rows);
    const d = Object.entries(rows).map(([, rowProps]) =>
        colsList.map(([, colProps]) => <Badge {...({ ...props, ...rowProps, ...colProps } as any)} />),
    );

    return <ShowcaseGridTable {...rest} cols={c} rows={r} data={d} templateColumns="repeat(3, max-content)" />;
};
