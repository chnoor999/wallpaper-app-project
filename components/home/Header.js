import { Pressable, StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { FontAwesome6 } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pixels</Text>
      <Pressable>
        <FontAwesome6
          name="bars-staggered"
          size={hp("2.6")}
          color="rgba(0,0,0,.9)"
        />
      </Pressable>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp("1.5"),
    paddingHorizontal: wp("3"),
  },
  title: {
    fontSize: hp("2.8"),
    fontWeight: "700",
    color: "rgba(0,0,0,.9)",
  },
});
