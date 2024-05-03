import { Drawer } from "expo-router/drawer";

import DrawerContent from "../../components/drawer/DrawerContent";

const _layout = () => {
  return (
    <Drawer
      drawerContent={(prop) => <DrawerContent {...prop} />}
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
