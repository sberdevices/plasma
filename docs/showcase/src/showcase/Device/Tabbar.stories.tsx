import React from 'react';
import { Tabs, TabItem } from '@sberdevices/plasma-ui/components/Tabs';

import { ShowcasePanel, ShowcaseSectionName, ShowcaseDashedBorder } from '../../helpers';

export default {
    title: 'Showcase/Device',
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

const makeTabs = (length: number, view: 'clear' | 'secondary', pilled?: boolean) => () => {
    const [active, setActive] = React.useState(0);

    return (
        <Tabs size="s" stretch pilled={pilled} view={view} style={{ marginBottom: 20 }}>
            {Array.from({ length }, (_, i) => (
                <TabItem key={i} isActive={i === active} onClick={() => setActive(i)}>
                    Label
                </TabItem>
            ))}
        </Tabs>
    );
};

const variants1 = [2, 3, 4].map((length) => makeTabs(length, 'secondary'));

const variants2 = [3, 3].map((length, i) => makeTabs(length, i === 0 ? 'clear' : 'secondary', true));

export const Tabbar = () => (
    <>
        <ShowcaseSectionName title="Tabbar" subTitle="Нижняя навигационная панель" />
        <ShowcasePanel style={{ maxWidth: '33.75rem', marginBottom: 0 }}>
            <ShowcaseDashedBorder style={{ paddingBottom: 0, width: 400 }}>
                {variants1.map((Variant, i) => (
                    <Variant key={i} />
                ))}
            </ShowcaseDashedBorder>
        </ShowcasePanel>
        <ShowcaseSectionName title="Tabbar" subTitle="Нижняя навигационная панель" />
        <ShowcasePanel style={{ maxWidth: '33.75rem', marginBottom: 0 }}>
            <ShowcaseDashedBorder style={{ paddingBottom: 0, width: 260 }}>
                {variants2.map((Variant, i) => (
                    <Variant key={i} />
                ))}
            </ShowcaseDashedBorder>
        </ShowcasePanel>
    </>
);
