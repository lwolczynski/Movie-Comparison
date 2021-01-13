/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer } from "react";
import { Divider } from "semantic-ui-react";
import Inputs from "./Inputs";
import ComparisionTable from "./ComparisonTable";
import {
  addObj as addMovie,
  removeObj as removeMovie,
} from "../utils/objectOps";

const initialState = {
  movies: [{ key: 0 }, { key: 1 }],
  nextKey: 2,
  lastAction: { type: "IDLE" },
  replaceOnPosterClick: 0, // key of movie to be replaced
};

const changeMovie = (movies, id, key) => [
  ...movies.map((el) => {
    if (el.key === key) {
      return { id, key };
    }
    return { ...el };
  }),
];

const getMovieToChangeIndex = (movies) => {
  const index = movies.findIndex((movie) => !movie.id);
  return index === -1 ? movies[movies.length - 1].key : movies[index].key;
};

const moviesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE": {
      const movies = addMovie(state.movies, state.nextKey);
      return {
        ...state,
        movies,
        lastAction: { type: "ADD", key: state.nextKey },
        nextKey: state.nextKey + 1,
        replaceOnPosterClick: getMovieToChangeIndex(movies),
      };
    }
    case "CHANGE_MOVIE": {
      const movies = changeMovie(state.movies, action.id, action.key);
      return {
        ...state,
        movies,
        lastAction: { type: "CHANGE", key: action.key, movieId: action.id },
        replaceOnPosterClick: getMovieToChangeIndex(movies),
      };
    }
    case "REMOVE_MOVIE": {
      const movies = removeMovie(state.movies, action.key);
      return {
        ...state,
        movies,
        lastAction: { type: "REMOVE", key: action.key },
        replaceOnPosterClick: getMovieToChangeIndex(movies),
      };
    }
    case "FORCE_MOVIE": {
      const movies = changeMovie(state.movies, action.id, action.key);
      return {
        ...state,
        movies,
        lastAction: { type: "FORCE", key: action.key, movieId: action.id },
        replaceOnPosterClick: getMovieToChangeIndex(movies),
      };
    }
    default:
      throw new Error();
  }
};

// eslint-disable-next-line react/prop-types
const Comaparer = ({ scrollToMain }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);
  const { movies, replaceOnPosterClick, lastAction } = state;

  useEffect(() => {
    if (lastAction.type === "FORCE") scrollToMain();
  }, [lastAction]);

  return (
    <>
      <Divider hidden />
      <Inputs
        movies={movies}
        replaceOnPosterClick={replaceOnPosterClick}
        movieAdmin={dispatch}
      />
      <Divider hidden />
      <ComparisionTable lastAction={lastAction} />
      <Divider hidden />
    </>
  );
};

export default Comaparer;
