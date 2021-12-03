export const fixturesVirtualizedItems = new Array(10)
    .fill([
        { text: 'Each', image: '/320_320_0.jpg' },
        { text: 'Hunter', image: '/320_320_1.jpg' },
        { text: 'Wants', image: '/320_320_2.jpg' },
        { text: 'To know', image: '/320_320_3.jpg' },
        { text: 'Where', image: '/320_320_4.jpg' },
        { text: 'Is', image: '/320_320_5.jpg' },
        { text: 'The peasant', image: '/320_320_6.jpg' },
    ])
    .flat();

export const fixturesVirtualizedItemSizeGenerator = new Array(1000)
    .fill(true)
    .map((_, i) => (i % 3 === 0 ? 320 - 100 : 320 / (i % 3)));
