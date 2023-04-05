import { Container } from "@chakra-ui/react";
import React from "react";
import Nav from "../header/header";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <Container maxW={"1400px"}>{children}</Container>
    </>
  );
};

export default Layout;
