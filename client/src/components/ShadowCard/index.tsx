import { FC } from "@tarojs/taro";
import React from "react";

const ShadowCard: FC = props => {
  return (
    <div className="card shadow" style={{ width: "100%" }}>
      {props.children}
    </div>
  );
};

export default ShadowCard;
