import axios from "axios";
import React, { useState } from "react";
import Inputs from "./Inputs";
import ComparisionTable from "./ComparisonTable";

const Comaparer = () => {
  const [nextKey, setNextKey] = useState(2);
  const [movies, setMovies] = useState([{ key: 0 }, { key: 1 }]);

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
      <Inputs
        getNextKey={addMovieAndReturnKey}
        changeMovie={changeMovie}
        removeMovie={removeMovie}
      />
      <ComparisionTable movies={movies} />
    </>
  );
};

export default Comaparer;
