import { Stack } from "expo-router";
import { DataContextProvider } from "../store/data-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const _layout = () => {
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
            <Stack.Screen name="home/index" />
            <Stack.Screen name="home/image" />
          </Stack>
        </DataContextProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default _layout;
