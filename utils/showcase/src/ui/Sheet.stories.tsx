import React from 'react';
import { Sheet } from '@sberdevices/plasma-ui/components/Sheet';
import { Body1 } from '@sberdevices/plasma-ui/components/Typography';

import { WebStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'UI/Content/Sheet',
    component: Sheet,
    decorators: [WebStoryDecorator, InSpacingDecorator],
    chromatic: { delay: 700 },
};

export const Default = () => {
    return (
        <Sheet isOpen onClose={() => {}}>
            <Body1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae tempore vitae porro laboriosam consectetur
                fugiat assumenda, earum nesciunt. Distinctio minima nesciunt dicta rem quae vel illum ea fugit molestiae
                dolorem? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos nostrum placeat, neque
                repudiandae consectetur voluptates soluta et sint eum obcaecati nesciunt ullam, dolorem labore quaerat
                vero maxime ab ipsa nihil.
            </Body1>
        </Sheet>
    );
};
