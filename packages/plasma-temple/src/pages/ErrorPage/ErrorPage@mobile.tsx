import React from 'react';

import { StateLayoutMobile } from '../../components/StateLayout/StateLayout@mobile';

import { ErrorPageCommon, ErrorPageProps } from './ErrorPage@common';

const platformComponents = {
    StateLayout: StateLayoutMobile,
};

export const ErrorPageMobile: React.FC<ErrorPageProps> = (props) => (
    <ErrorPageCommon {...props} platformComponents={platformComponents} />
);
