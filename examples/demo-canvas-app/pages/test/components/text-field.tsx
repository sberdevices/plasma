import { useState } from 'react';
import styled from 'styled-components';
import { TextField } from '@sberdevices/plasma-ui';
import { withAutoFocus } from '@sberdevices/plasma-ui/hocs';

const StyledWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 1rem;
`;
const StyledGrid = styled.div`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 0.5rem));
    gap: 1rem;
    width: 100%;
`;

const AutoFocusTextField = withAutoFocus(TextField);

export default function TextFieldPage() {
    const [value, setValue] = useState('Value');

    return (
        <StyledWrapper>
            <StyledGrid>
                <AutoFocusTextField
                    autoFocus={true}
                    tabIndex={0}
                    placeholder="Autofocus input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <TextField placeholder="Another input" />
                <TextField placeholder="Another input" />
                <TextField placeholder="Another input" />
            </StyledGrid>
        </StyledWrapper>
    );
}
