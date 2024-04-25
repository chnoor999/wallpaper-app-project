import { Pressable, StyleSheet, Text } from "react-native";
import { memo } from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const CategoryListItem = ({ item, index, categorieName, handleListPress }) => {
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
        <Text style={item == categorieName && styles.fillText}>{item}</Text>
      </Animated.View>
    </Pressable>
  );
};

export default memo(CategoryListItem);

const styles = StyleSheet.create({
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
