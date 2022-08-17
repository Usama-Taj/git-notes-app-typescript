import { LoadingOutlined } from "@ant-design/icons";
import { GREEN } from "constants/index";
import { GridCenter } from "shared-styles/Grid.styles";
import styled from "styled-components";

type LoadingIconProps = {
  size?: number | string;
  color?: string;
};

export const CenterBox = styled(GridCenter)`
  margin: 100px 0;
`;

export const LoadingIcon = styled(LoadingOutlined)<LoadingIconProps>`
  &.anticon {
    font-size: ${({ size }) => size || "40"}px;
    color: ${({ color }) => color || GREEN};
  }
`;
