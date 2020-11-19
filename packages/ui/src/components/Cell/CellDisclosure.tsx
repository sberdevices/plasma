import React from 'react';
import styled from 'styled-components';
import { IconDisclosureRight } from '@sberdevices/plasma-icons';

import { Button, ButtonProps } from '../Button';

const DisclosureBtn = styled(Button)`
    left: 1rem;
    margin-left: -1rem;
`;

export const Disclosure = (props: ButtonProps) => {
    return (
        <DisclosureBtn
            {...props}
            size="s"
            view="clear"
            outlined={false}
            contentRight={<IconDisclosureRight size="s" />}
        />
    );
};
