import { StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const MessageOverlay = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{children}</Text>
    </View>
  );
};

export default memo(MessageOverlay);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  txt: {
    fontSize: hp(2),
    fontWeight: "500",
  },
});
