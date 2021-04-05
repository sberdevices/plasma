import styled from 'styled-components';

import { headline1, headline2, headline3, headline4 } from '../../../tokens';

export const Headline1 = styled.div({ overflowWrap: 'break-word', hyphens: 'auto', ...headline1 });
export const Headline2 = styled.div({ overflowWrap: 'break-word', hyphens: 'auto', ...headline2 });
export const Headline3 = styled.div({ overflowWrap: 'break-word', hyphens: 'auto', ...headline3 });
export const Headline4 = styled.div({ overflowWrap: 'break-word', hyphens: 'auto', ...headline4 });

export const H1 = styled.h1({ margin: 0, ...headline1 });
export const H2 = styled.h2({ margin: 0, ...headline2 });
export const H3 = styled.h3({ margin: 0, ...headline3 });
export const H4 = styled.h3({ margin: 0, ...headline4 });
