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
declare const useFetch: ({ initialLoading, initialError, initialData, apiMethod, params: initialParams, mungeResponse }: UseFetchProps) => {
    loading: boolean;
    error: any;
    data: any;
    refetch: ({ params: nextParams, withLoading }?: RefetchProps) => void;
};
export default useFetch;
