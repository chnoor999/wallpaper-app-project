import { StyleSheet, Text, View } from "react-native";
import { memo, useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import FilterModalBackdrop from "./FilterModalBackdrop";

const FilterModal = ({ filterModalRef }) => {
  const snapPoints = useMemo(() => ["75%"], []);

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
  },
  filterTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "rgba(0,0,0,.9)",
  },
});
