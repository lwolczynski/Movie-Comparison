/* eslint-disable react/prop-types */
import React from "react";
import { Container, Grid, Segment, Header, Image } from "semantic-ui-react";

const findMaxRate = (arr) => {
  const parsedArr = arr.map((el) => parseFloat(el) || 0);
  return arr[parsedArr.indexOf(Math.max(...parsedArr))] || "";
};

const findBoxOffice = (arr) => {
  const parsedArr = arr.map((el) => {
    if (el && el !== "N/A")
      return parseFloat(el.replace("$", "").replaceAll(",", ""));
    return 0;
  });
  return arr[parsedArr.indexOf(Math.max(...parsedArr))] || "";
};

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
    maxFinder: findMaxRate,
  },
  {
    name: "Rotten Tomatoes score",
    jsonField: "RTScore",
    maxFinder: findMaxRate,
  },
  { name: "Metascore", jsonField: "Metascore", maxFinder: findMaxRate },
  {
    name: "Box Office",
    jsonField: "BoxOffice",
    maxFinder: findBoxOffice,
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

const printMovieCell = (movie, row, highlight) => {
  const getCellClasses = () => {
    if (highlight === movie[row.jsonField]) return "full center highlight";
    return "full center";
  };
  const getCellText = () => {
    if (movie.Title) {
      return movie[row.jsonField]
        ? formatData(row.jsonField, movie[row.jsonField])
        : "N/A";
    }
    return null;
  };
  return <Segment className={getCellClasses()}>{getCellText()}</Segment>;
};

const printFirstColumn = (row) => (
  <Grid.Column>
    <div className="full center">
      <Header as="h3">{row.name}</Header>
    </div>
  </Grid.Column>
);

const printMovieColumns = (movies, row) => {
  const highlight = row.maxFinder
    ? row.maxFinder(movies.map((movie) => movie[row.jsonField]))
    : null;
  return movies.map((movie, index) => (
    <Grid.Column key={index}>
      {printMovieCell(movie, row, highlight)}
    </Grid.Column>
  ));
};

const printRows = (movies) =>
  rows.map((row, index) => (
    <Grid.Row key={index}>
      {printFirstColumn(row)}
      {printMovieColumns(movies, row)}
    </Grid.Row>
  ));

const ComparisionTable = ({ movies }) => (
  <Container>
    <Grid columns={movies.length + 1}>{printRows(movies)}</Grid>
  </Container>
);

export default ComparisionTable;
