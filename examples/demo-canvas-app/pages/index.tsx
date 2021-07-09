import Link from 'next/link';
import styled from 'styled-components';
import { Card, CardContent } from '@sberdevices/plasma-ui';

const menu = [
    { href: '/test/ui-components/pickers/', title: 'Pickers' },
    { href: '/test/ui-components/switch/', title: 'Switch' },
    { href: '/test/ui-components/text-field/', title: 'TextField' },
    { href: '/test/ui-components/carousel/', title: 'Carousel' },
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
            {menu.map((item, i) => (
                <Link key={`item:${i}`} href={item.href} passHref>
                    {/* @ts-ignore */}
                    <Card as={StyledCard} outlined tabIndex={0}>
                        <CardContent>{item.title}</CardContent>
                    </Card>
                </Link>
            ))}
        </>
    );
}
