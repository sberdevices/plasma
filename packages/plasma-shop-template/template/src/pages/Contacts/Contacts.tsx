import React from 'react';
import styled from 'styled-components';
import { Header } from '@sberdevices/plasma-temple';
import { secondary } from '@sberdevices/plasma-tokens';
import { Col, Footnote1, Row } from '@sberdevices/plasma-ui';

import { Section } from '../../components/Section/Section';
import { PageComponentProps } from '../../types';
import { useAssistantState } from '../../hooks/useAssistantState';

const StyledSectionContent = styled(Footnote1)`
    color: ${secondary};
`;

export const Contacts: React.FC<PageComponentProps<'contacts'>> = ({ name, header }) => {
    useAssistantState({ screen: name });

    return (
        <>
            <Header {...header} title="Контакты" />
            <Row>
                <Col sizeXL={6} sizeM={5}>
                    <Section>Мы всегда готовы помочь и будем рады ответить на любой вопрос</Section>
                    <Section title="8-800-000-0000">
                        <StyledSectionContent>Бесплатный звонок по всей России</StyledSectionContent>
                    </Section>
                    <Section title="feedback@example.com">
                        <StyledSectionContent>Жалобы и предложения, администрация</StyledSectionContent>
                    </Section>
                </Col>
            </Row>
        </>
    );
};
