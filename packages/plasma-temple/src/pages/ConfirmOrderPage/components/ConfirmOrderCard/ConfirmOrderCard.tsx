import React from 'react';
import styled from 'styled-components';
import { Body1, Caption, Card, CardBody, CardContent, Footnote1, Price } from '@sberdevices/plasma-ui';
import { IconChevronRight } from '@sberdevices/plasma-icons';
import { secondary } from '@sberdevices/plasma-tokens';
import { detectDevice } from '@sberdevices/plasma-ui/utils';

import { DeviceFamily } from '../../../../types';

interface ConfirmOrderCardProps {
    title: string;
    content: string;
    price?: number;
    caption?: string;
    onClick?: () => void;
}

const StyledCard = styled(Card)`
    margin-bottom: 1rem;
`;

const StyledCardContent = styled(CardContent)`
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

const StyledCaption = styled(Caption)`
    color: ${secondary};
`;

const mapDeviceToContent: Record<DeviceFamily, React.FC> = {
    sberBox: Body1,
    sberPortal: Footnote1,
    mobile: Footnote1,
};

const Content = mapDeviceToContent[detectDevice()];

const StyledContentContainer = styled.div`
    margin-right: auto;
`;

export const ConfirmOrderCard: React.FC<ConfirmOrderCardProps> = ({ title, content, caption, price = 0, onClick }) => {
    return (
        <StyledCard onClick={onClick} outlined tabIndex={0} data-cy="confirm-order-card">
            <CardBody>
                <StyledCardContent>
                    <StyledContentContainer>
                        <StyledCaption>{title}</StyledCaption>
                        <Content>{content}</Content>
                        {caption && <StyledCaption>{caption}</StyledCaption>}
                    </StyledContentContainer>
                    {price > 0 && <Price>{price}</Price>}
                    <IconChevronRight />
                </StyledCardContent>
            </CardBody>
        </StyledCard>
    );
};
