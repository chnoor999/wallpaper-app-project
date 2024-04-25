import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext({
  data: "",
  setData: () => {},
  categorieName: "",
  setCategorieName: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
});

const API_KEY = `43540444-af9501d131af70cff612926a0`;
const API_URL = `https://pixabay.com/api/?key=`;

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [categorieName, setCategorieName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editors_choice, setEditors_choice] = useState(true);
  const [safesearch, setSafesearch] = useState(true);

  let ImagesOptions = `&editors_choice=${editors_choice}&safesearch=${safesearch}`;

  const getImages = async ({ search, category }) => {
    try {
      let url = API_URL + API_KEY + ImagesOptions;

      if (search.length > 2) {
        url += `&q=${encodeURIComponent(search)}`;
      } else if (category) {
        url += `&category=${category}`;
      }

      setData([]);
      const response = await axios.get(url);
      const { data } = response;
      setData(data.hits);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getImages({ search: searchQuery, category: categorieName });
  }, [searchQuery, categorieName]);

  const value = {
    data,
    setData,
    categorieName,
    setCategorieName,
    searchQuery,
    setSearchQuery,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  return useContext(DataContext);
};
