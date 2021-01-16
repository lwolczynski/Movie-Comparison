import React from "react";
import { Header, Container, Divider } from "semantic-ui-react";
import Carousel from "./Carousel";

const Top = () => (
  <Container as="header">
    <Divider hidden />
    <Header as="h1" className="brand">
      Pick-A-Mov
    </Header>
    <Carousel />
    <p className="p-landing">
      Can&apos;t decide between films? Compare them and{" "}
      <span className="underline-dotted">pick a mov</span>ie to watch!
    </p>
    <Divider hidden />
  </Container>
);

export default React.memo(Top);
