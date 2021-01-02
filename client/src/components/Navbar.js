import React from "react";
import { Menu, Container, Image } from "semantic-ui-react";

const Navbar = () => (
  <Menu borderless attached>
    <Container>
      <Menu.Item>
        <Image src="/images/pickamov.png" size="medium" />
      </Menu.Item>
    </Container>
  </Menu>
);

export default Navbar;
