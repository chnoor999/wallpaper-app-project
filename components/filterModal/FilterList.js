import { StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { Filters } from "../../util/data";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

import OutlineButtonItem from "../home/OutLineButtonItem";
import ColorBox from "./ColorBox";

const FilterList = ({ onPress, selectedFilters }) => {
  return (
    <View style={styles.container}>
      {Object.keys(Filters).map((mapItems, index) => {
        return (
          <Animated.View
            entering={FadeInDown.delay(index * 65)
              .springify()
              .damping(11)}
            style={styles.container}
            key={mapItems}
          >
            <Text style={styles.filterTypes}>
              {mapItems.charAt(0).toUpperCase() + mapItems.slice(1)}
            </Text>
            <View style={styles.filterNameContainer}>
              {Filters[mapItems].map((item) => {
                return mapItems == "colors" ? (
                  <ColorBox
                    onPress={() => onPress(mapItems, item)}
                    isActive={selectedFilters}
                    color={item}
                    key={item}
                  />
                ) : (
                  <OutlineButtonItem
                    key={item}
                    onPress={() => onPress(mapItems, item)}
                    item={item}
                    isForFilterModal
                    isActive={selectedFilters}
                  />
                );
              })}
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default memo(FilterList);

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(1.5),
  },
  filterTypes: {
    fontSize: hp(2.2),
    fontWeight: "500",
    color: "rgba(0,0,0,.9)",
    marginBottom: hp(1),
  },
  filterNameContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
