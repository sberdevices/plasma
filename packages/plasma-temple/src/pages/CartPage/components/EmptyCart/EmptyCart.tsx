import React from 'react';
import styled, { css } from 'styled-components';
import { Button, Col, Headline1, Headline2, Row, Image, ButtonProps } from '@sberdevices/plasma-ui';
import { mediaQuery } from '@sberdevices/plasma-ui/utils';

import { deviceFamily } from '../../../../utils/deviceFamily';
import { DeviceFamily } from '../../../../types';
import { withProps } from '../../../../components/hocs/withProps';

interface EmptyCartProps {
    imageSrc?: string;
    onGoToCatalog?: () => void;
}

const mapDeviceToTitle: Record<DeviceFamily, React.FC> = {
    sberBox: Headline1,
    sberPortal: Headline2,
    mobile: Headline2,
};

const StyledTitle = styled(mapDeviceToTitle[deviceFamily])`
    margin-bottom: 2.5rem;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            margin-bottom: 1.75rem;
        `,
    )}
`;

const ButtonSberPortal = withProps<ButtonProps>({ size: 's' })(Button);
const ButtonSberBox = withProps<ButtonProps>({ size: 'm' })(Button);

const mapDeviceButton: Record<DeviceFamily, React.FC<ButtonProps>> = {
    sberBox: ButtonSberBox,
    sberPortal: ButtonSberPortal,
    mobile: ButtonSberPortal,
};

const StyledButton = styled(mapDeviceButton[deviceFamily])`
    margin-right: auto;
`;

const StyledImageContainer = styled.div`
    margin-left: auto;
    width: 630px;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            width: 483.46px;
        `,
    )}
`;

const StyledCol = styled(Col)`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const EmptyCart: React.FC<EmptyCartProps> = ({ imageSrc = '', onGoToCatalog }) => {
    return (
        <Row>
            <StyledCol sizeXL={5} sizeM={3}>
                <StyledTitle>В корзине пусто</StyledTitle>
                {onGoToCatalog && (
                    <StyledButton view="primary" onClick={onGoToCatalog}>
                        Перейти в каталог
                    </StyledButton>
                )}
            </StyledCol>
            <StyledCol sizeXL={6} offsetXL={1} sizeM={3}>
                <StyledImageContainer>
                    <Image base="div" src={imageSrc} ratio="1 / 1" />
                </StyledImageContainer>
            </StyledCol>
        </Row>
    );
};
