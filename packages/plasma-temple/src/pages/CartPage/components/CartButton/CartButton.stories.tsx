import React from 'react';

import { CartItem } from '../../types';
import { CartProvider } from '../CartProvider/CartProvider';

import { CartButton } from './CartButton';

export default {
    title: 'Cart Button',
};

const items: CartItem[] = [
    {
        id: '1',
        name: 'Молоко Parmalat ультрапастеризованное dfdfdfdfss',
        nameDetails: '1л',
        price: 68,
        quantity: 9,
    },
    {
        id: '2',
        name: 'CCC 3x3x3 Sail W',
        price: 68,
        quantity: 2,
        imageSrc:
            'https://s3-alpha-sig.figma.com/img/3c44/70e1/c35afe61e8fa34bc63b982b455c58c1e?Expires=1622419200&Signature=LBFscWR-5zOwbABoL8bhJOdapHhsB~Sti3~4YkBYWE~GEJ57OEzCd~W9ZC1VAHbqTEasSSx8QvEoqqpxdpTOG6dg7LU9VybjQbny9yfI6FTusoz9ZsPBAG9c4H6AWuCodIqcziZdNPpPf3PSt7X545YUEYUNXR~OCfWt3P5MzOYHq4Gm-RFiQ1gPmwLO4RArxdNnfZpQSMa5RV~ogjoLQwb7f8kFlEbfex6YqgqYWYrL2Nev4F~9ZJpLvSTn8fzihWpW2K3RLn8sQFe6iOcDzl5fSsGmk7-L2Q~1CNkMDWjWMf0vwUixg6hb8EZRUrKboN80lVaEfrk3cVC8IOaEdA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
        id: '3',
        name: 'Молоко Parmalat ультрапастеризованное',
        nameDetails: '1л',
        price: 68,
        quantity: 2,
    },
    {
        id: '4',
        name: 'CCC 3x3x3 Sail W',
        price: 68,
        quantity: 2,
        imageSrc:
            'https://s3-alpha-sig.figma.com/img/3c44/70e1/c35afe61e8fa34bc63b982b455c58c1e?Expires=1622419200&Signature=LBFscWR-5zOwbABoL8bhJOdapHhsB~Sti3~4YkBYWE~GEJ57OEzCd~W9ZC1VAHbqTEasSSx8QvEoqqpxdpTOG6dg7LU9VybjQbny9yfI6FTusoz9ZsPBAG9c4H6AWuCodIqcziZdNPpPf3PSt7X545YUEYUNXR~OCfWt3P5MzOYHq4Gm-RFiQ1gPmwLO4RArxdNnfZpQSMa5RV~ogjoLQwb7f8kFlEbfex6YqgqYWYrL2Nev4F~9ZJpLvSTn8fzihWpW2K3RLn8sQFe6iOcDzl5fSsGmk7-L2Q~1CNkMDWjWMf0vwUixg6hb8EZRUrKboN80lVaEfrk3cVC8IOaEdA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
        id: '5',
        name: 'Молоко Parmalat ультрапастеризованное',
        nameDetails: '1л',
        price: 68,
        quantity: 2,
    },
    {
        id: '6',
        name: 'CCC 3x3x3 Sail W',
        price: 68,
        quantity: 2,
        imageSrc:
            'https://s3-alpha-sig.figma.com/img/3c44/70e1/c35afe61e8fa34bc63b982b455c58c1e?Expires=1622419200&Signature=LBFscWR-5zOwbABoL8bhJOdapHhsB~Sti3~4YkBYWE~GEJ57OEzCd~W9ZC1VAHbqTEasSSx8QvEoqqpxdpTOG6dg7LU9VybjQbny9yfI6FTusoz9ZsPBAG9c4H6AWuCodIqcziZdNPpPf3PSt7X545YUEYUNXR~OCfWt3P5MzOYHq4Gm-RFiQ1gPmwLO4RArxdNnfZpQSMa5RV~ogjoLQwb7f8kFlEbfex6YqgqYWYrL2Nev4F~9ZJpLvSTn8fzihWpW2K3RLn8sQFe6iOcDzl5fSsGmk7-L2Q~1CNkMDWjWMf0vwUixg6hb8EZRUrKboN80lVaEfrk3cVC8IOaEdA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
];

export const Default = () => (
    <CartProvider defaultCartItems={items}>
        <CartButton screen="cart" />
    </CartProvider>
);

export const EmptyCart = () => (
    <CartProvider>
        <CartButton screen="cart" />
    </CartProvider>
);

export const WithPrice = () => (
    <CartProvider defaultCartItems={items}>
        <CartButton screen="cart" withPrice />
    </CartProvider>
);
