import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { Image } from "expo-image";

const ImagesListItem = ({ item }) => {
  return (
    <View>
      <Image style={styles.image} source={{ uri: item?.webformatURL }} />
    </View>
  );
};

export default memo(ImagesListItem);

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
});
