import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url: string | null) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(res.data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(res.data);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
