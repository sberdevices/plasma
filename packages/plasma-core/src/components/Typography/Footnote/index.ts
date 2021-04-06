import styled from 'styled-components';

import { footnote1, footnote2 } from '../../../tokens';

export const Footnote1 = styled.div({ overflowWrap: 'break-word', hyphens: 'auto', ...footnote1 });
export const Footnote2 = styled.div({ overflowWrap: 'break-word', hyphens: 'auto', ...footnote2 });
