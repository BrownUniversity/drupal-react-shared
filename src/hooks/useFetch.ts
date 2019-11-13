import { useEffect, useRef, useState } from "react";

interface UseFetchProps {
  apiMethod: Function;
  params?: object;
  mungeResponse?: Function | null;
  initialData?: any;
  initialError?: any;
  initialLoading?: boolean;
  initialFetch?: boolean;
  dependencies?: Array<any>;
}

interface RefetchProps {
  params?: object;
  withLoading?: boolean;
}

const useFetch = ({
  apiMethod,
  params: initialParams = {},
  mungeResponse = null,
  initialData = null,
  initialError = null,
  initialLoading = true,
  initialFetch = true,
  dependencies = []
}: UseFetchProps) => {
  const params = useRef(initialParams);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(initialLoading);

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
    params: nextParams = {},
    withLoading = false
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

  if (initialFetch) {
    useEffect(() => {
      fetchWithLoading();
    }, dependencies);
  }

  return { data, error, loading, refetch };
};

export default useFetch;
