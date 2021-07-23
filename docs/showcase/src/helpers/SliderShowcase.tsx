import React from 'react';

import { SliderSingleShowcase as SliderSingle, SliderShowcaseProps as SliderSingleShowcaseProps } from './SliderSingle';
import { SliderDoubleShowcase as SliderDouble, SliderShowcaseProps as SliderDoubleShowcaseProps } from './SliderDouble';
import { ShowcaseComponentGrid } from './Showcase';

const props = {
    min: 0,
    max: 40,
};

const rows = [
    [
        { ...props, defaultValue: 15 } as SliderSingleShowcaseProps,
        { ...props, defaultValue: [5, 30] } as SliderDoubleShowcaseProps,
    ],
    [
        { ...props, defaultValue: 15, disabled: true } as SliderSingleShowcaseProps,
        { ...props, defaultValue: [5, 30], disabled: true } as SliderDoubleShowcaseProps,
    ],
];

const isSingleValueProps = (
    props: SliderSingleShowcaseProps | SliderDoubleShowcaseProps,
): props is SliderSingleShowcaseProps => typeof props.defaultValue === 'number';

interface SliderShowcaseProps {
    onChangeCommitted(value: number | number[]): void;
    onChange(value: number | number[]): void;
}

export const SliderShowcase = ({ onChangeCommitted, onChange }: SliderShowcaseProps) => {
    return (
        <ShowcaseComponentGrid>
            {rows.map((row) =>
                row.map((item, j) => {
                    if (isSingleValueProps(item)) {
                        return (
                            <SliderSingle {...item} key={j} onChangeCommitted={onChangeCommitted} onChange={onChange} />
                        );
                    }
                    return <SliderDouble {...item} key={j} onChangeCommitted={onChangeCommitted} onChange={onChange} />;
                }),
            )}
        </ShowcaseComponentGrid>
    );
};
