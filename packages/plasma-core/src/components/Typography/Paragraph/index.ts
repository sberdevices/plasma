import styled from 'styled-components';

import { paragraph1, paragraph2 } from '../../../tokens';

export const ParagraphText1 = styled.div({ overflowWrap: 'break-word', hyphens: 'auto', ...paragraph1 });
export const ParagraphText2 = styled.div({ overflowWrap: 'break-word', hyphens: 'auto', ...paragraph2 });

export const P1 = styled.p({ margin: 0, ...paragraph1 });
export const P = P1;
export const P2 = styled.p({ margin: 0, ...paragraph2 });
