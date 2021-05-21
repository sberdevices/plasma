import React from 'react';
import styled from 'styled-components';
import { IconMinus, IconPlus } from '@sberdevices/plasma-icons';
import { Col, ActionButton, Body2, Button, Row } from '@sberdevices/plasma-ui';

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
    onClick: () => void;
} & (QuantityProps | NoQuantityProps);

const StyledRow = styled(Row)`
    align-items: center;
`;

const StyledContentRight = styled.span`
    opacity: 0.6;
    white-space: pre-wrap;
`;

export const ProductActionButton: React.FC<ProductActionButtonProps> = React.memo(
    ({
        autoFocus,
        actionButtonText,
        contentRight,
        quantity = 0,
        withQuantity,
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

        return (
            <StyledRow className={className}>
                {withQuantity && (
                    <>
                        <Col>
                            <ActionButton size="l" onClick={onDecreaseQuantity}>
                                <IconMinus size="xs" />
                            </ActionButton>
                        </Col>
                        <Col>
                            <Body2>{quantity}</Body2>
                        </Col>
                        <Col>
                            <ActionButton size="l" onClick={onIncreaseQuantity}>
                                <IconPlus size="xs" />
                            </ActionButton>
                        </Col>
                    </>
                )}
                <Col>
                    <Button
                        ref={buttonRef}
                        size="s"
                        view="primary"
                        disabled={withQuantity && !quantity}
                        onClick={onClick}
                    >
                        {actionButtonText}
                        {contentRight && <StyledContentRight>{` ${contentRight}`}</StyledContentRight>}
                    </Button>
                </Col>
            </StyledRow>
        );
    },
);
