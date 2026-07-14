import { useEffect, useState } from "react";
import { getStats } from "../../service/dashboard.service";

let useGetStats = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState({});
  useEffect(() => {
    let get = async () => {
      try {
        setIsLoading(true);
        let data = await getStats();
        setIsLoading(false);
        setError(null);
        setData(data);
      } catch (err) {
        setIsLoading(false);

        setError(err?.message || "Error while getting the stats");
      }
    };
    get();
  }, []);
  return { data, isLoading, error };
};

export default useGetStats;
