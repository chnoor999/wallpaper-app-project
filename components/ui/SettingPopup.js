import { StyleSheet, Switch, Text, View } from "react-native";
import { memo } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDataContext } from "../../store/data-context";

const SettingPopup = () => {
  const {
    setData,
    setImagesParams,
    imagesSetting,
    setImagesSetting,
    setIsNoResults,
  } = useDataContext();

  const handleSwitchChange = (type) => {
    setIsNoResults(false);
    setData([]);
    setImagesParams((pre) => {
      return {
        ...pre,
        page: 1,
        append: false,
      };
    });
    setImagesSetting((pre) => {
      return {
        ...pre,
        [type]: !pre[type],
      };
    });
  };

  return (
    <View style={styles.contentContainer}>
      <View style={[styles.listContainer, styles.forBorder]}>
        <Text style={styles.txt}>Safe Search</Text>
        <Switch
          onChange={() => handleSwitchChange("safeSearchOn")}
          value={imagesSetting.safeSearchOn}
        />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.txt}>Editor Choice</Text>
        <Switch
          onChange={() => handleSwitchChange("editorChoiceOn")}
          value={imagesSetting.editorChoiceOn}
        />
      </View>
    </View>
  );
};

export default memo(SettingPopup);

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "rgba(0,0,0,.6)",
    width: wp(70),
    borderRadius: 12,
    overflow: "hidden",
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(2),
  },
  txt: {
    fontSize: hp(1.8),
    color: "#fff",
  },
  forBorder: {
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,.4)",
  },
});
