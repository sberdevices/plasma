import React from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

const src = 'https://plasma.sberdevices.ru/ui-storybook/images/320_320_0.jpg';
const title = 'до 230 000 ₽';
const subTitle = 'На 18 месяцев, ставка 13,9%';
const longText = `Канадский актёр, кинопродюсер, и музыкант. Наиболее известен своими ролями в киносериях «Матрица» и
«Джон Уик», а также в фильмах «На гребне волны», «Мой личный штат Айдахо», «Дракула», «Скорость»,
«Джонни-мнемоник», «Адвокат дьявола», «Константин: Повелитель тьмы» и «Короли улиц».`;

describe('plasma-ui: Card', () => {
    const Card = getComponent('Card');
    const CardBody = getComponent('CardBody');
    const CardContent = getComponent('CardContent');
    const CardMedia = getComponent('CardMedia');
    const CardBadge = getComponent('CardBadge');
    const CardPrice = getComponent('CardPrice');
    const TextBox = getComponent('TextBox');
    const Button = getComponent('Button');
    const CardParagraph1 = getComponent('CardParagraph1');
    const CardParagraph2 = getComponent('CardParagraph2');

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <Card style={{ width: '50%' }} scaleOnFocus>
                    <CardBody>
                        <CardMedia src={src} placeholder={src} ratio="1/1" />
                        <CardBadge style={{ left: '1rem', top: '1rem' }} text="2" />
                        <CardContent>
                            <TextBox size="l" title={title} subTitle={subTitle} />
                            <CardPrice price={100} oldPrice={200} count={10} currency="usd" />
                            <Button text="Дайте два" view="primary" size="s" stretch style={{ marginTop: '1em' }} />
                        </CardContent>
                    </CardBody>
                </Card>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_cover', () => {
        mount(
            <CypressTestDecorator>
                <Card style={{ width: '50%' }}>
                    <CardBody>
                        <CardMedia placeholder={src} ratio="1/1" />
                        <CardContent cover coverGradient>
                            <TextBox size="l" title={title} subTitle={subTitle} />
                            <Button text="Дайте два" view="primary" size="s" stretch style={{ marginTop: '1em' }} />
                        </CardContent>
                    </CardBody>
                </Card>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_compact', () => {
        mount(
            <CypressTestDecorator>
                <Card style={{ width: '50%' }}>
                    <CardBody>
                        <CardMedia src={src} placeholder={src} ratio="1/1" />
                        <CardContent compact>
                            <TextBox size="l" title={title} subTitle={subTitle} />
                            <Button text="Дайте два" view="primary" size="s" stretch style={{ marginTop: '1em' }} />
                        </CardContent>
                    </CardBody>
                </Card>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('_disabled', () => {
        mount(
            <CypressTestDecorator>
                <Card style={{ width: '50%' }}>
                    <CardBody>
                        <CardMedia disabled src={src} placeholder={src} ratio="1/1" />
                        <CardBadge style={{ left: '1rem', top: '1rem' }} text="2" />
                        <CardContent disabled>
                            <TextBox size="l" title={title} subTitle={subTitle} />
                            <Button text="Дайте два" view="primary" size="s" stretch style={{ marginTop: '1em' }} />
                        </CardContent>
                    </CardBody>
                </Card>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__typo', () => {
        mount(
            <CypressTestDecorator>
                <Card style={{ width: '50%' }}>
                    <CardBody>
                        <CardMedia src={src} ratio="1/1" />
                        <CardContent cover coverGradient>
                            <CardParagraph1 style={{ marginTop: '0.75rem' }} lines={4}>
                                {longText}
                            </CardParagraph1>
                            <CardParagraph2 style={{ marginTop: '0.75rem' }}>{longText}</CardParagraph2>
                            <Button text="Дайте два" view="primary" size="s" stretch style={{ marginTop: '1em' }} />
                        </CardContent>
                    </CardBody>
                </Card>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('__price', () => {
        mount(
            <CypressTestDecorator>
                <Card style={{ width: '50%' }} scaleOnFocus>
                    <CardBody>
                        <CardMedia src={src} placeholder={src} ratio="1/1" />
                        <CardContent>
                            <CardPrice price={100} oldPrice={200} count={10} currency="usd" />
                            <CardPrice price={200} oldPrice={100} currency="rus" />
                            <Button text="Дайте два" view="primary" size="s" stretch style={{ marginTop: '1em' }} />
                        </CardContent>
                    </CardBody>
                </Card>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
