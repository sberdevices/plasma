import React from 'react';
import styled from 'styled-components';
import { Cell } from '@sberdevices/ui/components/Cell';
import { Footnote1 } from '@sberdevices/ui/components/Typography';
import { Marquee } from '@sberdevices/ui/components/Marquee';

import { UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Content/Marquee',
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const MarqueeWrapper = styled(Cell)`
    width: 18rem;
    overflow: hidden;
`;

export const Default = () => {
    return (
        <MarqueeWrapper
            content={
                <Marquee>
                    <Footnote1>Очень очень длинный текст</Footnote1>
                </Marquee>
            }
        />
    );
};
