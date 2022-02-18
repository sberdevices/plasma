import React from 'react';
import styled from 'styled-components';

import { ProductDetails, ProductDetailsProps } from '../ProductDetails';
import { ProductToggleButton, ProductToggleButtonProps } from '../../ProductToggleButton/ProductToggleButton';

export interface ExpandableProductDetailsProps extends ProductDetailsProps {
    /** Количество элементов отображаемых по умолчанию. */
    fixedLines?: number;
    /** Кастомная кнопка для раскрытия/скрытия части деталей. */
    renderToggleButton?: (props: Pick<ProductToggleButtonProps, 'expanded' | 'toggle'>) => React.ReactNode;
}

const StyledProductToggleButton = styled(ProductToggleButton)`
    margin-top: 1.5rem;
`;

export const ExpandableProductDetailsCommon = React.memo<ExpandableProductDetailsProps>(
    ({ details, fixedLines = details.length, renderToggleButton, ...restProps }) => {
        const [expanded, setExpanded] = React.useState(false);

        const toggle = React.useCallback(() => {
            setExpanded((prevState) => !prevState);
        }, []);

        const visibleDetails = expanded ? details : details.slice(0, fixedLines);

        return (
            <>
                <ProductDetails {...restProps} details={visibleDetails} />
                {fixedLines < details.length &&
                    (renderToggleButton ? (
                        renderToggleButton({ expanded, toggle })
                    ) : (
                        <StyledProductToggleButton expanded={expanded} toggle={toggle} />
                    ))}
            </>
        );
    },
);
