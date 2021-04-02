import styled, { CSSObject } from 'styled-components';
import { underline } from '@sberdevices/plasma-tokens';

export const Underline = styled.div({ overflowWrap: 'break-word', hyphens: 'auto', ...underline } as CSSObject);
