/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import axios from "axios";
import React, {
  useEffect,
  useReducer,
  useRef,
  useCallback,
  createRef,
  useContext,
} from "react";
import { Search, Grid } from "semantic-ui-react";
import PosterContext from "./PosterContext";

const initialState = {
  loading: false,
  results: [],
  value: "",
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "CHANGE_SEARCH":
      return { ...state, loading: false, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };
    default:
      throw new Error();
  }
};

const resultRenderer = ({ title, type, year, poster }) => (
  <>
    {poster !== "N/A" && (
      <div key="image" className="image">
        <img src={poster} />
      </div>
    )}
    <div key="content" className="content">
      <div className="title">{title}</div>
      <div className="description">
        {type}, {year}
      </div>
    </div>
  </>
);

const Autocomplete = ({
  explicitKey,
  replaceIfPosterCliked,
  movieAdmin,
  children,
}) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { loading, results, value } = state;

  const { posterClicked } = useContext(PosterContext);

  const timeoutRef = useRef();

  const searchRef = createRef();

  const mainSearchPart = async (dt) => {
    const { data } = await axios.get(
      `http://localhost:${process.env.REACT_APP_PORT}/search`,
      {
        params: {
          title: dt.value.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "),
        },
      }
    );

    // API returns object with capitalized keys which has to be changed due to Semantic UI Search componenet usage
    const modifiedData = data.map((item) => {
      const entries = Object.entries(item);
      const lowercaseEntries = entries.map((entry) => [
        entry[0].toLowerCase(),
        entry[1],
      ]);
      return Object.fromEntries(lowercaseEntries);
    });

    dispatch({
      type: "FINISH_SEARCH",
      // Add key to object entries
      results: modifiedData.map((obj, index) => ({ ...obj, key: index })),
    });
  };

  const handleForcedSearchChange = useCallback(async (e, dt) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "CHANGE_SEARCH", query: dt.value });
    movieAdmin({
      type: "FORCE_MOVIE",
      id: dt.id,
      key: explicitKey,
    });

    mainSearchPart(dt);
  }, []);

  const handleSearchChange = useCallback((e, dt) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: dt.value });

    timeoutRef.current = setTimeout(async () => {
      if (dt.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }

      mainSearchPart(dt);
    }, 500);
  }, []);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (replaceIfPosterCliked)
      handleForcedSearchChange(searchRef.current, {
        value: posterClicked.name,
        id: posterClicked.id,
      });
  }, [posterClicked]);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Grid.Row className="no-padding-bottom">
      <Grid.Column>
        <div className="center">
          <Search
            ref={searchRef}
            loading={loading}
            onResultSelect={(e, data) => {
              dispatch({
                type: "UPDATE_SELECTION",
                selection: data.result.title,
              });
              movieAdmin({
                type: "CHANGE_MOVIE",
                id: data.result.imdbid,
                key: explicitKey,
              });
            }}
            onSearchChange={handleSearchChange}
            resultRenderer={resultRenderer}
            results={results}
            value={value}
          />
          {children}
        </div>
      </Grid.Column>
    </Grid.Row>
  );
};

export default Autocomplete;
