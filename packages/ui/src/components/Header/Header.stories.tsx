import React from 'react';

import { Header, HeaderBack, HeaderLogo, HeaderSubTitle, HeaderTitle } from './Header';

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
