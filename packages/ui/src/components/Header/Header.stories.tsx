import React from 'react';

import { HeaderButton } from '../HeaderButton/HeaderButton';
import { Cart } from '../Cart/Cart';

import { Header, HeaderBack, HeaderLogo, HeaderSubTitle, HeaderTitle, HeaderContent } from './Header';

export default {
    title: 'Header',
};

export const Default = () => (
    <Header>
        <HeaderBack />
        <HeaderLogo src="./images/s7-logo.svg" alt="S7 Airlines" />
        <HeaderTitle text="S7 Airlines" />
    </Header>
);

export const WithSubTitle = () => (
    <Header>
        <HeaderBack />
        <HeaderLogo src="./images/s7-logo.svg" alt="Еда" />
        <HeaderTitle text="1 пассажир">
            <HeaderSubTitle text="Шаг 1 из 9" />
        </HeaderTitle>
    </Header>
);

export const WithContent = () => (
    <Header>
        <HeaderBack />
        <HeaderLogo src="./images/s7-logo.svg" alt="Еда" />
        <HeaderTitle text="Корзина" />
        <HeaderContent>
            <HeaderButton>
                <Cart amount={8}>2345&nbsp;₽</Cart>
            </HeaderButton>
        </HeaderContent>
    </Header>
);
