import React, { FC } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const RelativeExternalLink: FC<{ to: string }> = ({ to, children }) => {
    const {
        siteConfig: { url },
    } = useDocusaurusContext();
    const unescapedUrl = url.replace(/\/$/, '');
    const href = `${unescapedUrl}${useBaseUrl(to)}`;

    return <Link to={href}>{children}</Link>;
};
