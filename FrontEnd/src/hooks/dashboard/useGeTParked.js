import { useEffect, useState } from "react";
import { getallparked } from "../../service/dashboard.service";

let useGetParked = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState([]);
  useEffect(() => {
    let get = async () => {
      try {
        setIsLoading(true);
        let data = await getallparked();
        console.log(data)
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

export default useGetParked;