import styled from 'styled-components';

import { headline5 } from '../../../tokens';

export * from '@sberdevices/plasma-core/components/Typography/Headline';

export const Headline5 = styled.div({ overflowWrap: 'break-word', hyphens: 'auto', ...headline5 });

export const H5 = styled.h3({ margin: 0, ...headline5 });
