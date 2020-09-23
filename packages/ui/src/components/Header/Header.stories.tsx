import React from 'react';

import Story from '../../helpers/Story';
import { Header, HeaderBack, HeaderLogo, HeaderSubTitle, HeaderTitle, HeaderContent } from './Header';
import { HeaderButton } from '../HeaderButton/HeaderButton';
import { Cart } from '../Cart/Cart';

export default {
    title: 'Header',
};

export const Default = () => (
    <Story>
        <Header>
            <HeaderBack />
            <HeaderLogo src="./images/s7-logo.svg" alt="S7 Airlines" />
            <HeaderTitle text="S7 Airlines" />
        </Header>
    </Story>
);

export const WithSubTitle = () => (
    <Story>
        <Header>
            <HeaderBack />
            <HeaderLogo src="./images/s7-logo.svg" alt="Еда" />
            <HeaderTitle text="1 пассажир">
                <HeaderSubTitle text="Шаг 1 из 9" />
            </HeaderTitle>
        </Header>
    </Story>
);

export const WithContent = () => (
    <Story>
        <Header>
            <HeaderBack />
            <HeaderLogo src="./images/s7-logo.svg" alt="Еда" />
            <HeaderTitle text="Корзина"/>
            <HeaderContent>
                <HeaderButton>
                    <Cart amount={8}>2345&nbsp;₽</Cart>
                </HeaderButton>
            </HeaderContent>
        </Header>
    </Story>
);
