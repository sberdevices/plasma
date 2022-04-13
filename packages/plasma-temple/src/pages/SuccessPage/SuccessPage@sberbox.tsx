import React from 'react';

import { StateLayoutSberBox } from '../../components/StateLayout/StateLayout@sberbox';

import { SuccessPageCommon, SuccessPageProps } from './SuccessPage@common';

const platformComponents = {
    StateLayout: StateLayoutSberBox,
};

export const SuccessPageSberBox: React.FC<SuccessPageProps> = (props) => (
    <SuccessPageCommon {...props} platformComponents={platformComponents} />
);
