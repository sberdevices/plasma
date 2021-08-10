import { useState } from 'react';
import { Tabs, TabItem } from '@sberdevices/plasma-ui';

const id = 'tabs-example';
const items = [
    { id: 'each', text: 'Каждый' },
    { id: 'hunter', text: 'Охотник' },
    { id: 'wants', text: 'Желает' },
    { id: 'toKnow', text: 'Знать' },
    { id: 'where', text: 'Где' },
    { id: 'is', text: 'Сидит' },
    { id: 'thePheasant', text: 'Фазан' },
];

export default function TabsPage() {
    const [index, setIndex] = useState(0);

    return (
        <Tabs id={id} animated index={index}>
            {items.map((item, i) => (
                <TabItem
                    key={item.id}
                    aria-selected={i === index}
                    aria-controls={id}
                    tabIndex={0}
                    isActive={i === index}
                    onClick={() => setIndex(i)}
                >
                    {item.text}
                </TabItem>
            ))}
        </Tabs>
    );
}

export function getStaticProps() {
    return {
        props: {
            title: 'Tabs',
            back: true,
        },
    };
}
