import { StyleSheet, Text, View } from "react-native";
import { memo, useMemo } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
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
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default memo(FilterModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
