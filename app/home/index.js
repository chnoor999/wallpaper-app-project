import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Screen from "../../components/ui/Screen";
import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import CategoriesList from "../../components/home/CategoriesList";
import ImagesList from "../../components/home/ImagesList";

const HoemScreen = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBar />
          <CategoriesList />
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
