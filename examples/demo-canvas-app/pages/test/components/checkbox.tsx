import styled from 'styled-components';
import { Checkbox, applySpacing, H3 } from '@sberdevices/plasma-ui';

const StyledList = styled.div`
    ${applySpacing({ mb: 20 })};
`;

export default function CheckboxDemo() {
    return (
        <StyledList>
            <Checkbox value="1" label="Checkbox" />
            <Checkbox
                value="2"
                label={
                    <div>
                        Checkbox with <a href="/#">link</a> in label
                    </div>
                }
            />
            <Checkbox
                value="3"
                label="Checkbox"
                description={
                    <div>
                        Checkbox with <a href="/#">link</a> in description
                    </div>
                }
            />
        </StyledList>
    );
}

export function getStaticProps() {
    return {
        props: {
            title: 'Checkbox',
            back: true,
        },
    };
}
