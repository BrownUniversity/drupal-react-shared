import * as React from "react";
import Random from "./Random";
import Search from "./Search";

const SELECT = "SELECT";
const RANDOM = "RANDOM";
const SEARCH = "SEARCH";

const App = () => {
  const [view, setView] = React.useState(SELECT);

  return (
    <>
      <h1>Dad Jokes</h1>
      <select value={view} onChange={event => setView(event.target.value)}>
        <option disabled value={SELECT}>
          select...
        </option>
        <option value={RANDOM}>Random</option>
        <option value={SEARCH}>Search</option>
      </select>
      {(() => {
        switch (view) {
          case RANDOM:
            return <Random />;
          case SEARCH:
            return <Search />;
          default:
            return null;
        }
      })()}
    </>
  );
};

export default App;
