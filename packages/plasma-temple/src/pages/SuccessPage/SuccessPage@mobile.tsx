import React from 'react';

import { StateLayoutMobile } from '../../components/StateLayout/StateLayout@mobile';

import { SuccessPageCommon, SuccessPageProps } from './SuccessPage@common';

const platformComponents = {
    StateLayout: StateLayoutMobile,
};

export const SuccessPageMobile: React.FC<SuccessPageProps> = (props) => (
    <SuccessPageCommon {...props} platformComponents={platformComponents} />
);
