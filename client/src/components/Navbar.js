import React from "react";
import { Menu, Container, Image, Sticky } from "semantic-ui-react";

// eslint-disable-next-line react/prop-types
const Navbar = ({ mainRef, comparerRef }) => {
  const handleClick = () => {
    const y =
      // eslint-disable-next-line react/prop-types
      comparerRef.current.getBoundingClientRect().top + window.pageYOffset + 1;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <Sticky context={mainRef} offset={-1}>
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
