import React from 'react';

import { Cart } from '../Cart';

import { Header, HeaderBack, HeaderLogo, HeaderSubTitle, HeaderTitle, HeaderContent, HeaderButton } from './Header';

export default {
    title: 'Header',
};

export const Default = () => (
    <Header>
        <HeaderBack />
        <HeaderLogo src="./images/logo.png" alt="Logo" />
        <HeaderTitle text="Logo" />
    </Header>
);

export const WithSubTitle = () => (
    <Header>
        <HeaderBack />
        <HeaderLogo src="./images/logo.png" alt="Logo" />
        <HeaderTitle text="1 пассажир">
            <HeaderSubTitle text="Шаг 1 из 9" />
        </HeaderTitle>
    </Header>
);

export const WithContent = () => (
    <Header>
        <HeaderBack />
        <HeaderLogo src="./images/logo.png" alt="Logo" />
        <HeaderTitle text="Корзина" />
        <HeaderContent>
            <HeaderButton>
                <Cart amount={8}>2345&nbsp;₽</Cart>
            </HeaderButton>
        </HeaderContent>
    </Header>
);
