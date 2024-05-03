import { StyleSheet, View } from "react-native";
import { memo, useEffect, useRef, useState } from "react";
import { useDataContext } from "../../../store/data-context";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";

import axios from "axios";
import Screen from "../../../components/ui/Screen";
import Header from "../../../components/home/Header";
import ImagesList from "../../../components/home/ImagesList";
import LoadingOverlay from "../../../components/ui/LoadingOverlay";
import MessageOverlay from "../../../components/ui/MessageOverlay";

const API_KEY = `43540444-af9501d131af70cff612926a0`;
const API_URL = `https://pixabay.com/api/?key=`;

const FavouritesWallpaper = () => {
  const { favouritesWallpaperID } = useDataContext();
  const scrollRef = useRef(null);

  const [favouriteData, setFavouriteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getImages = async () => {
    try {
      const imagesData = [];
      setIsLoading(true);
      for (const id of favouritesWallpaperID) {
        let url = API_URL + API_KEY + `&id=${id}`;
        const response = await axios.get(url);
        const { data: responseData } = response;
        imagesData.push(...responseData.hits);
      }
      setIsLoading(false);
      setFavouriteData(imagesData);
    } catch (err) {
      console.log(err);
      setFavouriteData([]);
    }
  };

  useEffect(() => {
    getImages();
  }, [favouritesWallpaperID]);

  return (
    <Screen>
      <Header scrollRef={scrollRef} forFavouritesScreen />
      <View style={styles.contentContainer} ></View>
      {isLoading ? (
        <LoadingOverlay />
      ) : !favouriteData.length && !favouritesWallpaperID.length ? (
        <MessageOverlay>No favourites!</MessageOverlay>
      ) : (
        <ImagesList
          scrollRef={scrollRef}
          favouriteWallpaperData={favouriteData}
          forFavourite
        />
      )}
    </Screen>
  );
};

export default memo(FavouritesWallpaper);

const styles = StyleSheet.create({
  contentContainer:{
    paddingTop:hp(1)
  }
});
