import React, { useState, createRef } from "react";
import Navbar from "./Navbar";
import Top from "./Top";
import Comparer from "./Comparer";
import Footer from "./Footer";
import PosterContext from "./PosterContext";
import scrollToElement from "../utlis/utlis";

const App = () => {
  const mainRef = createRef();
  const comparerRef = createRef();

  const [posterClicked, setPosterClicked] = useState({});

  return (
    <div ref={mainRef}>
      <PosterContext.Provider value={{ posterClicked, setPosterClicked }}>
        <Top />
        <div ref={comparerRef}>
          <Navbar
            mainRef={mainRef}
            scrollToMain={() => scrollToElement(comparerRef.current)}
          />
        </div>
        <Comparer scrollToMain={() => scrollToElement(comparerRef.current)} />
      </PosterContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
