import { useEffect, useRef, useState } from "react";

interface UseFetchProps {
  initialLoading?: boolean;
  initialError?: any;
  initialData?: any;
  apiMethod: Function;
  params?: any;
  mungeResponse?: Function | null;
}

interface RefetchProps {
  params?: any;
  withLoading?: boolean;
}

const useFetch = ({
  initialLoading = true,
  initialError = null,
  initialData = null,
  apiMethod,
  params: initialParams = {},
  mungeResponse = null
}: UseFetchProps) => {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState(initialError);
  const [data, setData] = useState(initialData);
  const params = useRef(initialParams);

  const fetch = async () => {
    try {
      const response = await apiMethod(params.current);

      if (mungeResponse) {
        setData(mungeResponse(response));
      } else {
        setData(response);
      }
    } catch (error) {
      setError(error);
    }
  };

  const fetchWithLoading = async () => {
    setLoading(true);
    await fetch();
    setLoading(false);
  };

  const refetch = ({
    params: nextParams = null,
    withLoading = true
  }: RefetchProps = {}) => {
    if (nextParams) {
      params.current = nextParams;
    }

    if (withLoading) {
      fetchWithLoading();
    } else {
      fetch();
    }
  };

  useEffect(() => {
    if (initialLoading) {
      fetchWithLoading();
    }
  }, []);

  return { loading, error, data, refetch };
};

export default useFetch;
