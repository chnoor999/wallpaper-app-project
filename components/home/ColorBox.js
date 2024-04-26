import { Pressable, StyleSheet, View } from "react-native";
import { memo } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ColorBox = ({ color, onPress, isActive }) => {
  return (
    <View
      style={[
        styles.boxWrapper,
        isActive.map((mapItem) => mapItem.name == color && styles.selectColor),
      ]}
    >
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          { backgroundColor: color },
          color == "white" && styles.forWhiteColor,
        ]}
      ></Pressable>
    </View>
  );
};

export default memo(ColorBox);

const styles = StyleSheet.create({
  boxWrapper: {
    marginBottom: hp(1),
    marginLeft: wp(1),
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#fff",
  },
  container: {
    width: wp(12),
    height: wp(8),
    borderRadius: 12,
    margin: hp(0.2),
  },
  forWhiteColor: {
    borderWidth: 1,
  },
  selectColor: {
    borderColor: "#000",
  },
});
