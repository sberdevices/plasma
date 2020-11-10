import React from 'react';
import styled from 'styled-components';
import { surfaceLiquid03 } from '@sberdevices/plasma-tokens';

import { Cell, CellProps, CellContentWrapper } from './Cell';

const ListItem = styled.li`
    list-style: none;

    ${CellContentWrapper} {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    &:not(:last-child) ${CellContentWrapper} {
        /* stylelint-disable-next-line number-max-precision */
        border-bottom: 0.0625rem solid ${surfaceLiquid03};
    }
`;

export const CellListItem = (p: CellProps & React.HTMLAttributes<HTMLDivElement>) => <Cell as={ListItem} {...p} />;
