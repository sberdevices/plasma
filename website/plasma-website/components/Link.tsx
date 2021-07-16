import type { FC, AnchorHTMLAttributes } from 'react';
import NextLink from 'next/link';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    external?: boolean;
}

export const Link: FC<LinkProps> = ({ href, external, ...rest }) => {
    if (!href) {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a {...rest} />;
    }

    if (external) {
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        return <a href={href} target="__blank" {...rest} />;
    }

    return (
        <NextLink href={href} passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a {...rest} />
        </NextLink>
    );
};
