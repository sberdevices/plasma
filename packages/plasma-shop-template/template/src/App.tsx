import React from 'react';
import { PlasmaApp, Page, CartButton, CartProvider, OnStartFn, CartState } from '@sberdevices/plasma-temple';

import { AssistantProps, AppHeaderProps, RecipientInfo, PageState, PageParams } from './types';
import { About } from './pages/About/About';
import { Main } from './pages/Main';
import { Catalog } from './pages/Catalog/Catalog';
import { Product } from './pages/Product/Product';
import { Delivery } from './pages/Delivery/Delivery';
import { Contacts } from './pages/Contacts/Contacts';
import { LegalInfo } from './pages/LegalInfo/LegalInfo';
import { Cart } from './pages/Cart/Cart';
import { MakeOrder } from './pages/MakeOrder/MakeOrder';
import { RecipientForm } from './pages/RecipientForm/RecipientForm';
import { recipientInfoInitialValue, RecipientInfoContext } from './pages/MakeOrder/RecipientInfoContext';
import { OrderSuccess } from './pages/OrderSuccess/OrderSuccess';

const assistantParams: AssistantProps = {
    initPhrase: 'запусти магазин',
    token: process.env.REACT_APP_SMARTAPP_TOKEN ?? '',
};

const headerProps: AppHeaderProps = {
    title: 'Шаблон магазина',
    logo: 'logo192.png',
    children: <CartButton screen="cart" />,
};

const onStart: OnStartFn<PageState, PageParams> = async ({ pushScreen }) => {
    pushScreen('main');
};

const initialCartState: CartState = {
    items: [],
    quantity: 0,
    quantityLimit: 30,
    currency: 'rub',
    amount: 0,
};

export const App: React.FC = () => {
    const [recipientInfo, setRecipientInfo] = React.useState(recipientInfoInitialValue);
    const changeRecipientInfo = (info: Partial<RecipientInfo>) => setRecipientInfo({ ...recipientInfo, ...info });

    return (
        <RecipientInfoContext.Provider value={{ ...recipientInfo, changeRecipientInfo }}>
            <CartProvider initialState={initialCartState}>
                <PlasmaApp onStart={onStart} assistantParams={assistantParams} header={headerProps}>
                    <Page name="main" component={Main} ignoreInsets />
                    <Page name="catalog" component={Catalog} ignoreInsets />
                    <Page name="product" component={Product} ignoreInsets />
                    <Page name="about" component={About} ignoreInsets />
                    <Page name="cart" component={Cart} ignoreInsets />
                    <Page name="makeOrder" component={MakeOrder} />
                    <Page name="recipient" component={RecipientForm} />
                    <Page name="orderSuccess" component={OrderSuccess} />
                    <Page name="delivery" component={Delivery} ignoreInsets />
                    <Page name="contacts" component={Contacts} />
                    <Page name="legalInfo" component={LegalInfo} />
                </PlasmaApp>
            </CartProvider>
        </RecipientInfoContext.Provider>
    );
};
