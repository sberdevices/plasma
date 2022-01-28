import React, { FC } from 'react';
import { Button } from '@sberdevices/plasma-web';

/**
 * Ссылка на сторибук компонента.
 */
export const StorybookLink: FC<{ link?: string }> = ({ link }) => {
    if (!link) {
        return null;
    }
    return (
        <Button
            text="Storybook"
            as="a"
            href={link}
            target="_blank"
            size="s"
            style={{ position: 'absolute', top: 0, right: 0 }}
        />
    );
};
