import { FlatList, StyleSheet, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { getImages } from "../../util/api";

import ImagesListItem from "./ImagesListItem";

const ImagesList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getImages();
      setData(data);
    })();
  }, []);

  return (
    <View>
      <FlatList
        data={data.hits}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return <ImagesListItem item={item} />;
        }}
      />
    </View>
  );
};

export default memo(ImagesList);

const styles = StyleSheet.create({});
