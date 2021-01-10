import React from "react";
import { Menu, Container, Image, Sticky } from "semantic-ui-react";

// eslint-disable-next-line react/prop-types
const Navbar = ({ mainRef, scrollToMain }) => (
  <Sticky context={mainRef} offset={-1}>
    <Menu borderless attached>
      <Container className="center">
        <Menu.Item onClick={scrollToMain}>
          <Image src="/images/logo.png" size="medium" />
        </Menu.Item>
      </Container>
    </Menu>
  </Sticky>
);

export default Navbar;
