import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { HomepageFeatures, HomepageHeader } from '../components';

export default function Index() {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout title={`${siteConfig.title}`} description="Дизайн-система Plasma">
            <HomepageHeader />
            <HomepageFeatures />
        </Layout>
    );
}
