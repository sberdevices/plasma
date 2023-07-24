import { iconSet16, iconSet24, iconSet36, IconRootScalable } from '@sberdevices/plasma-icons';
import { IconSetUnionSize } from '@sberdevices/plasma-icons/scalable/IconRoot';
import { ParagraphText1 } from '@sberdevices/plasma-ui';

export default function IconsPage() {
    const iconSets = {
        ...iconSet16,
        ...iconSet24,
        ...iconSet36,
    };

    return (
        <>
            {Object.keys(iconSets).map((iconName) => (
                <div key={iconName} style={{ display: 'flex', alignItems: 'center' }}>
                    <IconRootScalable size="s" iconName={iconName as IconSetUnionSize} color="inherit" />
                    <ParagraphText1> - {iconName}</ParagraphText1>
                </div>
            ))}
        </>
    );
}

export function getStaticProps() {
    return {
        props: {
            title: 'Icons',
            back: true,
        },
    };
}
