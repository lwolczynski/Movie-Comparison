import React, { createRef } from "react";
import { Sticky } from "semantic-ui-react";
import Navbar from "./Navbar";
import Top from "./Top";
import Comparer from "./Comparer";
import Footer from "./Footer";

const App = () => {
  const contextRef = createRef();

  return (
    <div ref={contextRef}>
      <Top />
      <Sticky context={contextRef}>
        <Navbar />
      </Sticky>
      <Comparer />
      <Footer />
    </div>
  );
};

export default App;
