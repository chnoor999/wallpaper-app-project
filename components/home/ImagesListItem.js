import { Pressable, StyleSheet } from "react-native";
import { memo, useMemo } from "react";
import { Image } from "expo-image";
import { getColumnCount, getImageSize } from "../../util/common";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const ImagesListItem = ({ item, index, onPress }) => {
  const getImageHeight = useMemo(() => {
    const { imageHeight, imageWidth } = item;
    return { height: getImageSize(imageHeight, imageWidth) };
  }, [item]);

  const row = useMemo(() => {
    const firstRow = index % getColumnCount() === 0;
    const secondRow = (index + 2) % getColumnCount() === 0;

    return {
      firstRow,
      secondRow,
    };
  }, [index]);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.imageContainer,
        row.firstRow && styles.spacingRight,
        !row.firstRow && styles.spacingLeft,
        row.secondRow && styles.spacingRight,
      ]}
    >
      <Image
        transition={100}
        style={[styles.image, getImageHeight]}
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
  },
  spacingRight: {
    marginRight: wp(1),
  },
  spacingLeft: {
    marginLeft: wp(1),
  },
});
