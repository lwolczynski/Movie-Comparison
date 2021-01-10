/* eslint-disable react/prop-types */
import React from "react";
import { Container, Grid, Segment, Header, Image } from "semantic-ui-react";

const rows = [
  { name: "Title", jsonField: "Title" },
  { name: "Poster", jsonField: "Poster" },
  { name: "Plot", jsonField: "Plot" },
  {
    name: "Genre",
    jsonField: "Genre",
  },
  {
    name: "Runtime",
    jsonField: "Runtime",
  },
  { name: "Year", jsonField: "Year" },
  {
    name: "Actors",
    jsonField: "Actors",
  },
  {
    name: "Director",
    jsonField: "Director",
  },
  {
    name: "IMDB score",
    jsonField: "IMDBScore",
  },
  {
    name: "Rotten Tomatoes score",
    jsonField: "RTScore",
  },
  { name: "Metascore", jsonField: "Metascore" },
  {
    name: "Box Office",
    jsonField: "BoxOffice",
  },
  {
    name: "Rated",
    jsonField: "Rated",
  },
  {
    name: "Country",
    jsonField: "Country",
  },
  {
    name: "Language",
    jsonField: "Language",
  },
  { name: "Awards", jsonField: "Awards" },
  { name: "Writer", jsonField: "Writer" },
  {
    name: "Released",
    jsonField: "Released",
  },
  { name: "Type", jsonField: "Type" },
  {
    name: "Total seasons",
    jsonField: "totalSeasons",
  },
  {
    name: "See on IMDB",
    jsonField: "IMDBLink",
  },
];

const formatData = (type, data) => {
  switch (type) {
    case "Title":
      return <strong>{data}</strong>;
    case "Poster":
      if (data === "N/A") {
        return <div className="center">No image</div>;
      }
      return <Image src={data} />;
    case "IMDBLink":
      return (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a style={{ display: "table-cell" }} href={data} target="_blank">
          See on IMDB
        </a>
      );
    default:
      return <span>{data}</span>;
  }
};

const printMovieRow = (movie, row) => {
  if (movie.Title) {
    return movie[row.jsonField]
      ? formatData(row.jsonField, movie[row.jsonField])
      : "N/A";
  }
  return null;
};

const ComparisionTable = ({ movies }) => {
  const printFirstColumn = (row) => (
    <Grid.Column>
      <div className="full center">
        <Header as="h3">{row.name}</Header>
      </div>
    </Grid.Column>
  );

  const printMovieColumns = (row) =>
    movies.map((movie, index) => (
      <Grid.Column key={index}>
        <Segment className="full center">{printMovieRow(movie, row)}</Segment>
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
