import { Pressable, StyleSheet } from "react-native";
import { memo } from "react";
import { Image } from "expo-image";
import { getColumnCount, getImageSize } from "../../util/common";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const ImagesListItem = ({ item, index }) => {
  const getImageHeight = () => {
    const { imageHeight, imageWidth } = item;
    return { height: getImageSize(imageHeight, imageWidth) };
  };

  const isLastRow = () => {
    return (index + 1) % getColumnCount() === 0;
  };

  return (
    <Pressable
      style={[
        styles.imageContainer,
        !isLastRow() && styles.spacingRight,
        isLastRow() && styles.spacingLeft,
      ]}
    >
      <Image
        transition={100}
        style={[styles.image, getImageHeight()]}
        source={{ uri: item?.webformatURL }}
      />
    </Pressable>
  );
};

export default memo(ImagesListItem);

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.079)",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: wp(2),
  },
  image: {
    width: "100%",
    height: 300,
  },
  spacingRight: {
    marginRight: wp(1),
  },
  spacingLeft: {
    marginLeft: wp(1),
  },
});
