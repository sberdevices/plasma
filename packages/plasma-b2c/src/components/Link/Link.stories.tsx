import React from 'react';

import { P1 } from '../Typography';

import { Link } from '.';

const props = { href: '/', target: '__blank' };

export const Default = () => (
    <P1>
        Скачайте <Link {...props}>приложение</Link>.
    </P1>
);
