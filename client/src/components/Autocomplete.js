import axios from "axios";
import React, { useEffect } from "react";
import { Search, Grid } from "semantic-ui-react";

const initialState = {
  loading: false,
  results: [],
  value: "",
};

function exampleReducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

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

// eslint-disable-next-line react/prop-types
const Autocomplete = ({ changeMovie, explicitKey }) => {
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();

  const handleSearchChange = React.useCallback((e, dt) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: dt.value });

    timeoutRef.current = setTimeout(async () => {
      if (dt.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }
      const { data } = await axios.get(
        `http://localhost:${process.env.REACT_APP_PORT}/search/${dt.value}`
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
    }, 500);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(timeoutRef.current);
    },
    []
  );

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          loading={loading}
          onResultSelect={(e, data) => {
            dispatch({
              type: "UPDATE_SELECTION",
              selection: data.result.title,
            });
            changeMovie(data.result.imdbid, explicitKey);
          }}
          onSearchChange={handleSearchChange}
          resultRenderer={resultRenderer}
          results={results}
          value={value}
        />
      </Grid.Column>
    </Grid>
  );
};

export default Autocomplete;
