import { StyleSheet } from "react-native";
import { memo } from "react";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const FilterModalBackdrop = ({ animatedIndex }) => {
  const overlayAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[styles.overlay, StyleSheet.absoluteFill, overlayAnimatedStyle]}
    >
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        style={StyleSheet.absoluteFill}
        intensity={5}
        tint="extraLight"
      ></BlurView>
    </Animated.View>
  );
};

export default memo(FilterModalBackdrop);

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,.5)",
    overflow: "hidden",
  },
});
