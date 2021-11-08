import { useState } from "react";

const corsProxyUrl = "https://mycorsproxyapp.herokuapp.com/";

function useFetchLazy(url) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const data = await fetch(corsProxyUrl + url);
      const result = await data.json();
      setResponse(result);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  // This variant of my useFetch hook is inspired by the one from appolo/graphql
  // data is not fetch when I execute useFetchLazy() but when I execute const {fetchInfo} = useFetchLazy();
  // This trick allow me to execute a hook conditionally (in a useEffect or after data has been fetched)
  return { error, loading, response, fetchInfo };
}

export default useFetchLazy;
