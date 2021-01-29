import React from 'react';
import styled from 'styled-components';
import { Icon, iconSectionsSet, IconName as IName, IconSize } from '@sberdevices/plasma-icons';

import { Cell } from '../Cell';
import { Row, Col } from '../Grid';
import { TextBox } from '../TextBox';
import { Headline3 } from '../Typography';

const StyledRow = styled(Row)`
    flex-wrap: wrap;
`;

const StyledIcon = styled(Icon)`
    margin: 0.125rem 0.75rem 0.125rem 0;
`;

const StyledHeading = styled(Headline3)`
    margin: 2rem 0 1rem;
    color: ${({ color }) => color};
`;

interface IconSetProps {
    size?: IconSize;
    color?: string;
    exclude?: Array<IName>;
    include?: Array<IName>;
}

export const IconSet: React.FC<IconSetProps> = ({ size, color, exclude, include }) => {
    return (
        <StyledRow>
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
                        <Col key={sectionName} size={2}>
                            <StyledHeading>{sectionName}</StyledHeading>
                            {filteredIcons.map((icon) => (
                                <Cell
                                    key={icon}
                                    left={<StyledIcon icon={icon as IName} size={size} color={color} />}
                                    content={<TextBox title={icon} />}
                                />
                            ))}
                        </Col>
                    )
                );
            })}
        </StyledRow>
    );
};
