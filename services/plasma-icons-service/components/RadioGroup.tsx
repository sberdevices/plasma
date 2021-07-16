import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Radiobox } from '@sberdevices/plasma-web';

interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    name: string;
    value: string | number;
    items: Array<{ value: string | number; label: string | number }>;
    onChange: (value: string | number) => void;
    children?: never;
}

const StyledGroup = styled.div`
    display: flex;
`;
const StyledRadiobox = styled(Radiobox)`
    margin-right: 1rem;
`;

export const RadioGroup: FC<RadioGroupProps> = ({ name, value, items, onChange, ...rest }) => {
    return (
        <StyledGroup {...rest}>
            {items.map((item) => (
                <StyledRadiobox
                    key={item.value}
                    name={name}
                    value={item.value}
                    label={item.label}
                    checked={value === item.value}
                    onChange={(e) => e.target.checked && onChange(item.value)}
                />
            ))}
        </StyledGroup>
    );
};
