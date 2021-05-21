import React from 'react';
import { action } from '@storybook/addon-actions';

import { EmptyCart } from './EmptyCart';

export default {
    title: 'Pages/EmptyCart',
};

const imageSrc =
    'https://s3-alpha-sig.figma.com/img/e31a/3985/e296c0fe873f8d9dcb30b16f665c9f08?Expires=1623024000&Signature=Hd27xDiwogxvk2mQxI~uCP30MjJTenkv9fegf85Zmfy4vmvvHhXXdBKBoVcDsfZ6iDD3bTB8krgZrZ~C1UDWVwJl3P8DTCYiTVJKvqjqOwyhJkS7EwZ9H2Zn07-zQ~y5rZgKnFHcGRCdwCDTk~rckekP4u-DqyjhejegV9S~XhZY8DmJJlD0RH0uu3ChF4~AC8S-wrlnekiQ45RU~LEodf0R83PPyeGOuU6Rzuj6UsumHemoLOxLj6IitvF~fI7vCGHEn5IijjDCyPPPJl0K6daN5vb4qd1yLa~K03QifmxaVDL8n6sLDWDM4CnQt8S7eR9EMzdi1swOJtIcinH2Bw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';

export const Default = (): React.ReactElement => {
    return <EmptyCart imageSrc={imageSrc} onGoToCatalog={action('onGoToCatalog')} />;
};
