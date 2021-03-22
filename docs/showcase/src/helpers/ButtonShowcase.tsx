import React from 'react';
import styled from 'styled-components';
import type { AsProps } from '@sberdevices/plasma-core/types';

import { IconPlaceholder } from './IconPlaceholder';
import { ShowcaseSectionName, ShowcasePanel } from './Showcase';
import { ShowcaseGridTable } from './ShowcaseGridTable';

const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const contentLeft = <IconPlaceholder />;

/**
 * Шоукейсы - обертки для демонстрации / тестирования полной раскладки презентуемого компонента.
 */
export const Showcase = ({
    sections,
    ...rest
}: {
    sections: { title: string; subTitle?: string; panel?: boolean; props: object }[];
    rows: Record<string, object>;
    cols: Record<string, object>;
    columns: string;
    component: React.ComponentType<any>;
}) => (
    <>
        {sections.map(({ title, subTitle, panel, props }, i) => (
            <React.Fragment key={`section:${i}`}>
                <ShowcaseSectionName title={title} subTitle={subTitle} />
                <ShowcaseGrid as={panel ? ShowcasePanel : undefined} props={props} {...rest} />
                {/* <ShowcaseHR /> */}
            </React.Fragment>
        ))}
    </>
);

const ShowcaseGrid = ({
    props,
    rows,
    cols,
    columns,
    component: Button,
    ...rest
}: {
    props: object;
    rows: Record<string, object>;
    cols: Record<string, object>;
    columns: string;
    component: React.ComponentType<any>;
} & AsProps) => {
    const colsList = Object.entries(cols);
    const c = Object.keys(cols);
    const r = Object.keys(rows);
    const d = Object.entries(rows).map(([, rowProps]) =>
        colsList.map(([, colProps]) => {
            const itemProps = { ...props, ...rowProps, ...colProps } as any;

            return (
                <>
                    {itemProps.text && (
                        <StyledButtonWrapper>
                            <Button {...itemProps} />
                        </StyledButtonWrapper>
                    )}
                    <StyledButtonWrapper>
                        <Button {...itemProps} contentLeft={contentLeft} />
                    </StyledButtonWrapper>
                </>
            );
        }),
    );

    return <ShowcaseGridTable {...rest} cols={c} rows={r} data={d} templateColumns={columns} />;
};
