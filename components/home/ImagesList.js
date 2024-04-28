import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { useDataContext } from "../../store/data-context";
import { MasonryFlashList } from "@shopify/flash-list";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getColumnCount } from "../../util/common";

import ImagesListItem from "./ImagesListItem";

const ImagesList = () => {
  const { data } = useDataContext();

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={data}
        numColumns={getColumnCount()}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
        renderItem={({ item, index }) => {
          return <ImagesListItem item={item} index={index} />;
        }}
      />
    </View>
  );
};

export default memo(ImagesList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 3,
    width: wp(100),
  },
  contentContainerStyle: {
    paddingHorizontal: wp(4),
  },
});
