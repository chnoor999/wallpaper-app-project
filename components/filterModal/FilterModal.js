import { StyleSheet, Text, View } from "react-native";
import { memo, useCallback, useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDataContext } from "../../store/data-context";

import FilterModalBackdrop from "./FilterModalBackdrop";
import FilterList from "./FilterList";
import ActionButton from "./ActionButton";

const FilterModal = ({ filterModalRef }) => {
  const {
    setData,
    setImagesParams,
    setSelectedFilters,
    selectedFilters,
    setIsNoResults,
  } = useDataContext();

  const snapPoints = useMemo(() => ["75%"], []);

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
    let applyFilter = false;
    selectedFilters.map((item) => {
      if (item.name.length > 1) applyFilter = true;
    });
    if (!applyFilter) return;

    setIsNoResults(false);
    setData([]);
    setImagesParams((pre) => {
      return {
        ...pre,
        activeFilters: selectedFilters,
        page: 1,
        append: false,
      };
    });
    filterModalRef?.current.close();
  }, [selectedFilters]);

  const handleReset = useCallback(() => {
    setIsNoResults(false)
    setData([]);
    setSelectedFilters((pre) => {
      return pre.map((mapItem) => {
        return {
          ...mapItem,
          name: "",
        };
      });
    });
    setImagesParams((pre) => {
      return {
        ...pre,
        activeFilters: [],
        page: 1,
        append: false,
      };
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
