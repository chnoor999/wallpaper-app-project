import { Pressable, StyleSheet, Text } from "react-native";
import { memo } from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const OutLineButtonItem = ({
  item,
  index,
  isActive,
  isForFilterModal,
  onPress,
}) => {
  return (
    <Pressable onPress={() => onPress()}>
      <Animated.View
        entering={
          !isForFilterModal &&
          FadeInRight.springify()
            .delay((index + 1) * 200)
            .damping(1000)
            .duration(1000)
        }
        style={[
          styles.listContainer,
          index != 0 && styles.itemSpace,
          !isForFilterModal
            ? item == isActive && styles.fillListContainer
            : isActive.map(
                (mapItem) => mapItem.name == item && styles.fillListContainer
              ),
        ]}
      >
        <Text
          style={[
            styles.text,
            !isForFilterModal
              ? item == isActive && styles.fillText
              : isActive.map(
                  (mapItem) => mapItem.name == item && styles.fillText
                )
          ]}
        >
          {item}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default memo(OutLineButtonItem);

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.079)",
    paddingVertical: hp("1"),
    paddingHorizontal: wp("3"),
    borderRadius: 12,
  },
  text:{
    fontSize:hp(1.7)
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
