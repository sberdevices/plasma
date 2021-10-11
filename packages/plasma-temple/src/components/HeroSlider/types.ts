import { HeroSlideProps } from '../HeroSlide/HeroSlide';

export interface HeroItemSliderProps extends Pick<HeroSlideProps, 'title' | 'src'> {
    id: string | number;
}

export interface HeroSliderProps {
    time?: number;
    withTimeline?: boolean;
    items: HeroItemSliderProps[];
    onItemClick?: (item: HeroItemSliderProps) => void;
    onActiveItemChange?: (item: HeroItemSliderProps, index: number) => void;
    buttonText: string;
}
