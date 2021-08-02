import { FC } from 'react';
import styled from 'styled-components';
import { Row, Col, Card, CardBody, CardContent, TextBox } from '@sberdevices/plasma-ui';

const StyledCard = styled(Card)`
    margin-bottom: calc(var(--plasma-grid-gutter) * 2);
`;

const DemonstrationCard: FC<{ title: string; subTitle: string }> = ({ title, subTitle }) => (
    <StyledCard scaleOnFocus tabIndex={0}>
        <CardBody>
            <CardContent>
                <TextBox title={title} subTitle={subTitle} />
            </CardContent>
        </CardBody>
    </StyledCard>
);

const items = [
    {
        size: 4,
        title: 'In general, the rectangular matrix justifies the restrictions',
        subTitle: 'we will leave further calculations for the students in simple homework,',
    },
    {
        size: 2,
        title: 'Differential calculus',
        subTitle: 'However, not everyone',
    },
    {
        size: 6,
        title: 'Ostrogradsky theorem is a multidimensional of course, monotonic',
        subTitle: 'discontinuity of a function, and instead of 13',
    },
    {
        size: 8,
        title: 'The divergence of the field is wasteful Common Divisor (GCD)',
        subTitle: 'True, you can take any other constant multiplication',
    },
    {
        size: 4,
        title: 'Concentrating on a larger',
        subTitle: 'some experts note that knows that the Gauss',
    },
    {
        size: 3,
        title: 'Two vectors (scalar)',
        subTitle: 'covers an increasing integral',
    },
    {
        size: 3,
        title: 'Over the surface',
        subTitle: 'which was what was required to be proved',
    },
    {
        size: 3,
        title: 'The proper subset',
        subTitle: 'the trigonometric integral',
    },
    {
        size: 3,
        title: 'Changes',
        subTitle: 'over the infinite region.',
    },
];

export default function PickersPage() {
    return (
        <Row>
            {items.map((item, i) => (
                <Col key={`item:${i}`} size={item.size as 1}>
                    <DemonstrationCard title={item.title} subTitle={item.subTitle} />
                </Col>
            ))}
        </Row>
    );
}

export function getStaticProps() {
    return {
        props: {
            title: 'Grid',
            back: true,
        },
    };
}
