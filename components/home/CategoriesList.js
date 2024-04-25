import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { memo, useState } from "react";
import { Categories } from "../../util/data";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useDataContext } from "../../store/data-context";

const CategoriesList = ({ inpRef }) => {
  const { categorieName, setCategorieName, setSearchQuery } = useDataContext();

  const handleListPress = (item) => {
    inpRef.current.clear();
    setSearchQuery("");
    setCategorieName((pre) => (pre == item ? null : item));
  };

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
            <Pressable onPress={() => handleListPress(item)}>
              <Animated.View
                entering={FadeInRight.springify()
                  .delay((index + 1) * 200)
                  .damping(1000)
                  .duration(1000)}
                style={[
                  styles.listContainer,
                  index != 0 && styles.itemSpace,
                  item == categorieName && styles.fillListContainer,
                ]}
              >
                <Text style={item == categorieName && styles.fillText}>
                  {item}
                </Text>
              </Animated.View>
            </Pressable>
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
  listContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.079)",
    paddingVertical: hp("1"),
    paddingHorizontal: wp("3"),
    borderRadius: 12,
  },
  itemSpace: {
    marginLeft: wp("3"),
  },
  fillListContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  fillText: {
    color: "#fff",
  },
});
