import React from 'react';
import { secondary } from '@sberdevices/plasma-tokens';

import { Headline3, Footnote1 } from '../components/Typography';

type Props = {
    title: string;
    description: string;
};

export const SectionName: React.FC<Props> = ({ title, description }) => (
    <>
        <Headline3 style={{ margin: '60px 0 4px 0' }}>{title}</Headline3>
        <Footnote1 style={{ marginBottom: 20, color: secondary }}>{description}</Footnote1>
    </>
);
