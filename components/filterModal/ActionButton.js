import { Pressable, StyleSheet, Text } from "react-native";
import { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ActionButton = ({ children, isDark, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? "rgba(0, 0, 0, 0.6)"
            : "rgba(0, 0, 0, 0.079)",
        },
      ]}
    >
      <Text style={[styles.text, { color: isDark && "#fff" }]}>{children}</Text>
    </Pressable>
  );
};

export default memo(ActionButton);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: hp(1.2),
  },
  text: {
    fontSize: hp(2),
  },
});
