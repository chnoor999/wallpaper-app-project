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
  const {
    setData,
    setImagesParams,
    setSelectedFilters,
    imagesParams,
    setIsNoResults,
  } = useDataContext();

  const activeFiltersLength = useMemo(
    () => imagesParams.activeFilter?.length,
    [imagesParams.activeFilter]
  );

  const handleDeleteActiveFilters = (type) => {
    setIsNoResults(false);
    setData([]);

    setImagesParams((pre) => {
      return {
        ...pre,
        activeFilters: pre.activeFilters.map((mapItem) => {
          if (mapItem.type == type) {
            return {
              ...mapItem,
              name: "",
            };
          } else {
            return mapItem;
          }
        }),
        page: 1,
        append: false,
      };
    });
    setSelectedFilters((pre) => {
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

  return (
    <View>
      <FlatList
        horizontal
        data={imagesParams.activeFilters}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(item) => item.type}
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
