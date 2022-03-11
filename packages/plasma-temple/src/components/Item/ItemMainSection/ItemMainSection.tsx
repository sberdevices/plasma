import React from 'react';
import styled, { css } from 'styled-components';
import { Button, Row, Col, mediaQuery } from '@sberdevices/plasma-ui';
import { IconPlay } from '@sberdevices/plasma-icons/Icons/IconPlay';

import { isSberBoxLike } from '../../../utils/deviceFamily';
import { useFocusOnMount } from '../../../hooks/useFocusOnMount';
import { ProductTitle } from '../../Product';
import { ItemDetails, ItemDetailsItem } from '../ItemDetails/ItemDetails';

export interface ItemMainSectionProps {
    /** Заголовок */
    title: string;
    /** Подзаголовок */
    subtitle?: string;
    /** Детали (характеристики) */
    details?: ItemDetailsItem[];
    /** Контент кнопки */
    actionButtonText?: React.ReactNode;
    /** Колбэк, вызываемый при клике по кнопке */
    onActionButtonClick?: () => void;
    /** Флаг отвечающий за автофокус кнопки */
    actionButtonAutoFocus?: boolean;
    /** Кастомные кнопки, если указаны, то кнопка по умолчанию не используется */
    buttons?: React.ReactNode;
    className?: string;
}

const StyledTitle = styled(Row)`
    margin-bottom: 4rem;

    ${mediaQuery(
        'M',
        2,
    )(css`
        margin-bottom: 2rem;
    `)}

    ${mediaQuery(
        'S',
        1,
    )(css`
        margin-bottom: 2.5rem;
    `)}
`;

const StyledSection = styled.div`
    margin-bottom: 1.875rem;

    ${mediaQuery(
        'M',
        2,
    )(css`
        margin-bottom: 1rem;
    `)}
`;

/** Компонент, отвечающий за отображение основного контента, на странице с информацией о какой-либо сущности */
export const ItemMainSection: React.FC<ItemMainSectionProps> = ({
    title,
    subtitle,
    details,
    actionButtonText,
    onActionButtonClick,
    buttons,
    actionButtonAutoFocus,
    className,
}) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    useFocusOnMount<HTMLButtonElement>(buttonRef, {
        delay: 250,
        prevent: !actionButtonAutoFocus,
    });

    return (
        <div className={className}>
            <StyledTitle>
                <Col sizeXL={7} sizeM={3.5} data-cy="ItemMainSection-title">
                    <ProductTitle title={title} subtitle={subtitle} />
                </Col>
            </StyledTitle>
            {details && (
                <StyledSection>
                    <ItemDetails details={details} />
                </StyledSection>
            )}

            {buttons ?? (
                <StyledSection>
                    {onActionButtonClick && (
                        <Button
                            size={isSberBoxLike() ? 'm' : 's'}
                            onClick={onActionButtonClick}
                            ref={buttonRef}
                            contentLeft={<IconPlay size="s" />}
                            outlined={isSberBoxLike()}
                            text={actionButtonText}
                            tabIndex={0}
                            data-focusable
                            data-cy="ItemMainSection-button"
                        />
                    )}
                </StyledSection>
            )}
        </div>
    );
};
