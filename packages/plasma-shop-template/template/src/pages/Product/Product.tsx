import React from 'react';
import styled, { css } from 'styled-components';
import {
    Header,
    ProductTitle,
    ProductPrice,
    ProductDescription,
    ProductActionButton,
    ProductCharacteristics,
    ChangeQuantityFn,
    useCart,
    ProductDescriptionProps,
    useAssistantOnSmartAppData,
    useMount,
} from '@sberdevices/plasma-temple';
import { Col, Row, Image } from '@sberdevices/plasma-ui';
import { mediaQuery } from '@sberdevices/plasma-ui/utils';
import { white } from '@sberdevices/plasma-tokens';

import { ScrollableCol } from '../../components/ScrollableCol/ScrollableCol';
import { ActionType, AssistantDataAction, PageComponentProps, ServerAction, ServerActionType } from '../../types';
import { useAssistantState } from '../../hooks/useAssistantState';
import { getProduct } from '../../api/products';

const StyledProductPrice = styled(ProductPrice)`
    margin-top: 16px;
    margin-bottom: 80px;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            margin-bottom: 28px;
        `,
    )}
`;

const StyledProductActionButton = styled(ProductActionButton)`
    margin-bottom: 80px;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            margin-bottom: 64px;
        `,
    )}
`;

const ImageContainer = styled(Row)`
    border-radius: 16px;
    background-color: ${white};
    padding: 74px;
    max-width: 608px;
    margin-left: auto;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            max-width: 330px;
        `,
    )}
`;

const StyledProductCharacteristics = styled(ProductCharacteristics)`
    padding-top: 40px;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            padding-top: 28px;
        `,
    )}
`;

export const Product: React.FC<PageComponentProps<'product'>> = ({
    assistant,
    name: screen,
    state,
    header,
    params,
    changeState,
}) => {
    const {
        id = '',
        name = '',
        price = { value: 0 },
        manufacturer = '',
        complexity = '',
        material = '',
        description,
        picture = '',
    } = state ?? {};
    const { addItem, isOverQuantityLimit, quantityLimit } = useCart();

    const [quantity, setQuantity] = React.useState(1);

    const onChangeQuantity = React.useCallback<ChangeQuantityFn>(
        (plus) => setQuantity((prevQuantity) => prevQuantity + plus),
        [],
    );

    const addToCart = React.useCallback(
        (qty: number) => {
            if (isOverQuantityLimit(qty)) {
                assistant?.sendAction<ServerAction>({
                    type: ServerActionType.CART_QUANTITY_LIMIT,
                    payload: { limit: quantityLimit },
                });
                return;
            }

            addItem({
                id,
                name,
                quantity: qty,
                price: price.value,
                imageSrc: picture,
            });
            assistant?.sendAction<ServerAction>({
                type: ServerActionType.DONE_ADD_TO_CART,
                payload: { quantity: qty },
            });
        },
        [isOverQuantityLimit, addItem, id, name, price.value, picture, assistant, quantityLimit],
    );

    const handleClickAddToCart = React.useCallback(() => addToCart(quantity), [addToCart, quantity]);

    const items = React.useMemo<ProductDescriptionProps['items']>(
        () => [
            {
                title: 'Характеристики',
                content: (
                    <StyledProductCharacteristics
                        characteristics={[
                            {
                                title: 'Производитель',
                                content: manufacturer,
                            },
                            {
                                title: 'Сложность',
                                content: complexity,
                            },
                            {
                                title: 'Материал',
                                content: material,
                            },
                        ]}
                    />
                ),
            },
            {
                title: 'Описание',
                content: description,
            },
        ],
        [complexity, description, manufacturer, material],
    );

    useMount(() => {
        if (!state) {
            getProduct(params.id).then((product) => {
                if (product) {
                    changeState(product);
                }
            });
        }
    });

    useAssistantState({ screen });

    useAssistantOnSmartAppData<AssistantDataAction>((action) => {
        if (action && action.type === ActionType.ADD_TO_CART) {
            addToCart(action.payload.quantity);
        }
    });

    if (!state) {
        return null;
    }

    return (
        <>
            <Header {...header} title="" logo="" />
            <Row>
                <ScrollableCol sizeXL={7} sizeM={4}>
                    <ProductTitle title={name} />
                    <StyledProductPrice price={price.value} />
                    <StyledProductActionButton
                        quantity={quantity}
                        autoFocus
                        withQuantity
                        actionButtonText="Добавить в корзину"
                        onChangeQuantity={onChangeQuantity}
                        onClick={handleClickAddToCart}
                    />
                    <ProductDescription layout="column" items={items} />
                </ScrollableCol>
                <Col sizeXL={5} sizeM={2}>
                    <ImageContainer>
                        <Image base="div" src={picture} ratio="1 / 1" />
                    </ImageContainer>
                </Col>
            </Row>
        </>
    );
};
