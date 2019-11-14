import * as React from "react";
import { useFetch } from "../../../dist";
import api from "../api";

const Search = () => {
  const { loading, error, data: searchResults, refetch } = useFetch({
    apiMethod: api.getJokeSearchResults,
    initialLoading: false
  });
  const [query, setQuery] = React.useState("");
  const handleSearch = () => refetch({ params: { query } });

  return (
    <div style={{ marginTop: 10 }}>
      <form onSubmit={event => event.preventDefault()}>
        <input
          placeholder="query..."
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit" onClick={handleSearch}>
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
