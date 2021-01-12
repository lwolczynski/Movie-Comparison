/* eslint-disable react/prop-types */
import React from "react";
import { Container, Segment, Button, Grid, Header } from "semantic-ui-react";
import Autocomplete from "./Autocomplete";

const Inputs = ({ movies, replaceOnPosterClick, movieAdmin }) => {
  const handleAddClick = () => {
    movieAdmin({ type: "ADD_MOVIE" });
  };

  const handleRemoveClick = (keyToRemove) => {
    movieAdmin({ type: "REMOVE_MOVIE", key: keyToRemove });
  };

  const renderInputs = () =>
    movies.map((movie) => (
      <Autocomplete
        key={movie.key}
        explicitKey={movie.key}
        replaceIfPosterCliked={replaceOnPosterClick === movie.key}
        movieAdmin={movieAdmin}
      >
        <Button
          circular
          className="no-background"
          icon="delete"
          onClick={() => handleRemoveClick(movie.key)}
          disabled={movies.length <= 1}
        />
      </Autocomplete>
    ));

  return (
    <Container text>
      <Segment raised>
        <Grid textAlign="center">
          <Grid.Row className="no-padding-bottom">
            <Grid.Column>
              <Header as="h3">
                Search for {movies.length === 1 ? "a movie" : "movies"}
              </Header>
            </Grid.Column>
          </Grid.Row>
          {renderInputs()}
          <Grid.Row>
            <Grid.Column>
              <Button onClick={handleAddClick} disabled={movies.length >= 4}>
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
