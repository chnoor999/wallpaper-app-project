import { StyleSheet, Text, View } from "react-native";
import { memo, useCallback, useMemo, useState } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import FilterModalBackdrop from "./FilterModalBackdrop";
import FilterList from "./FilterList";
import ActionButton from "../filterModal/ActionButton";
import { useDataContext } from "../../store/data-context";

const FilterModal = ({ filterModalRef }) => {
  const { setActiveFilter } = useDataContext();

  const snapPoints = useMemo(() => ["75%"], []);

  const [selectedFilters, setSelectedFilters] = useState([
    { type: "order", name: "" },
    { type: "orientation", name: "" },
    { type: "type", name: "" },
    { type: "colors", name: "" },
  ]);

  const handleFilterPress = useCallback((filterType, item) => {
    setSelectedFilters((pre) => {
      return pre.map((mapItem) => {
        if (mapItem.type == filterType) {
          return {
            ...mapItem,
            name: mapItem.name != item ? item : "",
          };
        } else {
          return mapItem;
        }
      });
    });
  }, []);

  const handleAppy = useCallback(() => {
    let filterURL = "";
    selectedFilters.map((mapItem) => {
      if (mapItem.name) {
        filterURL += `&${
          mapItem.type == "type" ? "image_type" : mapItem.type
        }=${mapItem.name}`;
      }
    });

    if (filterURL) {
      setActiveFilter(filterURL);
      filterModalRef?.current.close();
    }
  }, [selectedFilters]);

  const handleReset = useCallback(() => {
    setActiveFilter("");
    setSelectedFilters((pre) => {
      return pre.map((mapItem) => {
        return {
          ...mapItem,
          name: "",
        };
      });
    });
    filterModalRef?.current.close();
  }, []);

  return (
    <BottomSheetModal
      ref={filterModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={FilterModalBackdrop}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <Text style={styles.filterTitle}>Filters</Text>
          <FilterList
            selectedFilters={selectedFilters}
            onPress={handleFilterPress}
          />
          <View style={styles.btnsContainer}>
            <View style={styles.btnContaier}>
              <ActionButton onPress={handleReset}>Reset</ActionButton>
            </View>
            <View style={styles.btnContaier}>
              <ActionButton onPress={handleAppy} isDark>
                Apply
              </ActionButton>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default memo(FilterModal);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(4),
    gap: hp(1.5),
  },
  filterTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "rgba(0,0,0,.9)",
  },
  btnsContainer: {
    flexDirection: "row",
    gap: hp(2),
    marginTop: hp(2.5),
  },
  btnContaier: {
    flex: 1,
  },
});
