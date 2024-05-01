import { StyleSheet, View } from "react-native";
import { memo, useCallback } from "react";
import { useDataContext } from "../../store/data-context";
import { MasonryFlashList } from "@shopify/flash-list";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getColumnCount } from "../../util/common";
import { debounce } from "lodash";
import { router } from "expo-router";

import ImagesListItem from "./ImagesListItem";
import LoadingOverlay from "../ui/LoadingOverlay";
import MessageOverlay from "../ui/MessageOverlay";

const ImagesList = ({ scrollRef }) => {
  const { data, setImagesParams, isNoResults } = useDataContext();

  const handleEndReached = useCallback(
    debounce(() => {
      setImagesParams((pre) => {
        return {
          ...pre,
          page: pre.page + 1,
          append: true,
        };
      });
    }, 1000),
    []
  );

  const handleListPress = (item) => {
    router.push({ pathname: "home/image", params: item });
  };

  if (isNoResults && data.length == 0) {
    return <MessageOverlay>No Results Found!</MessageOverlay>;
  }

  if (data.length == 0) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <MasonryFlashList
        onEndReached={isNoResults && data.length ? null : handleEndReached}
        ref={scrollRef}
        data={data}
        numColumns={getColumnCount()}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={200}
        renderItem={({ item, index }) => {
          return (
            <ImagesListItem
              onPress={() => handleListPress(item)}
              item={item}
              index={index}
            />
          );
        }}
        ListFooterComponent={
          isNoResults && data.length ? (
            <MessageOverlay>No More Results</MessageOverlay>
          ) : (
            <LoadingOverlay />
          )
        }
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
