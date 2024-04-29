import { FlatList, StyleSheet, View } from "react-native";
import { memo, useCallback } from "react";
import { Categories } from "../../util/data";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDataContext } from "../../store/data-context";

import CategoryListItem from "./OutLineButtonItem";

const CategoriesList = ({ inpRef }) => {
  const { setData, setImagesParams, imagesParams } = useDataContext();

  const handleListPress = useCallback((item) => {
    setData([]);
    setImagesParams((pre) => {
      return {
        ...pre,
        selectCategory: pre.selectCategory == item ? "" : item,
        searchQuery: "",
        page: 1,
        append: false,
      };
    });
    inpRef.current.clear();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={Categories}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        key={(item) => item}
        renderItem={({ item, index }) => {
          return (
            <CategoryListItem
              item={item}
              index={index}
              isActive={imagesParams.selectCategory}
              onPress={() => handleListPress(item)}
            />
          );
        }}
      />
    </View>
  );
};

export default memo(CategoriesList);

const styles = StyleSheet.create({
  container: {
    marginBottom: hp("1.5"),
  },
  contentContainerStyle: {
    paddingHorizontal: wp("3"),
  },
});
