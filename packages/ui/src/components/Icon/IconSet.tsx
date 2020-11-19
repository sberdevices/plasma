import React from 'react';
import styled from 'styled-components';

import { Icon, iconSectionsSet, IconProps, IconName as IName } from './Icon';
import { IconSize } from './IconRoot';

const StyledRoot = styled.div`
    display: flex;
    flex-direction: column;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
`;

const IconList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin: 10px;
`;

const IconName = styled.div`
    padding-bottom: 8px;
`;

const SectionName = styled.div`
    font-size: 24px;
    text-align: center;
`;

interface IconSetProps {
    size?: IconSize;
    color?: string;
    exclude?: Array<IName>;
    include?: Array<IName>;
}

export const IconSet: React.FC<IconSetProps> = ({ size, color, exclude, include }) => {
    return (
        <StyledRoot>
            {Object.entries(iconSectionsSet).map(([sectionName, section]) => {
                const filteredIcons = Object.keys(section).filter((icon) => {
                    if (exclude) {
                        return !exclude.includes(icon as IName);
                    }
                    return include ? include.includes(icon as IName) : true;
                });
                return (
                    filteredIcons &&
                    filteredIcons.length > 0 && (
                        <Section>
                            <SectionName>{sectionName}</SectionName>
                            <IconList>
                                {filteredIcons.map((icon) => (
                                    <StyledContainer key={icon}>
                                        <IconName>{icon}</IconName>
                                        <Icon icon={icon as IconProps['icon']} size={size} color={color} />
                                    </StyledContainer>
                                ))}
                            </IconList>
                        </Section>
                    )
                );
            })}
        </StyledRoot>
    );
};
