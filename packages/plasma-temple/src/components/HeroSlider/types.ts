import { HeroSlideProps } from '../HeroSlide/HeroSlide';

export interface HeroItemSliderProps extends Pick<HeroSlideProps, 'title' | 'src'> {
    id: string | number;
}

export interface HeroSliderProps {
    time?: number;
    withTimeline?: boolean;
    initialIndex?: number;
    disableAutofocus?: boolean;
    items: HeroItemSliderProps[];
    onItemClick?: (item: HeroItemSliderProps, index: number) => void;
    onActiveItemChange?: (item: HeroItemSliderProps, index: number) => void;
    buttonText: string;
}
