import React from 'react';

import { StateLayoutSberPortal } from '../../components/StateLayout/StateLayout@sberportal';

import { ErrorPageCommon, ErrorPageProps } from './ErrorPage@common';

const platformComponents = {
    StateLayout: StateLayoutSberPortal,
};

export const ErrorPageSberPortal: React.FC<ErrorPageProps> = (props) => (
    <ErrorPageCommon {...props} platformComponents={platformComponents} />
);
