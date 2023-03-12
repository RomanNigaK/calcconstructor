import styled from "styled-components";
export const GroupBox = styled.div.attrs<{
  cheked: boolean;
  target: string;
}>((props) => ({
  bsh: props.cheked
    ? "none"
    : "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)",
}))<{
  cheked?: boolean;
  bsh?: string;
  target?: string;
}>`
  width: 240px;
  display: flex;
  flex-wrap: wrap;
  background: #ffffff;
  box-shadow: ${({ bsh }) => bsh};
  border-radius: 4px;
  margin-bottom: 12px;
`;
