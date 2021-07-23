import React from 'react';
import styled from 'styled-components';
import { Button, Col, Row, TextField } from '@sberdevices/plasma-ui';
import { isSberBox } from '@sberdevices/plasma-ui/utils';

import { Address } from '../../../../types';
import { useForm } from '../../../../hooks/useForm';

interface AddressFieldProps {
    value: Address;
    onChange: (value: Address) => void;
    onSubmit: () => void;
}

const StyledTextField = styled(TextField)`
    margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
    width: 330px;
`;

const required = {
    value: true,
    message: 'Обязательное поле',
};

const validators = {
    city: {
        pattern: {
            value: '[А-яа-я]{2}',
            message: 'Введите значение на русском',
        },
        required,
    },
    street: {
        pattern: {
            value: '[А-яа-я]{2}',
            message: 'Введите значение на русском',
        },
        required,
    },
    house: {
        required,
    },
    entrance: {
        pattern: {
            value: '^[0-9]+$',
            message: 'Только число',
        },
    },
    floor: {
        pattern: {
            value: '^[0-9]+$',
            message: 'Только число',
        },
    },
};

const getErrorStatus = (value?: string | number) => (value ? 'error' : undefined);

export const AddressField: React.FC<AddressFieldProps> = ({ value, onChange, onSubmit }) => {
    const { city, street, house, flat = '', entrance = '', floor = '', comment = '' } = value;
    const formRef = React.useRef<HTMLFormElement>(null);

    const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && formRef.current) {
            const formElements = Array.from(formRef.current.elements) as HTMLElement[];
            const index = Array.from(formElements).indexOf(event.target as HTMLElement);

            if (index > -1) {
                setTimeout(() => {
                    formElements[index + 1].focus();
                }, 150);
            }
        }
    }, []);

    const { errors, handleChange, handleSubmit } = useForm<Address>({
        validators,
        onSubmit,
        onChange,
        initialValues: value,
    });

    return (
        <form ref={formRef}>
            <Row>
                <Col sizeXL={5} sizeM={2}>
                    <StyledTextField
                        label="Город"
                        value={city}
                        onChange={handleChange}
                        name="city"
                        onKeyDown={onKeyDown}
                        status={getErrorStatus(errors?.city)}
                        helperText={errors?.city}
                    />
                </Col>
                <Col sizeXL={7} sizeM={4}>
                    <StyledTextField
                        label="Улица"
                        value={street}
                        onChange={handleChange}
                        name="street"
                        onKeyDown={onKeyDown}
                        status={getErrorStatus(errors?.street)}
                        helperText={errors?.street}
                    />
                </Col>
            </Row>
            <Row>
                <Col sizeXL={3} sizeM={1.5}>
                    <StyledTextField
                        label="Дом"
                        value={house}
                        onChange={handleChange}
                        name="house"
                        onKeyDown={onKeyDown}
                        status={getErrorStatus(errors?.house)}
                        helperText={errors?.house}
                    />
                </Col>
                <Col sizeXL={3} sizeM={1.5}>
                    <StyledTextField
                        label="Квартира, офис"
                        value={flat}
                        onChange={handleChange}
                        name="flat"
                        onKeyDown={onKeyDown}
                    />
                </Col>
                <Col sizeXL={3} sizeM={1.5}>
                    <StyledTextField
                        label="Подъезд"
                        value={entrance}
                        onChange={handleChange}
                        name="entrance"
                        onKeyDown={onKeyDown}
                        status={getErrorStatus(errors?.entrance)}
                        helperText={errors?.entrance}
                    />
                </Col>
                <Col sizeXL={3} sizeM={1.5}>
                    <StyledTextField
                        label="Этаж"
                        value={floor}
                        onChange={handleChange}
                        name="floor"
                        onKeyDown={onKeyDown}
                        status={getErrorStatus(errors?.floor)}
                        helperText={errors?.floor}
                    />
                </Col>
            </Row>
            <StyledTextField
                label="Комментарий"
                value={comment}
                onChange={handleChange}
                name="comment"
                onKeyDown={onKeyDown}
            />
            <StyledButton type="button" onClick={handleSubmit} size={isSberBox() ? 'm' : 's'} view="primary">
                Готово
            </StyledButton>
        </form>
    );
};
