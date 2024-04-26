import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext({
  data: "",
  setData: () => {},
  categorieName: "",
  setCategorieName: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  activeFilter: "",
  setActiveFilter: () => {},
});

const API_KEY = `43540444-af9501d131af70cff612926a0`;
const API_URL = `https://pixabay.com/api/?key=`;

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [categorieName, setCategorieName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editors_choice, setEditors_choice] = useState(true);
  const [safesearch, setSafesearch] = useState(true);
  const [activeFilter, setActiveFilter] = useState("");

  let ImagesOptions = `&editors_choice=${editors_choice}&safesearch=${safesearch}`;

  const getImages = async () => {
    try {
      let url = API_URL + API_KEY + ImagesOptions + activeFilter;

      if (searchQuery) {
        url += `&q=${encodeURIComponent(searchQuery)}`;
      } else if (categorieName) {
        url += `&category=${categorieName}`;
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
    getImages();
  }, [searchQuery, categorieName, activeFilter]);

  const value = {
    data,
    setData,
    categorieName,
    setCategorieName,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  return useContext(DataContext);
};
