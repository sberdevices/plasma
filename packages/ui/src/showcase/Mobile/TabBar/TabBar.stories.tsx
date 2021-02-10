import React, { useState } from 'react';

import { Tabs, TabItem } from '../../../components/Tabs';
import { ShowcaseDashedBorder } from '../../../helpers';
import { SectionName } from '../../SectionName';
import { ThemeProvider } from '../../ThemeProvider';
import { Panel } from '../../Panel';

export default {
    title: 'Showcase/Mobile',
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
    const [active, setActive] = useState(0);

    return (
        <Tabs size="s" fixedWidth pilled={pilled} view={view} style={{ marginBottom: 20 }}>
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

export const TabBar = () => (
    <ThemeProvider>
        <SectionName title="Tabbar" description="Нижняя навигационная панель" />
        <Panel style={{ maxWidth: '33.75rem', marginBottom: 0 }}>
            <ShowcaseDashedBorder style={{ paddingBottom: 0, width: 400 }}>
                {variants1.map((Variant, i) => (
                    <Variant key={i} />
                ))}
            </ShowcaseDashedBorder>
        </Panel>
        <SectionName title="Tabbar" description="Нижняя навигационная панель" />
        <Panel style={{ maxWidth: '33.75rem', marginBottom: 0 }}>
            <ShowcaseDashedBorder style={{ paddingBottom: 0, width: 260 }}>
                {variants2.map((Variant, i) => (
                    <Variant key={i} />
                ))}
            </ShowcaseDashedBorder>
        </Panel>
    </ThemeProvider>
);
