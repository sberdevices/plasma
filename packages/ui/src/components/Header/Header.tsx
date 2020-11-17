import React from 'react';

import { StylingProps } from '../../types/StylingProps';

import { HeaderRoot } from './HeaderRoot';
import { HeaderBack } from './HeaderBack';
import { HeaderLogo } from './HeaderLogo';
import { HeaderSubtitle } from './HeaderSubtitle';
import { HeaderTitle } from './HeaderTitle';
import { HeaderTitleWrapper } from './HeaderTitleWrapper';
import { HeaderContent } from './HeaderContent';

export interface HeaderProps extends StylingProps {
    back?: boolean;
    logo?: string;
    logoAlt?: string;
    title?: string;
    subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ back, logo, logoAlt, title, subtitle, children, ...rest }) => (
    <HeaderRoot {...rest}>
        {back && <HeaderBack />}
        {logo && <HeaderLogo src={logo} alt={logoAlt} />}
        {title && (
            <HeaderTitleWrapper>
                {title && <HeaderTitle>{title}</HeaderTitle>}
                {subtitle && <HeaderSubtitle>{subtitle}</HeaderSubtitle>}
            </HeaderTitleWrapper>
        )}
        {children && <HeaderContent>{children}</HeaderContent>}
    </HeaderRoot>
);
