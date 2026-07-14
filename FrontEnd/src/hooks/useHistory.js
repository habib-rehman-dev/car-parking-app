import { useEffect, useState } from "react";
import {getHistory} from '../service/getSessions.service'


let useHistory = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [data, setData] = useState([]);
  useEffect(() => {
    let get = async () => {
      try {
        setIsLoading(true);
        let data = await getHistory()
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

export default useHistory;