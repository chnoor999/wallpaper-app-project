import { ActivityIndicator, StyleSheet, View } from "react-native";
import { memo } from "react";
const LoadingOverlay = () => {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size={"large"} color={"#000"} />
    </View>
  );
};

export default memo(LoadingOverlay);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop:10,
    paddingBottom:20
  },
});
