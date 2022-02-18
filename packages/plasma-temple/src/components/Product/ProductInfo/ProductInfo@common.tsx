import React from 'react';
import styled, { css } from 'styled-components';
import {
    detectDevice,
    DeviceKind,
    Footnote1,
    Footnote2,
    Headline3,
    ParagraphText1,
    ParagraphText2,
} from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { useCollapse } from '../../Collapse/hooks/useCollapse';
import { ProductToggleButton, ProductToggleButtonProps } from '../ProductToggleButton/ProductToggleButton';

export interface ProductInfoProps {
    /** Информация (описание) о товаре */
    info: React.ReactNode;
    /** Высота контента в пикселах, отображаемого по умолчанию */
    fixedHeight?: number;
    /** Заголовок */
    title?: React.ReactNode;
    /**
     * Кастомная кнопка для раскрытия/скрытия части деталей.
     */
    renderToggleButton?: (props: Pick<ProductToggleButtonProps, 'expanded' | 'toggle'>) => React.ReactNode;
}

const mapDeviceToTitle: Record<DeviceKind, React.FC> = {
    sberBox: ParagraphText2,
    sberPortal: Footnote2,
    mobile: Headline3,
};

const StyledTitle = styled(mapDeviceToTitle[detectDevice()])`
    margin-bottom: 0.5rem;
`;

const mapDeviceToInfo: Record<DeviceKind, React.FC> = {
    sberBox: ParagraphText1,
    sberPortal: Footnote1,
    mobile: Footnote1,
};

const StyledInfo = styled(mapDeviceToInfo[detectDevice()])<{
    expanded: boolean;
}>`
    hyphens: none;
    ${({ expanded }) =>
        expanded &&
        css`
            color: ${secondary};
        `}
`;

const StyledInfoContainer = styled.div<{
    $height: number | string;
    expanded: boolean;
}>`
    height: ${({ $height }) => (typeof $height === 'string' ? $height : `${$height}px`)};
    transition: height 0.3s linear;
    overflow: hidden;

    ${({ expanded }) =>
        !expanded &&
        css`
            mask-image: linear-gradient(180deg, ${secondary} 76%, rgba(255, 255, 255, 0) 100%);
        `}
`;

const StyledProductToggleButton = styled(ProductToggleButton)`
    margin-top: 1.5rem;
`;

export const ProductInfoCommon = React.memo<ProductInfoProps>(
    ({ fixedHeight = 320, title, info, renderToggleButton }) => {
        const { collapseRef, height, contentHeight, expanded, toggle } = useCollapse(fixedHeight);

        return (
            <>
                {title && <StyledTitle>{title}</StyledTitle>}
                <StyledInfoContainer ref={collapseRef} $height={height} expanded={expanded}>
                    <StyledInfo expanded={expanded}>{info}</StyledInfo>
                </StyledInfoContainer>

                {fixedHeight < contentHeight &&
                    (renderToggleButton ? (
                        renderToggleButton({ expanded, toggle })
                    ) : (
                        <StyledProductToggleButton expanded={expanded} toggle={toggle} />
                    ))}
            </>
        );
    },
);
