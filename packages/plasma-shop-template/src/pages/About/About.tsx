import React from 'react';
import styled, { css } from 'styled-components';
import { ParagraphText1, Col, Image, Button as PlasmaButton, Row } from '@sberdevices/plasma-ui';
import { Header } from '@sberdevices/plasma-temple';
import { mediaQuery } from '@sberdevices/plasma-ui/utils';

import { PageComponentProps } from '../../types';
import { Section } from '../../components/Section/Section';
import { Headline } from '../../components/Headline/Headline';
import { ScrollableCol } from '../../components/ScrollableCol/ScrollableCol';
import { useAssistantState } from '../../hooks/useAssistantState';

const StyledImageContainer = styled.div`
    margin-left: auto;
    width: 628px;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            width: 408px;
            margin-left: -5rem;
        `,
    )}
`;

const StyledParagraph = styled(ParagraphText1)`
    ${mediaQuery(
        'M',
        2,
    )(
        css`
            max-width: 694px;
        `,
    )}
`;

const StyledButtonGroup = styled(Row)`
    margin-top: 2rem;
    margin-bottom: 1.5rem;
`;

const Button: React.FC<
    React.PropsWithChildren<{
        onClick: () => void;
    }>
> = ({ children, onClick }) => (
    <Col>
        <PlasmaButton size="s" onClick={onClick}>
            {children}
        </PlasmaButton>
    </Col>
);

export const About: React.FC<PageComponentProps<'about'>> = ({ name, header, pushScreen }) => {
    const onClick = React.useCallback((...value: Parameters<typeof pushScreen>) => pushScreen(...value), [pushScreen]);

    useAssistantState({ screen: name });

    return (
        <>
            <Header {...header} title="О магазине" />
            <Row>
                <ScrollableCol sizeXL={7} sizeM={4}>
                    <Headline>Мы – Шаболон Магазина!</Headline>
                    <StyledParagraph>
                        Мы не просто магазин товаров и прочего добра. Мы - команда единомышленников, ставящая перед
                        собой масштабную задачу - дарить людям чувство радости и воодушевления. Мы работаем для Вас 24
                        часа 7 дней в неделю.
                    </StyledParagraph>
                    <StyledButtonGroup>
                        <Button onClick={() => onClick('delivery')}>Доставка</Button>
                        <Button onClick={() => onClick('contacts')}>Контакты</Button>
                    </StyledButtonGroup>
                    <Section title="Юридические данные">
                        Тип и данные предпринимателя: ИП Иванов Иван Иванович (ИНН 000000000000, Россия, Москва, ул. Без
                        имени, д.1, кв 1)
                    </Section>
                    <Button onClick={() => onClick('legalInfo')}>Юридическая информация</Button>
                </ScrollableCol>
                <Col sizeXL={5} sizeM={1} offsetM={1}>
                    <StyledImageContainer>
                        <Image base="div" src="/images/placeholder.png" ratio="1 / 1" />
                    </StyledImageContainer>
                </Col>
            </Row>
        </>
    );
};
