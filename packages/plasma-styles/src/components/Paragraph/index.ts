import styled from 'styled-components';
import { paragraph1, paragraph2 } from 'plasma-tokens';

export const ParagraphText1 = styled.div(paragraph1);
export const ParagraphText2 = styled.div(paragraph2);

export const P1 = styled.p({ margin: 0, ...paragraph1 });
export const P = P1;
export const P2 = styled.p({ margin: 0, ...paragraph2 });