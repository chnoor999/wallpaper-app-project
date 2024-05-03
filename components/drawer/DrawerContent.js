import { StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { DrawerItemList } from "@react-navigation/drawer";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Screen from "../ui/Screen"

const DrawerContent = (prop) => {
  return (
    <Screen>

    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Pixels</Text>
      </View>
      <DrawerItemList {...prop} />
    </View>
    </Screen>
  );
};

export default memo(DrawerContent);

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    contentContainer:{
        paddingVertical:hp(5),
        alignItems:"center",
        justifyContent:"center",
    },
    title:{
        fontSize:hp(2.5),
        fontWeight:"700"
    }
});
