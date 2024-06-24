import Link from 'next/link';
import styled from 'styled-components';
import { Card, CardContent } from '@sberdevices/plasma-ui';

const menu = [
    { href: '/test/components/carousel/', title: 'Carousel' },
    { href: '/test/components/checkbox/', title: 'Checkbox' },
    { href: '/test/components/grid/', title: 'Grid' },
    { href: '/test/components/pickers/', title: 'Pickers' },
    { href: '/test/components/radiobox/', title: 'Radiobox' },
    { href: '/test/components/switch/', title: 'Switch' },
    { href: '/test/components/tabs/', title: 'Tabs' },
    { href: '/test/components/text-field/', title: 'TextField' },
    { href: '/test/components/toast/', title: 'Toast' },
    { href: '/test/components/icons/', title: 'Icons' },
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
                    <Card as={StyledCard} outlined scaleOnFocus tabIndex={0}>
                        <CardContent>{item.title}</CardContent>
                    </Card>
                </Link>
            ))}
        </>
    );
}

export function getStaticProps() {
    return {
        props: {
            title: 'Demo Canvas App',
            subtitle: 'Build on Next.js',
            back: false,
        },
    };
}
