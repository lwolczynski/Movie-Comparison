import React from "react";
import { Menu, Container, Image, Sticky } from "semantic-ui-react";

// eslint-disable-next-line react/prop-types
const Navbar = ({ mainRef, comparerRef }) => {
  const handleClick = () => {
    // eslint-disable-next-line react/prop-types
    comparerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Sticky context={mainRef}>
      <Menu borderless attached>
        <Container className="center">
          <Menu.Item onClick={handleClick}>
            <Image src="/images/logo.png" size="medium" />
          </Menu.Item>
        </Container>
      </Menu>
    </Sticky>
  );
};

export default Navbar;
