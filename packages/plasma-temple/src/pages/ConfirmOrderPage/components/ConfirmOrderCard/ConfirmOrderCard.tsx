import React from 'react';
import styled from 'styled-components';
import { Body1, Caption, Card, CardBody, CardContent, Footnote1, Price } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';
import { detectDevice } from '@sberdevices/plasma-ui/utils';

import { DeviceFamily } from '../../../../types';

interface ConfirmOrderCardProps {
    title: string;
    content: string;
    price?: number;
    caption?: string;
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

export const ConfirmOrderCard: React.FC<ConfirmOrderCardProps> = ({ title, content, caption, price = 0 }) => {
    return (
        <StyledCard>
            <CardBody>
                <StyledCardContent>
                    <div>
                        <StyledCaption>{title}</StyledCaption>
                        <Content>{content}</Content>
                        {caption && <StyledCaption>{caption}</StyledCaption>}
                    </div>
                    {price > 0 && <Price>{price}</Price>}
                </StyledCardContent>
            </CardBody>
        </StyledCard>
    );
};
