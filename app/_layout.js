import { Alert } from "react-native";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { DataContextProvider } from "../store/data-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import NetInfo from "@react-native-community/netinfo";

const _layout = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          "No Internet Connection",
          "Please check your internet connection and try again.",
          [{ text: "OK" }]
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <DataContextProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="home" />
            <Stack.Screen
              name="image/index"
              options={{ animation: "fade", presentation: "transparentModal" }}
            />
          </Stack>
        </DataContextProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default _layout;
