import React from "react";
import { Spin } from "antd";

export const LoadingComponent = () => {
  return (
    <>
      <div className="loading">
        <Spin size="large" />
      </div>
    </>
  );
};
