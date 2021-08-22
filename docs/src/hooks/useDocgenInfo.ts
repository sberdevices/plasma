import docgenInfoUI from '@sberdevices/plasma-ui/build-sb/docgenInfo.json';
import docgenInfoWeb from '@sberdevices/plasma-web/build-sb/docgenInfo.json';

interface Prop {
    type: {
        name: string;
    };
    defaultValue?: any;
    description?: string;
    required?: boolean;
}
interface Info {
    props?: Record<string, Prop>;
    description?: string;
}
type DocGenInfo = Record<string, Info>;

export function useDocgenInfo(name: string): Info {
    return (docgenInfoUI as DocGenInfo)[name] || (docgenInfoWeb as DocGenInfo)[name] || {};
}
