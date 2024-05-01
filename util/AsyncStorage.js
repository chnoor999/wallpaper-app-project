import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = (name, intialState) => {
  const [data, setData] = useState(intialState);

  useEffect(() => {
    (async () => {
      const res = await AsyncStorage.getItem(name);
      if (res) {
        setData(JSON.parse(res));
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(name, JSON.stringify(data));
  }, [data]);

  return [data, setData];
};
