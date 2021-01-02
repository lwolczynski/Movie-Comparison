import React, { useState } from "react";
import { Container, Segment, Button, Grid, Header } from "semantic-ui-react";
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
      <Autocomplete changeMovie={changeMovie} key={key} explicitKey={key}>
        <Button
          circular
          className="no-background"
          icon="delete"
          onClick={() => handleRemoveClick(key)}
          disabled={keys.length <= 1}
        />
      </Autocomplete>
    ));

  return (
    <Container text>
      <Segment>
        <Grid textAlign="center">
          <Grid.Row className="no-padding-bottom">
            <Grid.Column>
              <Header as="h3">
                Search for {keys.length}{" "}
                {keys.length === 1 ? "movie" : "movies"}
              </Header>
            </Grid.Column>
          </Grid.Row>
          {renderInputs()}
          <Grid.Row>
            <Grid.Column>
              <Button onClick={handleAddClick} disabled={keys.length >= 4}>
                Add another movie
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

export default Inputs;
