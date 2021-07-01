import { useState } from 'react';
import styled from 'styled-components';
import { Switch } from '@sberdevices/plasma-ui';

const StyledWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;

    margin: 0 auto;
    max-width: 20rem;
    height: 100%;
    padding: 1rem;
`;
const StyledGrid = styled.div`
    box-sizing: border-box;
    display: grid;
    gap: 1rem;
    width: 100%;
`;

export default function PickersPage() {
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);

    return (
        <StyledWrapper>
            <StyledGrid>
                <Switch label="Rare" tabIndex={0} checked={checked1} onChange={(e) => setChecked1(e.target.checked)} />
                <Switch
                    label="Medium"
                    tabIndex={0}
                    checked={checked2}
                    onChange={(e) => setChecked2(e.target.checked)}
                />
                <Switch label="Medium well" tabIndex={0} disabled />
                <Switch label="Well done" tabIndex={0} disabled />
            </StyledGrid>
        </StyledWrapper>
    );
}
