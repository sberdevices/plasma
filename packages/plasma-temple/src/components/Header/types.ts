import { NeuHeaderProps as NewHeaderProps } from '@sberdevices/plasma-ui/components/Header/NeuHeader';
import { HeaderProps as OldHeaderProps } from '@sberdevices/plasma-ui';

export type HeaderProps = NewHeaderProps | OldHeaderProps;
export type { NewHeaderProps, OldHeaderProps };

export interface ComponentPropsWithHeader {
    header?: HeaderProps;
}
