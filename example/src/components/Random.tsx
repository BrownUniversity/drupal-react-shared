import * as React from "react";
import { useFetch } from "../../../dist";
import api from "../api";

const Random = () => {
  const { loading, error, data: randomJoke, refetch } = useFetch({
    apiMethod: api.getRandomJoke
  });

  if (loading) {
    return <p>Fetching random joke...</p>;
  }

  if (error) {
    return <p>Error fetching random joke!</p>;
  }

  return (
    <div>
      <p>{randomJoke}</p>
      <button onClick={() => refetch({ withLoading: false })}>Another!</button>
    </div>
  );
};

export default Random;
