import { v4 as uuid } from 'uuid';

import { Product, Category } from '../types';

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max + 1 - min));
const getRandomArrayItem = <T>(array: Array<T>): T => array[getRandomNumber(0, array.length - 1)];

const categories: Category[] = [...Array(4)].map((_, index) => ({
    id: uuid(),
    name: `Категория ${index + 1}`,
}));

const getProductMock = (index: number): Product => ({
    id: uuid(),
    name: `Товар ${index}`,
    picture: '/images/placeholder.png',
    manufacturer: getRandomArrayItem(['ООО Рога и Копыта', 'ООО Ромашка', 'Неизвестный']),
    complexity: getRandomArrayItem(['высокая', 'средняя', 'низкая']),
    material: getRandomArrayItem(['металл', 'пластик', 'стекло']),
    price: {
        value: getRandomNumber(10, 10000),
        currency: 'RUB',
    },
    description:
        'Современные технологии достигли такого уровня, что современная методология разработки прекрасно подходит для реализации приоритизации разума над эмоциями. Следует отметить, что сложившаяся структура организации говорит о возможностях форм воздействия! Принимая во внимание показатели успешности, разбавленное изрядной долей эмпатии, рациональное мышление способствует подготовке и реализации глубокомысленных рассуждений.',
    category: getRandomArrayItem(categories),
});

const products = [...Array(30)].map((_, index) => getProductMock(index + 1));

export const getProducts = (): Promise<Product[]> => {
    return Promise.resolve(products);
};

export const getPopularProducts = (): Promise<Product[]> => {
    return Promise.resolve([...products].sort(() => 0.5 - Math.random()).slice(0, 7));
};

export const getProduct = async (id: string): Promise<Product | undefined> =>
    Promise.resolve(products.find((item) => item.id === id));

export const getCategories = (): Promise<Category[]> => Promise.resolve(categories);
