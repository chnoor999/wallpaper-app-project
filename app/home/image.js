import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { BlurView } from "expo-blur";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";

import MiniButtons from "../../components/imageDetail/MiniButtons";

const image = () => {
  const data = useLocalSearchParams();

  const getSize = () => {
    const aspectRatio = data?.imageWidth / data?.imageHeight;
    const height = wp(92) / aspectRatio;
    const width = wp(92);

    return {
      height: height,
      width: width,
    };
  };

  const onCrossHandler = () => {
    router.back();
  };

  return (
    <BlurView style={styles.blurView} intensity={60} tint="dark">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: data.webformatURL }}
            style={[styles.image, getSize()]}
          />
        </View>
        <View style={styles.btnsContainer}>
          <MiniButtons onPress={onCrossHandler} cross />
          <MiniButtons download delay={100} />
          <MiniButtons share delay={200} />
        </View>
      </View>
    </BlurView>
  );
};

export default memo(image);

const styles = StyleSheet.create({
  blurView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,.5)",
  },
  imageContainer: {
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: 12,
    overflow: "hidden",
  },
  btnsContainer: {
    flexDirection: "row",
    padding: hp(3),
    gap: wp(12),
  },
});
