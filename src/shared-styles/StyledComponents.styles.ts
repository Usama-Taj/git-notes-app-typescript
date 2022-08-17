import { BLUE } from "constants/index";
import { Divider as AntDivider } from "antd";
import styled from "styled-components";

export const SpacedSpan = styled.span`
  margin: 0px 10px;
  color: ${BLUE};
`;

export const Divider = styled(AntDivider)`
  &.ant-divider-horizontal.ant-divider-with-text::before,
  &.ant-divider-horizontal.ant-divider-with-text::after {
    top: 0;
  }
`;
