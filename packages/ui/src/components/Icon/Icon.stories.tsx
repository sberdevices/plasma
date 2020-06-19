import React from 'react';
import { select } from '@storybook/addon-knobs';

import Icon, { iconSet, IconName } from './Icon';

export default {
    title: 'Icon',
};

export const Default = () => (
    <>
        {Object.keys(iconSet).map((icon) => (
            <div style={{ padding: 10, display: 'inline-block' }} key={icon}>
                <Icon
                    icon={icon as IconName}
                    size={select(
                        'Size',
                        {
                            small: '16',
                            normal: '24',
                            medium: '32',
                            large: '72',
                        },
                        '24',
                    )}
                />
            </div>
        ))}
    </>
);
