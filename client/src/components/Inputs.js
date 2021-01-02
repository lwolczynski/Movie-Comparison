import React, { useState } from "react";
import { Container, Segment, Button } from "semantic-ui-react";
import Autocomplete from "./Autocomplete";

// eslint-disable-next-line react/prop-types
const Inputs = ({ getNextKey, changeMovie, removeMovie }) => {
  const [keys, setKeys] = useState([0, 1]);

  const handleAddClick = () => {
    const nextKey = getNextKey();
    setKeys([...keys, nextKey]);
  };

  const handleRemoveClick = (keyToRemove) => {
    setKeys(keys.filter((key) => key !== keyToRemove));
    removeMovie(keyToRemove);
  };

  const renderInputs = () =>
    keys.map((key) => (
      <>
        <Autocomplete changeMovie={changeMovie} key={key} explicitKey={key} />
        <Button
          onClick={() => handleRemoveClick(key)}
          disabled={keys.length <= 1}
        />
      </>
    ));

  return (
    <Container text>
      <Segment>
        {renderInputs()}
        <Button onClick={handleAddClick} disabled={keys.length >= 4}>
          Click Here
        </Button>
      </Segment>
    </Container>
  );
};

export default Inputs;
