import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Segment,
  Header,
  Image,
  Button,
} from "semantic-ui-react";
import {
  addObj as addMovie,
  changeObj as changeMovie,
  removeObj as removeMovie,
} from "../utils/objectOps";

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

// Fields expected to get based on the API documentation
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

// Display format based on field name
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
        <Button
          as="a"
          href={data}
          target="_blank"
          icon="external"
          content="IMDB"
        />
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

const getMovieData = async (movie) => {
  const { data } = await axios.get(`/get`, {
    params: { id: movie },
  });
  // Below modifications used to simplify movie rendering
  const RTScore = data.Ratings.find((o) => o.Source === "Rotten Tomatoes")
    ? data.Ratings.find((o) => o.Source === "Rotten Tomatoes").Value
    : undefined;
  const Metascore = data.Ratings.find((o) => o.Source === "Metacritic")
    ? data.Ratings.find((o) => o.Source === "Metacritic").Value
    : undefined;
  const IMDBScore = data.Ratings.find(
    (o) => o.Source === "Internet Movie Database"
  )
    ? data.Ratings.find((o) => o.Source === "Internet Movie Database").Value
    : undefined;
  const modifiedData = {
    ...data,
    RTScore,
    Metascore,
    IMDBScore,
    IMDBLink: `https://www.imdb.com/title/${movie}`,
  };
  return modifiedData;
};

const ComparisionTable = ({ lastAction }) => {
  const [movieDetails, setMovieDetails] = useState([{ key: 0 }, { key: 1 }]);

  useEffect(() => {
    async function run(action) {
      switch (lastAction.type) {
        case "ADD":
          setMovieDetails(addMovie(movieDetails, action.key));
          break;
        case "CHANGE":
        case "FORCE": {
          const data = await getMovieData(action.movieId);
          setMovieDetails(changeMovie(movieDetails, data, action.key));
          break;
        }
        case "REMOVE":
          setMovieDetails(removeMovie(movieDetails, action.key));
          break;
        default:
      }
    }
    run(lastAction);
  }, [lastAction]);

  return (
    <Container>
      <Grid className="styled" columns={movieDetails.length + 1}>
        {printRows(movieDetails)}
      </Grid>
    </Container>
  );
};

export default ComparisionTable;
