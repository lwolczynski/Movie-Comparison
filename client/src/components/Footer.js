import React from "react";
import { Container, Segment, List } from "semantic-ui-react";

const Footer = () => (
  <Segment inverted vertical textAlign="center">
    <Container>
      <div>© 2021 created by lwolczynski</div>
      <List link inverted divided horizontal size="small">
        <List.Item href="https://github.com/lwolczynski">GitHub</List.Item>
        <List.Item href="#">Portfolio</List.Item>
      </List>
    </Container>
  </Segment>
);

export default Footer;
