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
  const { categorieName, setCategorieName, setSearchQuery } = useDataContext();

  const handleListPress = useCallback((item) => {
    setCategorieName((pre) => (pre == item ? null : item));
    inpRef.current.clear();
    setSearchQuery("");
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
              isActive={categorieName}
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
    marginBottom: hp("2"),
  },
  contentContainerStyle: {
    paddingHorizontal: wp("3"),
  },
});
