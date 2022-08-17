import React from "react";
import { Spin } from "antd";
import { CenterBox, LoadingIcon } from "./Loader.styles";

interface Props {
  loading: boolean;
  color?: string;
  size?: number;
}

const Loader: React.FC<Props> = (props) => {
  const { loading, size, color } = props;
  return loading ? (
    <CenterBox>
      <Spin indicator={<LoadingIcon size={size} color={color} spin />} />
    </CenterBox>
  ) : null;
};

export default Loader;
