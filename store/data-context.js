import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

const DataContext = createContext({
  data: "",
  setData: () => {},
  imagesParams: "",
  setImagesParams: () => {},
  selectedFilters: "",
  setSelectedFilters: () => {},
});

const API_KEY = `43540444-af9501d131af70cff612926a0`;
const API_URL = `https://pixabay.com/api/?key=`;

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [imagesParams, setImagesParams] = useState({
    selectCategory: "",
    searchQuery: "",
    activeFilters: [],
    page: 1,
    append: false,
  });

  const [imagesSetting, setImagesSetting] = useState({
    editorChoiceOn: true,
    safeSearchOn: true,
  });

  const [selectedFilters, setSelectedFilters] = useState([
    { type: "order", name: "" },
    { type: "orientation", name: "" },
    { type: "type", name: "" },
    { type: "colors", name: "" },
  ]);

  let ImagesOptions = `&editors_choice=${imagesSetting.editorChoiceOn}&safesearch=${imagesSetting.safeSearchOn}&per_page=26`;

  const getImages = async () => {
    try {
      let url =
        API_URL + API_KEY + ImagesOptions + `&page=${imagesParams.page}`;

      if (imagesParams.activeFilters.length) {
        imagesParams.activeFilters.map((mapItem) => {
          if (mapItem.name.length) {
            url += `&${mapItem.type == "type" ? "image_type" : mapItem.type}=${
              mapItem.name
            }`;
          }
        });
      }
      if (imagesParams.searchQuery) {
        url += `&q=${encodeURIComponent(imagesParams.searchQuery)}`;
      }
      if (imagesParams.selectCategory) {
        url += `&category=${imagesParams.selectCategory}`;
      }

      const response = await axios.get(url);
      const { data } = response;
      if (imagesParams.append) {
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
  }, [imagesParams]);

  const value = {
    data,
    setData,
    imagesParams,
    setImagesParams,
    selectedFilters,
    setSelectedFilters,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  return useContext(DataContext);
};
