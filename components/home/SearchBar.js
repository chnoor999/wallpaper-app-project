import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { memo, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { debounce } from "lodash";
import { useDataContext } from "../../store/data-context";

const SearchBar = ({ inpRef }) => {
  const {setData, searchQuery, setSearchQuery, setCategorieName } = useDataContext();

  const onCrossBtn = () => {
    setData([])
    inpRef.current.clear();
    setSearchQuery("");
  };

  const handleInpValueChange = useCallback(
    debounce((txt) => {
      setData([])
      setSearchQuery(txt);
      setCategorieName(null);
    }, 500),
    []
  );

  return (
    <View style={styles.container}>
      <AntDesign
        style={styles.searchIcon}
        name="search1"
        size={hp("2.6")}
        color="rgba(0,0,0,.6)"
      />
      <TextInput
        ref={inpRef}
        placeholder="Search for photos..."
        style={styles.input}
        onChangeText={handleInpValueChange}
      />
      {searchQuery && (
        <Pressable style={styles.crossBtn} onPress={onCrossBtn}>
          <Entypo name="cross" size={hp("2.6")} color="#fff" />
        </Pressable>
      )}
    </View>
  );
};

export default memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp("1.4"),
    paddingVertical: hp("0.6"),
    borderRadius: 12,
    gap: hp("0.2"),
    backgroundColor: "rgba(0, 0, 0, 0.079)",
    marginBottom: hp(2),
    marginTop: hp(1),
    marginHorizontal: wp("5"),
  },
  searchIcon: {
    paddingHorizontal: wp("2"),
    paddingVertical: hp("1.2"),
  },
  input: {
    flex: 1,
    fontSize: hp("1.8"),
  },
  crossBtn: {
    paddingHorizontal: wp("2"),
    paddingVertical: hp("1.2"),
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
