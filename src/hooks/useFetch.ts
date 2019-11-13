import { useEffect, useState } from "react";

interface Argss {
  apiMethod: Function;
  params?: object;
  mungeResponse?: Function | null;
  initialData?: any;
  initialError?: any;
  initialLoading?: boolean;
}

const useFetch = ({
  apiMethod,
  params = {},
  mungeResponse = null,
  initialData = null,
  initialError = null,
  initialLoading = true
}: Argss) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(initialLoading);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await apiMethod(params);
        if (mungeResponse) {
          setData(mungeResponse(response));
        } else {
          setData(response);
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return { data, error, loading };
};

export default useFetch;
