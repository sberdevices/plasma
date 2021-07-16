import { FC, HTMLAttributes, useState, useMemo } from 'react';
import styled from 'styled-components';
import { Footnote1 } from '@sberdevices/plasma-web';
import { Select } from '@sberdevices/plasma-web/components/Select';
import { accent, primary, secondary, tertiary, surfaceSolid02 } from '@sberdevices/plasma-tokens-web';

import { capitalize } from '../utils';

import { RadioGroup } from './RadioGroup';

interface IconFormProps extends HTMLAttributes<HTMLFormElement> {
    iconName: string;
    children?: never;
}

const StyledLabel = styled(Footnote1)`
    display: block;
    margin: 1rem 0 0.5rem;
    color: ${secondary};
`;
const StyledPre = styled.pre`
    margin: 0.5rem 0 1.75rem;
`;
const StyledCode = styled.code`
    box-sizing: border-box;
    display: block;
    overflow-x: auto;

    width: 100%;
    min-height: 3rem;
    padding: 0.5rem;
    font: 0.75rem/0.875rem 'Source Code Pro', monospace;

    background: ${surfaceSolid02};
    border-radius: 0.25rem;
`;

const sizes = [
    { value: 'xs', label: 'xs' },
    { value: 's', label: 's' },
];
const colors = { inherit: 'inherit', accent, primary, secondary, tertiary };
const colorsList = Object.entries(colors).map(([key, value]) => ({ value, label: key }));

export const IconForm: FC<IconFormProps> = ({ iconName }) => {
    const iconComponent = `Icon${capitalize(iconName)}`;
    const importCode = useMemo(() => `import { ${iconComponent} } from '@sberdevices/plasma-icons';`, [iconName]);
    const [state, setState] = useState({
        size: 'xs',
        color: 'inherit',
    });
    const jsxCode = `<${iconComponent} size="${state.size}" color="${state.color}" />`;

    return (
        <>
            <StyledLabel>Size:</StyledLabel>
            <RadioGroup
                name="size"
                value={state.size}
                items={sizes}
                onChange={(size) => setState({ ...state, size: size as string })}
            />
            <StyledLabel>Color:</StyledLabel>
            <Select
                value={state.color}
                items={colorsList}
                onChange={(color) => setState({ ...state, color: color as string })}
            />
            <StyledLabel>Import:</StyledLabel>
            <StyledPre>
                <StyledCode>{importCode}</StyledCode>
            </StyledPre>
            <StyledLabel>Code:</StyledLabel>
            <StyledPre>
                <StyledCode>{jsxCode}</StyledCode>
            </StyledPre>
        </>
    );
};
