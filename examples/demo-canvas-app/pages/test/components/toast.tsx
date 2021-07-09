import { Button, useToast } from '@sberdevices/plasma-ui';
import styled from 'styled-components';

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

const text = 'Toast message!';
const timeout = 3000;
const fade = true;

export default function ToastPage() {
    const { showToast } = useToast();
    console.log(showToast);
    return (
        <StyledWrapper>
            <StyledGrid>
                <Button onClick={() => showToast(text, 'top', timeout, fade)}>Show top</Button>
                <Button onClick={() => showToast(text, 'bottom', timeout, fade)}>Show bottom</Button>
            </StyledGrid>
        </StyledWrapper>
    );
}
