import { Stack } from "expo-router";
import { DataContextProvider } from "../store/data-context";

const _layout = () => {
  return (
    <DataContextProvider>
      <Stack
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="home/index" />
      </Stack>
    </DataContextProvider>
  );
};

export default _layout;
