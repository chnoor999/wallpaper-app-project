import { Pressable, StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const Header = ({ filterModalRef, scrollRef }) => {
  const openFilterModal = () => {
    filterModalRef.current.present();
  };

  const handleScrollUp = () => {
    scrollRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleScrollUp}>
        <Text style={styles.title}>Pixels</Text>
      </Pressable>
      <View style={styles.btnsContainer}>
        <Pressable style={styles.btnContainer} onPress={openFilterModal}>
          <FontAwesome5 name="filter" size={hp("2.6")} color="rgba(0,0,0,.9)" />
        </Pressable>
        <Pressable style={styles.btnContainer}>
          <Ionicons
            name="settings-sharp"
            size={hp("2.8")}
            color="rgba(0,0,0,.9)"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(1),
    paddingVertical: hp(0.5),
  },
  title: {
    fontSize: hp("2.8"),
    fontWeight: "700",
    color: "rgba(0,0,0,.9)",
    paddingHorizontal: wp(2),
  },
  btnsContainer: {
    flexDirection: "row",
    gap: hp(0.5),
  },
  btnContainer: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.8),
    borderRadius: 50,
    overflow: "hidden",
  },
});
