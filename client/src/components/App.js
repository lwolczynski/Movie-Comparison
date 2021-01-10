import React, { useState, createRef } from "react";
import Navbar from "./Navbar";
import Top from "./Top";
import Comparer from "./Comparer";
import Footer from "./Footer";
import PosterContext from "./PosterContext";

const App = () => {
  const mainRef = createRef();
  const comparerRef = createRef();

  const [posterClicked, setPosterClicked] = useState({});

  return (
    <div ref={mainRef}>
      <PosterContext.Provider value={{ posterClicked, setPosterClicked }}>
        <Top />
        <div ref={comparerRef}>
          <Navbar mainRef={mainRef} comparerRef={comparerRef} />
        </div>
        <Comparer comparerRef={comparerRef} />
      </PosterContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
