import { Pressable, StyleSheet, Text, View } from "react-native";
import { memo, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import SettingPopup from "../ui/SettingPopup";

const Header = ({ filterModalRef, scrollRef }) => {
  const openFilterModal = () => {
    filterModalRef.current.present();
  };

  const handleScrollUp = () => {
    scrollRef?.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const height = useSharedValue(0);
  const [settingBtnFilled, setSettingBtnFilled] = useState(false);

  const onSetting = () => {
    setSettingBtnFilled((pre) => !pre);
    height.value =
      height.value === 0
        ? withTiming(200, { duration: 200, easing: Easing.inOut(Easing.ease) })
        : withTiming(0, { duration: 200, easing: Easing.inOut(Easing.ease) });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleScrollUp}>
        <Text style={styles.title}>Pixels</Text>
      </Pressable>
      <View style={styles.btnsContainer}>
        <Pressable style={styles.btnContainer} onPress={openFilterModal}>
          <FontAwesome5 name="filter" size={hp("2.3")} color="rgba(0,0,0,.8)" />
        </Pressable>
        <Pressable
          onPress={onSetting}
          style={[
            styles.btnContainer,
            settingBtnFilled && styles.settingBtnFill,
          ]}
        >
          <Ionicons
            name="settings-sharp"
            size={hp("2.5")}
            color={settingBtnFilled ? "#fff" : "rgba(0,0,0,.8)"}
          />
        </Pressable>
      </View>
      <Animated.View style={[styles.SettingPopup, { height }]}>
        <SettingPopup />
      </Animated.View>
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
  SettingPopup: {
    position: "absolute",
    top: hp(5),
    right: wp(4),
    zIndex: 1,
    overflow: "hidden",
  },
  settingBtnFill: {
    backgroundColor: "rgba(0,0,0,.7)",
  },
});
