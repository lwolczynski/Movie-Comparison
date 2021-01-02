/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from "react";
import { Container, Grid, Segment, Placeholder } from "semantic-ui-react";

const printPlaceholder = (child) => (
  <Placeholder>
    <Placeholder.Header>{child}</Placeholder.Header>
  </Placeholder>
);

const paragraphPlaceholder = printPlaceholder(
  <Placeholder.Paragraph>
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
  </Placeholder.Paragraph>
);

const imagePlaceholder = printPlaceholder(<Placeholder.Image />);

const linePlaceholder = printPlaceholder(<Placeholder.Line />);

const rows = [
  { name: "Title", jsonField: "Title", placeholder: linePlaceholder },
  { name: "Poster", jsonField: "Poster", placeholder: imagePlaceholder },
  { name: "Plot", jsonField: "Plot", placeholder: paragraphPlaceholder },
  { name: "Genre", jsonField: "Genre", placeholder: linePlaceholder },
  { name: "Runtime", jsonField: "Runtime", placeholder: linePlaceholder },
  { name: "Year", jsonField: "Year", placeholder: linePlaceholder },
  { name: "Actors", jsonField: "Actors", placeholder: linePlaceholder },
  { name: "Director", jsonField: "Director", placeholder: linePlaceholder },
  { name: "IMDB score", jsonField: "IMDBScore", placeholder: linePlaceholder },
  {
    name: "Rotten Tomatoes score",
    jsonField: "RTScore",
    placeholder: linePlaceholder,
  },
  { name: "Metascore", jsonField: "Metascore", placeholder: linePlaceholder },
  { name: "Box Office", jsonField: "BoxOffice", placeholder: linePlaceholder },
  { name: "Rated", jsonField: "Rated", placeholder: linePlaceholder },
  { name: "Country", jsonField: "Country", placeholder: linePlaceholder },
  { name: "Language", jsonField: "Language", placeholder: linePlaceholder },
  { name: "Awards", jsonField: "Awards", placeholder: linePlaceholder },
  { name: "Writer", jsonField: "Writer", placeholder: linePlaceholder },
  { name: "Released", jsonField: "Released", placeholder: linePlaceholder },
  { name: "Type", jsonField: "Type", placeholder: linePlaceholder },
  {
    name: "Total seasons",
    jsonField: "totalSeasons",
    placeholder: linePlaceholder,
  },
  { name: "See on IMDB", jsonField: "IMDBLink", placeholder: linePlaceholder },
];

// eslint-disable-next-line react/prop-types
const ComparisionTable = ({ movies }) => {
  const printFirstColumn = (row) => (
    <Grid.Column>
      <div className="full center">{row.name}</div>
    </Grid.Column>
  );

  const printMovieColumns = (row) =>
    // eslint-disable-next-line react/prop-types
    movies.map((movie, index) => (
      <Grid.Column key={index}>
        <Segment raised className="full">
          {movie.Title
            ? movie[row.jsonField]
              ? movie[row.jsonField]
              : "N/A"
            : row.placeholder}
        </Segment>
      </Grid.Column>
    ));

  const printRows = () =>
    rows.map((row, index) => (
      <Grid.Row key={index}>
        {printFirstColumn(row)}
        {printMovieColumns(row)}
      </Grid.Row>
    ));

  return (
    <Container>
      <Grid columns={movies.length + 1}>{printRows()}</Grid>
    </Container>
  );
};

export default ComparisionTable;
