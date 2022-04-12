import React from 'react';

import { StateLayoutSberPortal } from '../../components/StateLayout/StateLayout@sberportal';

import { SuccessPageCommon, SuccessPageProps } from './SuccessPage@common';

const platformComponents = {
    StateLayout: StateLayoutSberPortal,
};

export const SuccessPageSberPortal: React.FC<SuccessPageProps> = (props) => (
    <SuccessPageCommon {...props} platformComponents={platformComponents} />
);
