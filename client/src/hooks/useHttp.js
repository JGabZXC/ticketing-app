import { useEffect, useState, useCallback } from "react";

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async function fetchData(body) {
      setLoading(true);
      try {
        if (body) config.body = JSON.stringify(body);
        const response = await fetch(url, config);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError({ error: error.message });
      } finally {
        setLoading(false);
      }
    },
    [config, url]
  );

  useEffect(() => {
    if (config && config.method === "GET") fetchData();
  }, [config, fetchData]);

  return {
    data,
    error,
    loading,
    fetchData,
  };
}
