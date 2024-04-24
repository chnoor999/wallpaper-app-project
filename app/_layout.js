import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default _layout;
