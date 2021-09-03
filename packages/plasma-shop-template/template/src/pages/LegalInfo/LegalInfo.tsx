import React from 'react';
import { Header } from '@sberdevices/plasma-temple';
import { Row } from '@sberdevices/plasma-ui';

import { Section } from '../../components/Section/Section';
import { PageComponentProps } from '../../types';
import { useAssistantState } from '../../hooks/useAssistantState';
import { ScrollableCol } from '../../components/ScrollableCol/ScrollableCol';

export const LegalInfo: React.FC<PageComponentProps<'legalInfo'>> = ({ name, header }) => {
    useAssistantState({ screen: name });

    return (
        <>
            <Header {...header} title="Юридическая информация" />
            <Row>
                <ScrollableCol sizeXL={12} sizeM={6}>
                    <Section tabIndex={0}>v.2.0 от 31.07.2020</Section>
                    <Section>введено в действие 06.08.2020 </Section>
                    <Section>
                        Настоящее Соглашение регулирует отношения между ООО «...», далее по тексту именуемым «Компания»,
                        с одной стороны, и любым физическим лицом, использующим Сервис, с другой стороны, далее по
                        тексту именуемым «Пользователь», при совместном упоминании именуемыми «Стороны», а по
                        отдельности - «Сторона». Настоящее Соглашение в соответствии со статьей 435 Гражданского кодекса
                        РФ является офертой, адресованной любым физическим лицам, и может быть принято физическим лицом
                        путем присоединения к Соглашению в целом. В отношении формы заключения настоящего Соглашения
                        применяются нормы Гражданского кодекса РФ, регулирующие порядок и условия заключения публичного
                        договора, договора присоединения и оферты.
                    </Section>
                </ScrollableCol>
            </Row>
        </>
    );
};
