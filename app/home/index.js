import { ScrollView, StyleSheet, View } from "react-native";
import { memo, useRef } from "react";

import Screen from "../../components/ui/Screen";
import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import CategoriesList from "../../components/home/CategoriesList";
import ImagesList from "../../components/home/ImagesList";

const HoemScreen = () => {
  const inpRef = useRef(null);

  return (
    <Screen>
      <View style={styles.container}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBar inpRef={inpRef} />
          <CategoriesList inpRef={inpRef} />
          <ImagesList />
        </ScrollView>
      </View>
    </Screen>
  );
};

export default memo(HoemScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
