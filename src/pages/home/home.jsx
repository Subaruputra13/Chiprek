import React, { useState } from "react";
import { Header } from "./header";
import { Images } from "./images";
import { Text } from "./text";
import { Forms } from "./form";
import { ConfigProvider } from "antd";
import Cookies from "js-cookie";

export const Home = () => {
  // clear token
  Cookies.remove("token");

  return (
    <>
      <Header />
      <Images />
      <Text />
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#E41C1F",
              colorPrimaryHover: "#E41C1F",
              fontWeight: "bold",
            },
          },
        }}
      >
        <Forms />
      </ConfigProvider>
    </>
  );
};
