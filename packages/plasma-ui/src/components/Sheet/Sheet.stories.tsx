import React from 'react';

import { InSpacing } from '../../helpers/StoryDecorators';
import { Button } from '../Button';
import { Body1 } from '../Typography';

import { Sheet } from './Sheet';

export default {
    title: 'Content/Sheet',
    component: Sheet,
    decorators: [InSpacing],
};

export const Default = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Открыть</Button>
            <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <Body1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae tempore vitae porro laboriosam
                    consectetur fugiat assumenda, earum nesciunt. Distinctio minima nesciunt dicta rem quae vel illum ea
                    fugit molestiae dolorem? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos nostrum
                    placeat, neque repudiandae consectetur voluptates soluta et sint eum obcaecati nesciunt ullam,
                    dolorem labore quaerat vero maxime ab ipsa nihil.
                </Body1>
            </Sheet>
        </>
    );
};
