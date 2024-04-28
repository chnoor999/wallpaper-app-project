import { ActivityIndicator, StyleSheet, View } from "react-native";
import { memo, useMemo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDataContext } from "../../store/data-context";

const LoadingOverlay = () => {
  const { data } = useDataContext();
  const dataLength = useMemo(() => data.length, [data]);

  return (
    <View
      style={[
        styles.container,
        dataLength == 0 ? styles.withNoDataLength : styles.withDataLength,
      ]}
    >
      <ActivityIndicator size={"large"} color={"#000"} />
    </View>
  );
};

export default memo(LoadingOverlay);

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    alignItems: "center",
    justifyContent: "center",
  },
  withNoDataLength: {
    paddingTop: hp(10),
  },
  withDataLength: {
    paddingVertical: hp(2),
  },
});
