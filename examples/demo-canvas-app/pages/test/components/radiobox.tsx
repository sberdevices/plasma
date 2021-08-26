import styled from 'styled-components';
import { RadioGroup, Radiobox, applySpacing, H3 } from '@sberdevices/plasma-ui';

const StyledH3 = styled(H3)`
    ${applySpacing({ mb: 10 })};
`;

const StyledRadioGroupList = styled.div`
    display: flex;
    ${applySpacing({ mb: 20 })};
`;

const StyledRadiobox = styled(Radiobox)`
    ${applySpacing({ mt: 0, mr: 20 })};

    &:last-child {
        ${applySpacing({ mt: 0, mr: 0 })};
    }
`;

export default function RadioboxDemo() {
    return (
        <div>
            <RadioGroup aria-labelledby="radiogroup-title-1">
                <StyledH3 id="radiogroup-title-1">Radiogroup 1 title</StyledH3>
                <StyledRadioGroupList>
                    <StyledRadiobox name="radio-1" value="1" label="Radiobox 1" />
                    <StyledRadiobox name="radio-1" value="2" label="Radiobox 2" style={{ margin: 0 }} />
                </StyledRadioGroupList>
            </RadioGroup>
            <RadioGroup aria-labelledby="radiogroup-title-2">
                <StyledH3 id="radiogroup-title-2">Radiogroup 2 title</StyledH3>
                <StyledRadioGroupList>
                    <StyledRadiobox name="radio-2" value="3" disabled label="Radiobox 3" />
                    <StyledRadiobox name="radio-2" value="4" disabled label="Radiobox 4" style={{ margin: 0 }} />
                </StyledRadioGroupList>
            </RadioGroup>
        </div>
    );
}

export function getStaticProps() {
    return {
        props: {
            title: 'Radiobox',
            back: true,
        },
    };
}
