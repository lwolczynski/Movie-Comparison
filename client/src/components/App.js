import React, { useState, createRef } from "react";
import Navbar from "./Navbar";
import Top from "./Top";
import Comparer from "./Comparer";
import Footer from "./Footer";
import PosterContext from "./PosterContext";
import scrollToElement from "../utils/utils";

const App = () => {
  const mainRef = createRef();
  const comparerRef = createRef();

  const [posterClicked, setPosterClicked] = useState({});

  return (
    <div id="content" ref={mainRef}>
      <PosterContext.Provider value={{ posterClicked, setPosterClicked }}>
        <Top />
        <div id="sticky-ref" ref={comparerRef}></div>
        <Navbar
          mainRef={mainRef}
          scrollToMain={() => scrollToElement(comparerRef.current)}
        />
        <Comparer scrollToMain={() => scrollToElement(comparerRef.current)} />
      </PosterContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
