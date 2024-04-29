import { StyleSheet, View } from "react-native";
import { memo, useCallback } from "react";
import { useDataContext } from "../../store/data-context";
import { MasonryFlashList } from "@shopify/flash-list";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getColumnCount } from "../../util/common";
import { debounce } from "lodash";

import ImagesListItem from "./ImagesListItem";
import LoadingOverlay from "../ui/LoadingOverlay";

const ImagesList = ({ scrollRef }) => {
  const { data, setPaginationOption } = useDataContext();

  const handleEndReached = useCallback(
    debounce(() => {
      setPaginationOption((pre) => {
        return { isAppend: true, page: pre.page + 1 };
      });
    }, 1000),
    []
  );

  if (data.length == 0) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <MasonryFlashList
        onEndReached={handleEndReached}
        ref={scrollRef}
        data={data}
        numColumns={getColumnCount()}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
        renderItem={({ item, index }) => {
          return <ImagesListItem item={item} index={index} />;
        }}
        ListFooterComponent={<LoadingOverlay />}
      />
    </View>
  );
};

export default memo(ImagesList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 3,
    width: wp(100),
  },
  contentContainerStyle: {
    paddingHorizontal: wp(4),
  },
});
