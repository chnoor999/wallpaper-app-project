import { ImageBackground, StyleSheet, View } from "react-native";
import { memo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";

import MyButton from "../components/ui/MyButton";

const WelcomeScreen = () => {
  return (
    <ImageBackground
      style={styles.bg}
      source={require("../assets/images/welcome.png")}
    >
      <Animated.View entering={FadeInDown.duration(600)} style={styles.bg}>
        <LinearGradient
          style={styles.gradient}
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "#fff",
            "#fff",
          ]}
        >
          <View style={styles.contentContainer}>
            <Animated.Text
              entering={FadeInDown.delay(400).springify()}
              style={styles.title}
            >
              Pixels
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.delay(500).springify()}
              style={styles.punchline}
            >
              Every Pixel Tells Story
            </Animated.Text>
            <MyButton onPress={() => router.push("home")}>
              Start Explore
            </MyButton>
          </View>
        </LinearGradient>
      </Animated.View>
    </ImageBackground>
  );
};

export default memo(WelcomeScreen);

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradient: {
    width: wp("100"),
    height: hp("90"),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: hp("10"),
    gap: hp("1.5"),
  },
  title: {
    fontSize: hp("4.8"),
    fontWeight: "700",
    color: "rgba(0,0,0,.9)",
  },
  punchline: {
    fontSize: hp("2"),
    fontWeight: "500",
    color: "rgba(0,0,0,.9)",
  },
});
