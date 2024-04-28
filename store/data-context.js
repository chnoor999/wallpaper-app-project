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
  selectedFilters: "",
  setSelectedFilters: () => {},
});

const API_KEY = `43540444-af9501d131af70cff612926a0`;
const API_URL = `https://pixabay.com/api/?key=`;

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const [categorieName, setCategorieName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [imagesSetting, setImagesSetting] = useState({
    editorChoiceOn: true,
    safeSearchOn: true,
  });

  const [page, setPage] = useState(1);
  const [isAppend, setISAppend] = useState(false);

  const [activeFilter, setActiveFilter] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([
    { type: "order", name: "" },
    { type: "orientation", name: "" },
    { type: "type", name: "" },
    { type: "colors", name: "" },
  ]);

  let ImagesOptions = `&editors_choice=${imagesSetting.editorChoiceOn}&safesearch=${imagesSetting.safeSearchOn}`;

  const getImages = async () => {
    try {
      let url = API_URL + API_KEY + ImagesOptions + `&per_page=26`;

      if (activeFilter.length) {
        activeFilter.map((mapItem) => {
          if (mapItem.name.length) {
            url += `&${mapItem.type == "type" ? "image_type" : mapItem.type}=${
              mapItem.name
            }`;
          }
        });
      }

      if (searchQuery) {
        url += `&q=${encodeURIComponent(searchQuery)}`;
      } else if (categorieName) {
        url += `&category=${categorieName}`;
      }
      const response = await axios.get(url);
      const { data } = response;
      if (isAppend) {
        setData((pre) => [...pre, ...data.hits]);
      } else {
        setData(data.hits);
      }
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
    selectedFilters,
    setSelectedFilters,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  return useContext(DataContext);
};
