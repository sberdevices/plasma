import React from 'react';

import { StateLayoutSberBox } from '../../components/StateLayout/StateLayout@sberbox';

import { ErrorPageCommon, ErrorPageProps } from './ErrorPage@common';

const platformComponents = {
    StateLayout: StateLayoutSberBox,
};

export const ErrorPageSberBox: React.FC<ErrorPageProps> = (props) => (
    <ErrorPageCommon {...props} platformComponents={platformComponents} />
);
