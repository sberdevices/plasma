import React from 'react';

import { DeviceComponent } from '../DeviceComponent/DeviceComponent';

import { StateLayoutMobile } from './StateLayout@mobile';
import { StateLayoutSberBox } from './StateLayout@sberbox';
import { StateLayoutSberPortal } from './StateLayout@sberportal';
import { StateLayoutCommonProps } from './types';

/**
 * Компонент для отображения какого-либо состояния, например ошибки или успеха
 * По умолчанию предполагается, что состояние отображается на всю страницу,
 * это поведение можно переопределить через `className` установив значение `height`
 */
export const StateLayout: React.FC<StateLayoutCommonProps> = (props) => (
    <DeviceComponent
        sberbox={StateLayoutSberBox}
        sberportal={StateLayoutSberPortal}
        mobile={StateLayoutMobile}
        props={props}
    />
);
