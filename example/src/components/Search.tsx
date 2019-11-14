import * as React from "react";
import { useFetch } from "../../../dist";
import api from "../api";

const Search = () => {
  const { loading, error, data: searchResults, refetch } = useFetch({
    apiMethod: api.getJokeSearchResults,
    withInitialFetch: false,
    initialLoading: false
  });
  const [value, setValue] = React.useState("");
  const handleSubmit = () => refetch({ params: { term: value } });

  return (
    <div style={{ marginTop: 10 }}>
      <form onSubmit={event => event.preventDefault()}>
        <input
          placeholder="query..."
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {(() => {
        if (loading) {
          return <p>Searching jokes...</p>;
        } else {
        }

        if (error) {
          return <p>Error searching jokes!</p>;
        }

        if (searchResults) {
          if (searchResults.length) {
            return searchResults.map(({ id, joke }) => <p key={id}>{joke}</p>);
          }

          return <p>No jokes matching query.</p>;
        }

        return null;
      })()}
    </div>
  );
};

export default Search;
