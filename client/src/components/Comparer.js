import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Divider } from "semantic-ui-react";
import Inputs from "./Inputs";
import ComparisionTable from "./ComparisonTable";
import PosterContext from "./PosterContext";

// eslint-disable-next-line react/prop-types
const Comaparer = ({ scrollToMain }) => {
  const [nextKey, setNextKey] = useState(2);
  const [movies, setMovies] = useState([{ key: 0 }, { key: 1 }]);
  const [movieToReplace, setMovieToReplace] = useState({});

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
      movies.map((el) => {
        if (el.key === key) {
          return { ...data, key };
        }
        return { ...el };
      })
    );
  };

  useEffect(() => {
    if (posterClicked.id) {
      const getMovieToChangeIndex = () => {
        const index = movies.findIndex((movie) => !movie.Title);
        return index === -1 ? movies.length - 1 : index;
      };
      const movieIndexToChange = getMovieToChangeIndex();
      setMovieToReplace({
        title: posterClicked.name,
        key: movies[movieIndexToChange].key,
      });
      changeMovie(posterClicked.id, movies[movieIndexToChange].key);
      scrollToMain();
    }
  }, [posterClicked]);

  const removeMovie = (keyToRemove) => {
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
        movieToReplace={movieToReplace}
      />
      <Divider hidden />
      <ComparisionTable movies={movies} />
      <Divider hidden />
    </>
  );
};

export default Comaparer;
