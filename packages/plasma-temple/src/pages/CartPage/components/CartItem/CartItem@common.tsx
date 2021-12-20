import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { IconClose, IconMinus, IconPlus, IconProps } from '@sberdevices/plasma-icons';
import { accent, secondary, white } from '@sberdevices/plasma-tokens';
import { StepperButton, StepperRoot, StepperValue, Price as PlasmaPrice } from '@sberdevices/plasma-ui';

import { Currency } from '../../../../types';
import { useCart } from '../../hooks';
import { useRemoteListener, useThrottledCallback } from '../../../../hooks';
import { CartItem } from '../../types';
import { useGetMutableValue } from '../../../../hooks/useGetMutableValue';
import { THROTTLE_WAIT } from '../../../../hooks/useThrottledCallback';
import { isSberBoxLike } from '../../../../utils';

export interface CartItemProps {
    item: CartItem;
    index: number;
    setActiveIndex?: (index: number) => void;
    onItemClick?: (item: CartItem) => void;
    currency?: Currency;
    focused?: boolean;
    activeButton?: 'left' | 'right';
    imageBackgroundColor?: string;
    setActiveButton?: (button: 'left' | 'right') => void;
}

export const titleMixin = css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const withBackground = (backgroundColor?: string) => backgroundColor !== 'unset' && backgroundColor !== 'transparent';

export const imageContainerMixin = ({ padding }: { padding: number }) => css<{ backgroundColor?: string }>`
    border-radius: 0.75rem;
    overflow: hidden;
    background-color: ${({ backgroundColor }) => backgroundColor ?? white};
    padding: ${({ backgroundColor }) => (withBackground(backgroundColor) ? padding : 0)}rem;
`;

export const priceMixin = css`
    color: ${secondary};
`;

const StyledPresentContainer = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: center;
    margin-left: auto;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    padding: 0.438rem;
    background: var(--plasma-colors-button-secondary);
`;

export const StyledImage = styled.div<{ imageSrc: string }>`
    width: 100%;
    height: 100%;
    background: center no-repeat url(${({ imageSrc }) => imageSrc});
    background-size: contain;
`;

export const PresentIcon: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.342 5.81618C13.5135 4.64466 15.4127 4.64466 16.5839 5.81585L17.9999 7.23058L19.4154 5.81573C20.5879 4.64474 22.4868 4.64474 23.6582 5.81618C24.8298 6.98778 24.8298 8.8883 23.6584 10.0582L22.7793 10.9377H27C28.6563 10.9377 30 12.2814 30 13.9377V14.9377C30 16.2434 29.1649 17.3548 28 17.7668V27.9377C28 29.594 26.6563 30.9377 25 30.9377H11C9.34372 30.9377 8 29.594 8 27.9377V17.7668C6.83505 17.3548 6 16.2434 6 14.9377V13.9377C6 12.2814 7.34372 10.9377 9 10.9377H13.2209L12.3429 10.0593C11.1692 8.88865 11.1692 6.98744 12.342 5.81618ZM16.0148 10.9377H19.9854C20.024 10.8769 20.0698 10.8194 20.1228 10.7664L22.2444 8.64373C22.6344 8.25428 22.6344 7.6208 22.244 7.2304C21.8534 6.83985 21.2203 6.83985 20.829 7.23057L18.707 9.35156C18.3166 9.7418 17.6838 9.74188 17.2933 9.35173L15.17 7.2304C14.7795 6.83992 14.1467 6.83992 13.7558 7.23085C13.365 7.62115 13.365 8.25394 13.7564 8.64435L15.8774 10.7664C15.9304 10.8194 15.9762 10.8769 16.0148 10.9377ZM16.9991 28.9377C15.666 28.9377 13.6663 28.9377 11 28.9377C10.4483 28.9377 10 28.4894 10 27.9377V17.9392H13.4226C13.9734 17.9392 14.42 17.4927 14.42 16.9418C14.42 16.391 13.9734 15.9444 13.4226 15.9444H9.11662L9 15.9377C8.44828 15.9377 8 15.4894 8 14.9377V13.9377C8 13.386 8.44828 12.9377 9 12.9377C12.9579 12.9377 15.6257 12.9377 17.0034 12.9377L16.9991 28.9377ZM19 17.9377H26V27.9377C26 28.4894 25.5517 28.9377 25 28.9377C22.0609 28.9377 20.0604 28.9377 18.9986 28.9377L19 17.9377ZM18.9979 12.9377C20.7761 12.9377 23.4435 12.9377 27 12.9377C27.5517 12.9377 28 13.386 28 13.9377V14.9377C28 15.4894 27.5517 15.9377 27 15.9377H19L18.9979 12.9377Z"
            fill="currentColor"
            fillOpacity="0.96"
        />
    </svg>
);

export const Present: React.FC = () => {
    return (
        <StyledPresentContainer>
            <PresentIcon size="xs" color={accent} />
        </StyledPresentContainer>
    );
};

const StyledStepperRoot = styled(StepperRoot)`
    margin-left: auto;
