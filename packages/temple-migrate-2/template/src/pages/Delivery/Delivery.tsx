import React from 'react';
import { Header } from '@sberdevices/plasma-temple';
import { Row } from '@sberdevices/plasma-ui';
import styled from 'styled-components';

import { Section } from '../../components/Section/Section';
import { PageComponentProps } from '../../types';
import { useAssistantState } from '../../hooks/useAssistantState';
import { ScrollableCol } from '../../components/ScrollableCol/ScrollableCol';

const StyledSpan = styled.span`
    outline: none;
`;

export const Delivery: React.FC<PageComponentProps<'delivery'>> = ({ name, header }) => {
    useAssistantState({ screen: name });

    return (
        <>
            <Header {...header} title="Доставка" />
            <Row>
                <ScrollableCol sizeXL={6} sizeM={5}>
                    <Section>
                        <StyledSpan tabIndex={0}>
                            Мы заинтересованы в том, чтобы доставить Ваш заказ в максимально сжатые сроки. Доставляем 7
                            дней в неделю и 24 часа в сутки.
                        </StyledSpan>
                    </Section>
                    <Section title="Доставка до адреса по линиям метро">
                        Самый лучший, надежный, качественный, экономичный и моментальный способ оформления заказа - это
                        позвонить нам по телефону 8 (800) 000-00-00 с 9:00 до 20:00. А стоимость самой лучшей доставки в
                        Москве - всего от 100 рублей. Для Московской области действует ограничение по удаленности - не
                        более 10 минут от метро, а далее с разумной доплатой (стоимость рассматривается индивидуально в
                        каждом конкретном случае и зависит от дальности расположения и удобства проезда).
                    </Section>
                    <Section title="Доставка в другие места">
                        Самый лучший, надежный, качественный, экономичный и моментальный способ оформления заказа - это
                        позвонить нам по 8 (800) 800-00-00. А стоимость самой лучшей доставки в Москве - всего от 100
                        рублей.
                    </Section>
                </ScrollableCol>
            </Row>
        </>
    );
};
