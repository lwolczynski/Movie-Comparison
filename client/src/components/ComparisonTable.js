/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Container,
  Grid,
  Segment,
  Placeholder,
  Header,
  Image,
} from "semantic-ui-react";

const printPlaceholder = (child) => (
  <Placeholder className="no-animation">
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

const linePlaceholder = (len = "medium") =>
  printPlaceholder(<Placeholder.Line length={len} />);

const rows = [
  { name: "Title", jsonField: "Title", placeholder: linePlaceholder("long") },
  { name: "Poster", jsonField: "Poster", placeholder: imagePlaceholder },
  { name: "Plot", jsonField: "Plot", placeholder: paragraphPlaceholder },
  {
    name: "Genre",
    jsonField: "Genre",
    placeholder: linePlaceholder("very long"),
  },
  {
    name: "Runtime",
    jsonField: "Runtime",
    placeholder: linePlaceholder("short"),
  },
  { name: "Year", jsonField: "Year", placeholder: linePlaceholder("short") },
  {
    name: "Actors",
    jsonField: "Actors",
    placeholder: linePlaceholder("very long"),
  },
  {
    name: "Director",
    jsonField: "Director",
    placeholder: linePlaceholder("long"),
  },
  {
    name: "IMDB score",
    jsonField: "IMDBScore",
    placeholder: linePlaceholder("short"),
  },
  {
    name: "Rotten Tomatoes score",
    jsonField: "RTScore",
    placeholder: linePlaceholder("short"),
  },
  { name: "Metascore", jsonField: "Metascore", placeholder: linePlaceholder() },
  {
    name: "Box Office",
    jsonField: "BoxOffice",
    placeholder: linePlaceholder("short"),
  },
  {
    name: "Rated",
    jsonField: "Rated",
    placeholder: linePlaceholder("very short"),
  },
  {
    name: "Country",
    jsonField: "Country",
    placeholder: linePlaceholder("medium"),
  },
  {
    name: "Language",
    jsonField: "Language",
    placeholder: linePlaceholder("medium"),
  },
  { name: "Awards", jsonField: "Awards", placeholder: linePlaceholder("long") },
  { name: "Writer", jsonField: "Writer", placeholder: linePlaceholder("long") },
  {
    name: "Released",
    jsonField: "Released",
    placeholder: linePlaceholder("medium"),
  },
  { name: "Type", jsonField: "Type", placeholder: linePlaceholder("short") },
  {
    name: "Total seasons",
    jsonField: "totalSeasons",
    placeholder: linePlaceholder("very short"),
  },
  {
    name: "See on IMDB",
    jsonField: "IMDBLink",
    placeholder: linePlaceholder("medium"),
  },
];

const formatData = (type, data) => {
  switch (type) {
    case "Title":
      return <strong>{data}</strong>;
    case "Poster":
      if (data === "N/A") {
        return <div className="no-image center">No image</div>;
      }
      return <Image src={data} />;
    default:
      return <span>{data}</span>;
  }
};

// eslint-disable-next-line react/prop-types
const ComparisionTable = ({ movies }) => {
  const printFirstColumn = (row) => (
    <Grid.Column>
      <div className="full center">
        <Header as="h3">{row.name}</Header>
      </div>
    </Grid.Column>
  );

  const printMovieColumns = (row) =>
    // eslint-disable-next-line react/prop-types
    movies.map((movie, index) => (
      <Grid.Column key={index}>
        <Segment textAlign="center" className="full">
          {movie.Title
            ? movie[row.jsonField]
              ? formatData(row.jsonField, movie[row.jsonField])
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