`;

interface UseCartNavigationProps {
    focused?: boolean;
    activeButton?: 'left' | 'right';
    setActiveButton?: (button: 'left' | 'right') => void;
}

function useCartNavigation({
    focused,
    activeButton,
    setActiveButton,
}: UseCartNavigationProps): [React.RefObject<HTMLButtonElement>, React.RefObject<HTMLButtonElement>] {
    const leftButtonRef = React.useRef<HTMLButtonElement>(null);
    const rightButtonRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!focused) {
            return;
        }

        if (activeButton === 'right' && rightButtonRef.current !== null) {
            rightButtonRef.current.focus();
        }
        if (activeButton === 'left' && leftButtonRef.current !== null) {
            leftButtonRef.current.focus();
        }
    }, [focused, activeButton]);

    useRemoteListener(
        (key) => {
            if (!focused || setActiveButton === undefined) {
                return;
            }

            if (key === 'LEFT' && leftButtonRef.current !== null && document.activeElement === rightButtonRef.current) {
                setActiveButton('left');
            }
            if (key === 'RIGHT' && rightButtonRef.current !== null) {
                setActiveButton('right');
            }
        },
        { disable: !focused },
    );

    return [leftButtonRef, rightButtonRef];
}

const throttleWait = isSberBoxLike() ? THROTTLE_WAIT : 0;

export const QuantityButton: React.FC<{
    id: CartItem['id'];
    quantity: number;
    index: number;
    setActiveIndex?: (index: number) => void;
    className?: string;
    focused?: boolean;
    activeButton?: 'left' | 'right';
    setActiveButton?: (button: 'left' | 'right') => void;
}> = React.memo(({ id, quantity, index, setActiveIndex, className, focused, activeButton, setActiveButton }) => {
    const { removeItem, changeItemQuantity } = useCart();
    const getQuantity = useGetMutableValue(quantity);

    const onPlus = useThrottledCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            event.stopPropagation();
            changeItemQuantity(id, getQuantity() + 1);
        },
        [id, changeItemQuantity, getQuantity],
        throttleWait,
    );

    const isMin = quantity <= 0;

    const onMinus = useThrottledCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            event.stopPropagation();
            const qty = getQuantity();
            if (qty <= 0) {
                removeItem(id);
            } else {
                changeItemQuantity(id, qty - 1);
            }
        },
        [id, removeItem, changeItemQuantity, getQuantity],
        throttleWait,
    );

    const handlerFocus = React.useCallback(() => setActiveIndex?.(index), [index, setActiveIndex]);

    const [leftButtonRef, rightButtonRef] = useCartNavigation({ focused, activeButton, setActiveButton });

    return (
        <StyledStepperRoot className={className}>
            <StepperButton
                icon={isMin ? <IconClose color="inherit" size="xs" /> : <IconMinus color="inherit" size="xs" />}
                view={isMin ? 'critical' : 'secondary'}
                onClick={onMinus}
                onFocus={handlerFocus}
                ref={leftButtonRef}
                data-cy="QuantityButton-minus"
            />
            <StepperValue value={quantity} />
            <StepperButton
                icon={<IconPlus color="inherit" size="xs" />}
                onClick={onPlus}
                onFocus={handlerFocus}
                ref={rightButtonRef}
                data-cy="QuantityButton-plus"
            />
        </StyledStepperRoot>
    );
});

const StyledPresentText = styled.span`
    color: ${accent};
`;

export const Price: React.FC<{ present?: boolean; price: number; currency?: Currency }> = ({
    present,
    price,
    currency,
}) =>
    present ? <StyledPresentText>Подарок</StyledPresentText> : <PlasmaPrice currency={currency}>{price}</PlasmaPrice>;
