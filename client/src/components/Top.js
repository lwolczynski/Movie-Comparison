import React from "react";
import { Header, Container, Divider } from "semantic-ui-react";

const Top = () => (
  <Container>
    <Divider hidden />
    <Header as="h1" className="brand">
      Pick-a-mov
    </Header>
    <p>
      Cant decide between films? Compare them and{" "}
      <span style={{ textDecorationLine: "underline" }}>pick a mov</span>ie to
      watch!
    </p>
    <Divider hidden />
  </Container>
);

export default Top;
