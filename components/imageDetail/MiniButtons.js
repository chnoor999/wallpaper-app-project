import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { memo } from "react";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

const MiniButtons = ({
  cross,
  download,
  share,
  delay,
  onPress,
  isLoading,
  favourite,
  fillFavourite,
}) => {
  return (
    <Animated.View entering={FadeInDown.springify().delay(delay)}>
      <Pressable onPress={onPress} style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size={hp(3)} color={"#fff"} />
        ) : (
          <>
            {cross && <Entypo name="cross" size={hp(3.4)} color="#fff" />}
            {download && (
              <MaterialIcons name="download" size={hp(3)} color="#fff" />
            )}
            {share && (
              <Ionicons name="share-social-sharp" size={hp(2.8)} color="#fff" />
            )}
            {favourite && (
              <FontAwesome
                name={fillFavourite ? "heart" : "heart-o"}
                size={hp(2.8)}
                color="#fff"
              />
            )}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default memo(MiniButtons);

const styles = StyleSheet.create({
  container: {
    width: hp(6),
    height: hp(6),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,.4)",
    padding: hp(1.4),
  },
});
