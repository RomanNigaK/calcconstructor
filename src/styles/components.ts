import styled from "styled-components";

import ico from "./svg/ico.svg";

export const Ico = styled.img.attrs(() => ({
  src: ico,
}))`
  margin-bottom: 12px;
`;

export const Header = styled.div`
  text-align: center;
  color: #5d5fef;
`;
export const Title = styled.div`
  font-size: 12px;
  text-align: center;
  color: #6b7280;
`;
