import { Alert, Linking, StyleSheet, Text, View } from "react-native";
import { memo, useState } from "react";
import { BlurView } from "expo-blur";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";

import MiniButtons from "../../components/imageDetail/MiniButtons";

const image = () => {
  const data = useLocalSearchParams();
  const fileName = data?.previewURL?.split("/").pop();
  const imageUrl = data?.webformatURL;
  const filePath = FileSystem.documentDirectory + fileName;

  const [loadingStatus, setLoadingStatus] = useState("");

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

  const downloadImage = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
      return uri;
    } catch (err) {
      console.log(err);
    }
  };

  const onDownloadHandler = async () => {
    try {
      setLoadingStatus("downloading");
      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (!granted) {
        Alert.alert(
          "Permission Denied",
          "Please allow access to media library in order to download the image.",
          [{ text: "go to setting", onPress: () => Linking.openSettings() }]
        );
        setLoadingStatus("");
        return;
      }
      const uri = await downloadImage();
      await MediaLibrary.saveToLibraryAsync(uri);
      setLoadingStatus("");
      Toast.show({ position: "bottom" });
    } catch (err) {
      setLoadingStatus("");
      console.log(err);
    }
  };

  const onShareHandler = async () => {
    try {
      setLoadingStatus("sharing");
      const uri = await downloadImage();
      await Sharing.shareAsync(uri);
      setLoadingStatus("");
    } catch (err) {
      setLoadingStatus("");
      console.log(err);
    }
  };

  const toastConfig = {
    success: () => {
      return (
        <View style={styles.toastContainer}>
          <Text style={styles.toastText}>Image downloaded</Text>
        </View>
      );
    },
  };

  return (
    <BlurView style={styles.blurView} intensity={60} tint="dark">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={[styles.image, getSize()]} />
        </View>
        <View style={styles.btnsContainer}>
          <MiniButtons onPress={onCrossHandler} cross />
          <MiniButtons
            isLoading={loadingStatus == "downloading"}
            onPress={onDownloadHandler}
            download
            delay={100}
          />
          <MiniButtons
            isLoading={loadingStatus == "sharing"}
            onPress={onShareHandler}
            share
            delay={200}
          />
        </View>
      </View>
      <Toast config={toastConfig} />
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
    backgroundColor: "rgba(0,0,0,.6)",
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
  toastContainer: {
    padding: hp(2),
    paddingHorizontal: hp(4),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,.4)",
  },
  toastText: {
    color: "#fff",
    fontSize: hp(1.8),
  },
});
