import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { InSpacing } from '../../helpers/StoryDecorators';

import { Switch } from '.';

const onChangeAction = action('onChange');
const onFocusAction = action('onFocus');
const onBlurAction = action('onBlur');

export default {
    title: 'Controls/Switch',
    component: Switch,
    decorators: [InSpacing],
};

export const Default = () => {
    const [checked, setChecked] = React.useState(true);

    return (
        <div style={{ maxWidth: '20rem' }}>
            <Switch
                id="agreement"
                name="agreement"
                value="yes"
                label={text('label', 'Label with long text that will be shortened to fit the with')}
                outlined={boolean('outlined', false)}
                focused={boolean('focused', false)}
                checked={checked}
                disabled={boolean('disabled', false)}
                onChange={(event) => {
                    setChecked(event.target.checked);
                    onChangeAction(event.target.value, event.target.checked);
                }}
                onFocus={() => onFocusAction()}
                onBlur={() => onBlurAction()}
            />
        </div>
    );
};
