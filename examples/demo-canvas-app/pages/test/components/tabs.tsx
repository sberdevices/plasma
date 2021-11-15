import { useState } from 'react';
import { TabsController } from '@sberdevices/plasma-ui';

const id = 'tabs-example';
const items = [
    { id: 'each', label: 'Каждый' },
    { id: 'hunter', label: 'Охотник' },
    { id: 'wants', label: 'Желает' },
    { id: 'toKnow', label: 'Знать' },
    { id: 'where', label: 'Где' },
    { id: 'is', label: 'Сидит' },
    { id: 'thePheasant', label: 'Фазан' },
];

export default function TabsPage() {
    const [index, setIndex] = useState(0);

    return <TabsController id={id} items={items} index={index} onIndexChange={(i) => setIndex(i)} />;
}

export function getStaticProps() {
    return {
        props: {
            title: 'Tabs',
            back: true,
        },
    };
}
