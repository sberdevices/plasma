import styled from 'styled-components';
import { accent, secondary } from '@sberdevices/plasma-tokens';

export const Outline = styled.div`
    outline: 1px dotted ${secondary};

    & & {
        outline-color: ${accent};
    }
`;
