import { ScrollView, StyleSheet, View } from "react-native";
import { memo, useRef } from "react";

import Screen from "../../components/ui/Screen";
import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import CategoriesList from "../../components/home/CategoriesList";
import ImagesList from "../../components/home/ImagesList";
import FilterModal from "../../components/filterModal/FilterModal";
import AppliedFiltersList from "../../components/filterModal/AppliedFiltersList";

const HomeScreen = () => {
  const inpRef = useRef(null);
  const filterModalRef = useRef(null);

  return (
    <Screen>
      <View style={styles.container}>
        <Header filterModalRef={filterModalRef} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBar inpRef={inpRef} />
          <CategoriesList inpRef={inpRef} />
          <AppliedFiltersList />
          <ImagesList />
        </ScrollView>
        <FilterModal filterModalRef={filterModalRef} />
      </View>
    </Screen>
  );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
