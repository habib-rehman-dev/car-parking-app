import { useEffect, useState } from "react";
import { getRevenue } from "../../service/dashboard.service";

let useGetRevenue = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState({});
  useEffect(() => {
    let get = async () => {
      try {
        setIsLoading(true);
        let data = await getRevenue();
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

export default useGetRevenue;