import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { memo, useMemo } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDataContext } from "../../store/data-context";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const AppliedFiltersList = () => {
  const { setData, activeFilter, setActiveFilter, setSelectedFilters } =
    useDataContext();

  const activeFiltersLength = useMemo(
    () => activeFilter?.length,
    [activeFilter]
  );

  const deletefilterFromState = (state, type) => {
    setData([]);
    state((pre) => {
      return pre.map((mapItem) => {
        if (mapItem.type == type) {
          return {
            ...mapItem,
            name: "",
          };
        } else {
          return mapItem;
        }
      });
    });
  };

  const handleDeleteActiveFilters = (type) => {
    deletefilterFromState(setActiveFilter, type);
    deletefilterFromState(setSelectedFilters, type);
  };

  return (
    <View>
      <FlatList
        horizontal
        data={activeFilter}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item, index }) => {
          return (
            item.name && (
              <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 3 }}
                style={[
                  index != activeFiltersLength - 1 && styles.spacing,
                  styles.gradient,
                ]}
                colors={["rgba(0, 0, 0, 0.079)", "rgba(0, 0, 0, 0.6)"]}
              >
                <View style={styles.contentContainer}>
                  {item.type == "colors" ? (
                    <View
                      style={[styles.colorBox, { backgroundColor: item.name }]}
                    />
                  ) : (
                    <Text style={styles.filterName}>{item.name}</Text>
                  )}
                  <Pressable
                    onPress={() => handleDeleteActiveFilters(item.type)}
                    style={styles.crossContainer}
                  >
                    <Entypo name="cross" size={hp(1.7)} color={"#fff"} />
                  </Pressable>
                </View>
              </LinearGradient>
            )
          );
        }}
      />
    </View>
  );
};

export default memo(AppliedFiltersList);

const styles = StyleSheet.create({
  gradient: {
    marginBottom: hp(2),
    borderRadius: 12,
  },
  contentContainer: {
    paddingVertical: hp("1"),
    paddingHorizontal: wp("3"),
    gap: wp(3),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  contentContainerStyle: {
    paddingHorizontal: wp(3),
  },
  filterName: {
    fontSize: hp(1.7),
  },
  colorBox: {
    width: wp(9.5),
    height: hp(2.5),
    borderRadius: 6,
  },
  crossContainer: {
    padding: hp(0.5),
    paddingHorizontal: hp(0.6),
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  spacing: {
    marginRight: wp(3),
  },
});
