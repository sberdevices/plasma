import React from 'react';
import styled from 'styled-components';
import { Icon, iconSectionsSet, IconName as IName, IconSize } from '@sberdevices/plasma-icons';
import { Cell } from '@sberdevices/plasma-ui/components/Cell';
import { TextBox } from '@sberdevices/plasma-ui/components/TextBox';
import { Headline3, Body3 } from '@sberdevices/plasma-ui/components/Typography';
import { secondary, accent } from '@sberdevices/plasma-tokens';

import { UIStoryDecorator, InSpacingDecorator } from '../helpers';

export default {
    title: 'Icons/Icon',
    decorators: [UIStoryDecorator, InSpacingDecorator],
};

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
`;
const StyledIcon = styled(Icon)`
    margin: 0.125rem 0.75rem 0.125rem 0;
`;
const StyledHeadline3 = styled(Headline3)`
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`;
const StyledBody3 = styled(Body3)`
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    color: ${secondary};
`;

interface IconSetProps {
    size?: IconSize;
    color?: string;
    exclude?: Array<IName>;
    include?: Array<IName>;
}

const IconSet: React.FC<IconSetProps> = ({ size, color, exclude, include }) => {
    return (
        <StyledGrid>
            {Object.entries(iconSectionsSet)
                .sort()
                .map(([sectionName, section]) => {
                    const filteredIcons = Object.keys(section).filter((icon) => {
                        if (exclude) {
                            return !exclude.includes(icon as IName);
                        }
                        return include ? include.includes(icon as IName) : true;
                    });

                    return (
                        filteredIcons &&
                        filteredIcons.length > 0 && (
                            <div key={sectionName}>
                                <StyledBody3>{sectionName}</StyledBody3>
                                {filteredIcons.map((icon) => (
                                    <Cell
                                        key={icon}
                                        contentLeft={<StyledIcon icon={icon as IName} size={size} color={color} />}
                                        content={<TextBox title={icon} />}
                                    />
                                ))}
                            </div>
                        )
                    );
                })}
        </StyledGrid>
    );
};

export const Default = () => (
    <>
        <StyledHeadline3>Icons XS 16</StyledHeadline3>
        <IconSet size="xs" include={['chevronUp', 'chevronDown', 'disclosureRight']} />
        <StyledHeadline3>Icons S 24</StyledHeadline3>
        <IconSet size="s" exclude={['chevronUp', 'chevronDown']} />
        <StyledHeadline3>Custom Color</StyledHeadline3>
        <IconSet color={accent} exclude={['chevronUp', 'chevronDown', 'storeGamepad', 'storeRemote', 'ticket']} />
    </>
);
