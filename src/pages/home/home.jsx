import React, { useState } from "react";
import { Header } from "./header";
import { Images } from "./images";
import { Text } from "./text";
import { Forms } from "./form";

export const Home = () => {
  return (
    <>
      <Header />
      <Images />
      <Text />
      <Forms />
    </>
  );
};
