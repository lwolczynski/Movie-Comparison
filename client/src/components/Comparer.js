import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Divider } from "semantic-ui-react";
import Inputs from "./Inputs";
import ComparisionTable from "./ComparisonTable";
import PosterContext from "./PosterContext";

// eslint-disable-next-line react/prop-types
const Comaparer = ({ comparerRef }) => {
  const [nextKey, setNextKey] = useState(2);
  const [movies, setMovies] = useState([{ key: 0 }, { key: 1 }]);

  const { posterClicked } = useContext(PosterContext);

  const addMovieAndReturnKey = () => {
    const oldValue = nextKey;
    setNextKey(nextKey + 1);
    setMovies([...movies.map((obj) => ({ ...obj })), { key: oldValue }]);
    return oldValue;
  };

  const getMovieData = async (movie) => {
    const { data } = await axios.get(
      `http://localhost:${process.env.REACT_APP_PORT}/get`,
      {
        params: { id: movie },
      }
    );
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

  const changeMovie = async (movie, key) => {
    const data = await getMovieData(movie);
    setMovies(
      movies.reduce((acc, curr) => {
        if (curr.key === key) {
          acc.push({ ...data, key });
        } else {
          acc.push({ ...curr });
        }
        return acc;
      }, [])
    );
  };

  useEffect(() => {
    if (posterClicked.id) changeMovie(posterClicked.id, movies[0].key);
    const y =
      // eslint-disable-next-line react/prop-types
      comparerRef.current.getBoundingClientRect().top + window.pageYOffset + 1;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [posterClicked]);

  const removeMovie = (keyToRemove) => {
    // eslint-disable-next-line radix
    setMovies(
      movies.reduce((acc, curr) => {
        if (curr.key !== keyToRemove) {
          acc.push({ ...curr });
        }
        return acc;
      }, [])
    );
  };

  return (
    <>
      <Divider hidden />
      <Inputs
        getNextKey={addMovieAndReturnKey}
        changeMovie={changeMovie}
        removeMovie={removeMovie}
      />
      <Divider hidden />
      <ComparisionTable movies={movies} />
      <Divider hidden />
    </>
  );
};

export default Comaparer;
