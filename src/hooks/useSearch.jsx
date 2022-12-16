import { useEffect, useState } from "react";
import { getPostsPage } from "../api/axios";

export function useSearch(pageNumber = 1) {

  const [ results, setResults ] = useState([]);
  const [ isError, setIsError ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false); 
  const [ error, setError ] = useState({});
  const [ hasNextPage, setHasNextPage ] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getPostsPage(pageNumber, { signal })
      .then(data => {
        setResults(prevData => [...prevData, ...data]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        if (signal.aborted) return ;
        setIsError(true);
        setError({message: e.message});
      })

      return () => controller.abort();

  }, [pageNumber])

  return { isLoading, isError, error, results, hasNextPage}
}
