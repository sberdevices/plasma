import styled from 'styled-components';

import { headline5 } from '../../../tokens';

export { Headline1, Headline2, Headline3, Headline4 } from '@sberdevices/plasma-core';

export const Headline5 = styled.div({ overflowWrap: 'break-word', hyphens: 'auto', ...headline5 });

export const H5 = styled.h3({ margin: 0, ...headline5 });
