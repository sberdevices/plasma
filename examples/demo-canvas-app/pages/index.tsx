import Link from 'next/link';
import styled from 'styled-components';
// import { Card, CardContent } from '@sberdevices/plasma-ui';
import { Button } from '@sberdevices/plasma-ui/components/Button/Button';

const menu = [
    { href: '/test/components/pickers/', title: 'Pickers' },
    { href: '/test/components/switch/', title: 'Switch' },
    { href: '/test/components/text-field/', title: 'TextField' },
    { href: '/test/components/toast/', title: 'Toast' },
];

const StyledCard = styled.a`
    display: block;
    margin-top: 1rem;
    color: inherit;
    text-decoration: none;
`;

export default function Home() {
    return (
        <>
            <Button>Button</Button>
        </>
    );
}
