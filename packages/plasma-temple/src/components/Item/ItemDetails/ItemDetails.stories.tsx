import React from 'react';

import { ItemDetails } from './ItemDetails';

export default {
    title: 'Item/ItemDetails',
};

const details = [
    {
        title: 'Автор аудиогида',
        content: 'Виталина Пухова',
    },
    {
        title: 'Читает',
        content: 'Алёной Долецкая',
    },
    {
        title: 'Тур займёт',
        content: '2 часа 30 минут',
    },
    {
        title: 'Количество экспонатов',
        content: '25',
    },
    {
        title: 'Страна происхождения',
        content: 'Россия',
    },
    {
        title: 'Возрастные ограничения',
        content: '12+',
    },
];

export const Default = (): React.ReactElement => {
    return (
        <>
            <ItemDetails details={details} />
        </>
    );
};
