import { SafeAreaView, StyleSheet } from "react-native";
import { memo } from "react";

import Constants from "expo-constants";

const Screen = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default memo(Screen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor:"#fff"
  },
});
