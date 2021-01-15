import React from "react";
import { Menu, Container, Image, Sticky } from "semantic-ui-react";

const Navbar = ({ mainRef, scrollToMain }) => (
  // Offset -1 to make it sticky below top border
  <Sticky as="nav" context={mainRef} offset={-1}>
    <Menu borderless>
      <Container className="center">
        <Menu.Item onClick={scrollToMain}>
          <Image src="/images/logo.png" size="medium" />
        </Menu.Item>
      </Container>
    </Menu>
  </Sticky>
);

export default Navbar;
