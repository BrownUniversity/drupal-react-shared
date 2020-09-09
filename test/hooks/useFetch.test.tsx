import { act, renderHook } from "@testing-library/react-hooks";
import useFetch from "../../src/hooks/useFetch";

describe("useFetch", () => {
  const apiMethod = jest.fn();

  afterEach(() => {
    apiMethod.mockReset();
  });

  test("defaults initial* props", async () => {
    const { result, waitForNextUpdate } = renderHook(props => useFetch(props), {
      initialProps: {
        apiMethod
      }
    });

    const { loading, error, data } = result.current;
    expect(loading).toBe(true);
    expect(error).toBe(null);
    expect(data).toBe(null);

    await waitForNextUpdate();
  });

  test("overrides initial* props when provided", () => {
    const initialLoading = false;
    const initialError = ":-(";
    const initialData = ["Initial", "data"];
    const { result } = renderHook(props => useFetch(props), {
      initialProps: {
        apiMethod,
        initialLoading,
        initialError,
        initialData
      }
    });

    const { loading, error, data } = result.current;
    expect(loading).toBe(initialLoading);
    expect(error).toBe(initialError);
    expect(data).toBe(initialData);
  });

  describe("initial fetch", () => {
    test("occurs by default", async () => {
      const expectedData = ["Expected", "data"];
      apiMethod.mockResolvedValueOnce(expectedData);
      const { result, waitForNextUpdate } = renderHook(
        props => useFetch(props),
        {
          initialProps: { apiMethod }
        }
      );

      await waitForNextUpdate();

      const { loading, data } = result.current;
      expect(loading).toBe(false);
      expect(data).toBe(expectedData);
      expect(apiMethod.mock.calls.length).toBe(1);
    });

    test("does not occcur when initialLoading is set to false", () => {
      renderHook(props => useFetch(props), {
        initialProps: { initialLoading: false, apiMethod }
      });

      expect(apiMethod.mock.calls.length).toBe(0);
    });

    test("passes params when provided", async () => {
      const params = { id: "1" };
      const { waitForNextUpdate } = renderHook(props => useFetch(props), {
        initialProps: { apiMethod, params }
      });

      await waitForNextUpdate();

      expect(apiMethod.mock.calls[0][0]).toBe(params);
    });

    test("applies mungeResponse when provided", async () => {
      const response = [1, 2, 3];
      apiMethod.mockResolvedValueOnce(response);
      const mungeResponse = (res: number[]) => res.map(n => n + 1);
      const { result, waitForNextUpdate } = renderHook(
        props => useFetch(props),
        {
          initialProps: { apiMethod, mungeResponse }
        }
      );

      await waitForNextUpdate();

      expect(result.current.data).toEqual([2, 3, 4]);
    });

    test("handles error", async () => {
      const expectedError = new Error("Error");
      apiMethod.mockRejectedValue(expectedError);
      const { result, waitForNextUpdate } = renderHook(
        props => useFetch(props),
        {
          initialProps: { apiMethod }
        }
      );

      await waitForNextUpdate();

      expect(result.current.error).toBe(expectedError);
    });
  });

  describe("refetch", () => {
    test("occurs with loading by default", async () => {
      // with initial fetch
      const initialFetchData = ["Initial", "fetch", "data"];
      apiMethod.mockResolvedValueOnce(initialFetchData);
      const refetchData = ["Re-fetch", "data"];
      apiMethod.mockResolvedValueOnce(refetchData);
      const { result, waitForNextUpdate } = renderHook(
        props => useFetch(props),
        {
          initialProps: { apiMethod }
        }
      );

      await waitForNextUpdate();
      expect(result.current.data).toBe(initialFetchData);
      expect(apiMethod.mock.calls.length).toBe(1);

      act(result.current.refetch);
      expect(result.current.loading).toBe(true);
      await waitForNextUpdate();

      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(refetchData);
      expect(apiMethod.mock.calls.length).toBe(2);
    });

    test("occurs without loading when withLoading is set to false", async () => {
      const expectedData = ["Expected", "data"];
      apiMethod.mockResolvedValueOnce(expectedData);
      const { result, waitForNextUpdate } = renderHook(
        props => useFetch(props),
        {
          initialProps: { initialLoading: false, apiMethod }
        }
      );

      act(() => result.current.refetch({ withLoading: false }));
      expect(result.current.loading).toBe(false);
      await waitForNextUpdate();

      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(expectedData);
      expect(apiMethod.mock.calls.length).toBe(1);
    });

    test("passes initial params when provided", async () => {
      const params = { id: "1" };
      const { result, waitForNextUpdate } = renderHook(
        props => useFetch(props),
        {
          initialProps: { initialLoading: false, apiMethod, params }
        }
      );

      act(result.current.refetch);
      await waitForNextUpdate();

      expect(apiMethod.mock.calls[0][0]).toBe(params);
    });

    test("passes updated params when provided", async () => {
      const initialParams = { id: "1" };
      const { result, waitForNextUpdate } = renderHook(
        props => useFetch(props),
        {
          initialProps: {
            initialLoading: false,
            apiMethod,
            params: initialParams
          }
        }
      );
      const updatedParams = { id: "2" };

      act(() => result.current.refetch({ params: updatedParams }));
      await waitForNextUpdate();

      expect(apiMethod.mock.calls[0][0]).toBe(updatedParams);
    });

    test("applies mungeResponse when provided", async () => {
      const response = [2, 3, 4];
      apiMethod.mockResolvedValueOnce(response);
      const mungeResponse = (res: number[]) => res.map(n => n - 1);
      const { result, waitForNextUpdate } = renderHook(
        props => useFetch(props),
        {
          initialProps: { initialLoading: false, apiMethod, mungeResponse }
        }
      );

      act(result.current.refetch);
      await waitForNextUpdate();

      expect(result.current.data).toEqual([1, 2, 3]);
    });

    test("handles error", async () => {
      const expectedError = new Error("Error");
      apiMethod.mockRejectedValue(expectedError);
      const { result, waitForNextUpdate } = renderHook(
        props => useFetch(props),
        {
          initialProps: { initialLoading: false, apiMethod }
        }
      );

      act(result.current.refetch);
      await waitForNextUpdate();

      expect(result.current.error).toBe(expectedError);
    });
  });
});
