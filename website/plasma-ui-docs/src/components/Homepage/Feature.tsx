import React, { FC, Fragment } from 'react';
import styled from 'styled-components';
import Link from '@docusaurus/Link';

import { RelativeExternalLink } from '../RelativeExternalLink';

interface FeatureProps {
    Svg: FC<{ alt: string }>;
    title: string;
    links?: Array<{ to: string; text: string; external?: boolean }>;
}

const StyledSvg = styled.svg`
    height: 200px;
    width: 200px;
`;

export const HomepageFeature: FC<FeatureProps> = ({ Svg, title, links }) => {
    return (
        <>
            <div className="text--center">
                <StyledSvg as={Svg} alt={title} />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                {links?.map(({ to, text, external }, i) => {
                    const isHttpLink = /^http/.test(to);
                    const isLastLink = i === links.length - 1;

                    return (
                        <Fragment key={to}>
                            {external && !isHttpLink ? (
                                <RelativeExternalLink to={to}>{text}</RelativeExternalLink>
                            ) : (
                                <Link to={to}>{text}</Link>
                            )}
                            {!isLastLink && ' | '}
                        </Fragment>
                    );
                })}
            </div>
        </>
    );
};
