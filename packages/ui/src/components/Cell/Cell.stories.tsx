import React from 'react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Icon } from '../Icon/Icon';
import { Stepper } from '../Stepper/Stepper';

import { Cell, CellRoot, CellContent, CellLeft, CellRight, CellTitle, CellSubTitle, CellDetail } from './Cell';

export default {
    title: 'Cell',
    component: Cell,
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', padding: '40px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Default = () => {
    return (
        <Cell
            header={text('header', '')}
            title={text('title', 'title')}
            subTitle={text('subTitle', '+7 (009) 653-46-78')}
            detail={text('detail', '')}
            icon={<Icon icon="cart" size="l" />}
            centerColLeft={boolean('centerColLeft', false)}
            centerColRight={boolean('centerColRight', true)}
            centerIcon={boolean('centerIcon', true)}
            withBorderBottom={boolean('withBorderBottom', true)}
            actionIconSize={select('actionIconSize', { s: 's', m: 'm', l: 'l' }, 's')}
            onClick={action('onClick')}
        />
    );
};

export const Custom = () => {
    return (
        <CellRoot>
            <CellContent>
                <CellLeft>
                    <CellTitle>{text('title', 'title')}</CellTitle>
                    <CellSubTitle>{text('subTitle', 'subTitle')}</CellSubTitle>
                </CellLeft>
                <CellRight>
                    <CellDetail>{text('detail', 'detail')}</CellDetail>
                    <CellSubTitle>{text('info', 'info')}</CellSubTitle>
                </CellRight>
            </CellContent>
        </CellRoot>
    );
};

export const CellWithStepper = () => {
    return (
        <CellRoot>
            <CellContent>
                <CellLeft>
                    <CellTitle>{text('title', 'title')}</CellTitle>
                    <CellSubTitle>{text('subTitle', 'subTitle')}</CellSubTitle>
                </CellLeft>
                <CellRight>
                    <Stepper value={10} onChange={() => undefined} />
                </CellRight>
            </CellContent>
        </CellRoot>
    );
};
