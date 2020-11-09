import React from 'react';
import styled from 'styled-components';

import { Button, ButtonProps } from '../Button/Button';
import { Icon } from '../Icon/Icon';

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
            contentRight={<Icon icon="disclosureRight" size="s" />}
        />
    );
};
