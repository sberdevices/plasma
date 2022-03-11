import React from 'react';
import styled from 'styled-components';
import { detectDevice, DeviceKind } from '@sberdevices/plasma-ui/utils';
import { Body1, Footnote1, Headline1, Headline2, TextBox } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

export interface ProductTitleProps {
    /** Заголовок */
    title: string;
    /** Подзаголовок */
    subtitle?: string;
    className?: string;
}

const mapDeviceToTitle: Record<DeviceKind, React.FC> = {
    sberBox: Headline1,
    sberPortal: Headline2,
    mobile: Headline2,
};

export const Title = mapDeviceToTitle[detectDevice()] as typeof Headline1;

const mapDeviceToSubtitle: Record<DeviceKind, React.FC> = {
    sberBox: Body1,
    sberPortal: Body1,
    mobile: Footnote1,
};

export const StyledSubtitle = styled(mapDeviceToSubtitle[detectDevice()])`
    color: ${secondary};
    margin-top: 0.5rem;
`;

/** Заголовок товара на странице товара */
export const ProductTitle: React.FC<ProductTitleProps> = ({ title, subtitle, ...rest }) => (
    <TextBox {...rest}>
        <Title breakWord={false}>{title}</Title>
        {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
    </TextBox>
);
