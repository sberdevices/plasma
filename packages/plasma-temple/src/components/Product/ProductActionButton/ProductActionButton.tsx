import React from 'react';
import styled, { css } from 'styled-components';
import { IconMinus, IconPlus } from '@sberdevices/plasma-icons';
import { Col, Body2, Button, Row, mediaQuery } from '@sberdevices/plasma-ui';

import { useMount, useThrottledCallback } from '../../../hooks';
import { useGetMutableValue } from '../../../hooks/useGetMutableValue';
import { THROTTLE_WAIT } from '../../../hooks/useThrottledCallback';

export type ChangeQuantityFn = (plus: 1 | -1) => void;

interface QuantityProps {
    withQuantity: true;
    quantity: number;
    onChangeQuantity: ChangeQuantityFn;
}

interface NoQuantityProps {
    withQuantity?: false;
    quantity?: never;
    onChangeQuantity?: never;
}

type ProductActionButtonProps = {
    actionButtonText: string;
    contentRight?: string;
    autoFocus?: boolean;
    className?: string;
    disabled?: boolean;
    onClick: () => void;
} & (QuantityProps | NoQuantityProps);

const StyledRow = styled(Row)`
    align-items: center;
`;

const StyledContentRight = styled.span`
    opacity: 0.6;
    white-space: pre-wrap;
`;

const StyledActionButtonCol = styled(Col)`
    ${mediaQuery(
        'S',
        1,
    )(
        css`
            flex: 1;
        `,
    )}
`;

export const ProductActionButton: React.FC<ProductActionButtonProps> = React.memo(
    ({
        autoFocus,
        actionButtonText,
        contentRight,
        quantity = 0,
        withQuantity,
        disabled,
        onChangeQuantity,
        onClick,
        className,
    }) => {
        const buttonRef = React.useRef<HTMLButtonElement>(null);

        const getQuantity = useGetMutableValue(quantity);

        useMount(() => {
            const timer = setTimeout(() => {
                if (autoFocus && buttonRef.current) {
                    buttonRef.current.focus({ preventScroll: true });
                }
            }, THROTTLE_WAIT);

            return () => clearTimeout(timer);
        });

        const onDecreaseQuantity = useThrottledCallback(() => {
            if (getQuantity() > 0) {
                onChangeQuantity?.(-1);
            }
        }, [getQuantity, onChangeQuantity]);

        const onIncreaseQuantity = useThrottledCallback(() => onChangeQuantity?.(1), [onChangeQuantity]);

        const handleClick = useThrottledCallback(() => onClick(), [onClick]);

        return (
            <StyledRow className={className}>
                {withQuantity && (
                    <>
                        <Col>
                            <Button size="s" square onClick={onDecreaseQuantity}>
                                <IconMinus size="xs" />
                            </Button>
                        </Col>
                        <Col>
                            <Body2>{quantity}</Body2>
                        </Col>
                        <Col>
                            <Button size="s" square onClick={onIncreaseQuantity}>
                                <IconPlus size="xs" />
                            </Button>
                        </Col>
                    </>
                )}
                <StyledActionButtonCol>
                    <Button
                        ref={buttonRef}
                        size="s"
                        view="primary"
                        disabled={disabled !== undefined ? disabled : withQuantity && !quantity}
                        onClick={handleClick}
                        stretch
                    >
                        {actionButtonText}
                        {contentRight && <StyledContentRight>{` ${contentRight}`}</StyledContentRight>}
                    </Button>
                </StyledActionButtonCol>
            </StyledRow>
        );
    },
);
