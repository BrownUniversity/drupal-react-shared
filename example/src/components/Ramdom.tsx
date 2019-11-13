import * as React from "react";
import { useFetch } from "../../../dist";
import api from "../api";

const Random = () => {
  const { loading, error, data: randomJoke } = useFetch({
    apiMethod: api.getRandomJoke
  });

  if (loading) {
    return <p>Fetching random joke...</p>;
  }

  if (error) {
    return <p>Error fetching ramdom joke!</p>;
  }

  return <p>{randomJoke}</p>;
};

export default Random;
