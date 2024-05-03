import { Drawer } from "expo-router/drawer";

const _layout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "rgba(0, 0, 0, 0.4)",
        drawerActiveTintColor: "#fff",
      }}
    >
      <Drawer.Screen name="index" options={{ drawerLabel: "Home" }} />
      <Drawer.Screen
        name="favouritesWallpaper/index"
        options={{ drawerLabel: "Favourites" }}
      />
    </Drawer>
  );
};

export default _layout;
