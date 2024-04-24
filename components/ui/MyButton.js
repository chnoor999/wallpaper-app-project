import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

const MyButton = ({ children, onPress }) => {
  return (
    <Animated.View entering={FadeInDown.delay(600).springify()}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.container}
      >
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(MyButton);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,.9)",
    width: wp("80"),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: hp("1.5"),
  },
  text: {
    fontSize: hp("2.4"),
    color: "#fff",
    letterSpacing: 1,
  },
});
