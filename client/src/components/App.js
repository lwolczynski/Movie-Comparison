import React, { createRef } from "react";
import Navbar from "./Navbar";
import Top from "./Top";
import Comparer from "./Comparer";
import Footer from "./Footer";

const App = () => {
  const mainRef = createRef();
  const comparerRef = createRef();

  return (
    <div ref={mainRef}>
      <Top />
      <div ref={comparerRef}>
        <Navbar mainRef={mainRef} comparerRef={comparerRef} />
      </div>
      <Comparer />
      <Footer />
    </div>
  );
};

export default App;
