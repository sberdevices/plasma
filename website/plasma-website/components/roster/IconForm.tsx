import { useState, useContext } from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { Footnote1, Select } from '@sberdevices/plasma-b2c';
import { accent, primary, secondary, tertiary, surfaceSolid02 } from '@sberdevices/plasma-tokens-b2c';

import { Context } from '../../store';
import { capitalize } from '../../utils';

import { RadioGroup } from './RadioGroup';

interface IconFormProps {
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

export const IconForm: FC<IconFormProps> = () => {
    const { state } = useContext(Context);
    const [params, setParams] = useState({
        size: 'xs',
        color: 'inherit',
    });

    if (!state.wizardItemName) {
        return null;
    }

    const iconComponent = `Icon${capitalize(state.wizardItemName)}`;
    const importCode = `import { ${iconComponent} } from '@sberdevices/plasma-icons';`;
    const jsxCode = `<${iconComponent} size="${params.size}" color="${params.color}" />`;

    return (
        <>
            <StyledLabel>Size:</StyledLabel>
            <RadioGroup
                name="size"
                value={params.size}
                items={sizes}
                onChange={(size) => setParams({ ...params, size: size as string })}
            />
            <StyledLabel>Color:</StyledLabel>
            <Select
                value={params.color}
                items={colorsList}
                onChange={(color) => setParams({ ...params, color: color as string })}
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
