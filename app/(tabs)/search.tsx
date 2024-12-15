import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  FlatList,
  Dimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import SearchBar from "@/components/Searchbar";
import { router, useFocusEffect } from "expo-router";
import type { RootState } from "@/store/store";
import { initialiseDb, readLists } from "@/db/db";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";

type InputType = string | NativeSyntheticEvent<TextInputChangeEventData>;
type ListType = {
  id: number;
  name: string;
  category: string;
  notes: string;
  timestamp: string;
};

const Search = () => {
  const [text, setText] = useState<InputType>("");
  const lists = useSelector((state: RootState) => state.lists.lists);
  const dispatch = useDispatch();

  const [results, setResults] = useState<ListType[]>([]);
  useFocusEffect(
    useCallback(() => {
      readLists(dispatch);
    }, [])
  );
  useEffect(() => {
    if (text !== "") {
      const filtered = lists.filter((list) =>
        list.name.includes(text as string)
      );
      console.log({ filtered, lists, text });
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [text]);
  const goToList = (id: number) => {
    router.push({
      pathname: "../[list]",
      params: { list: id },
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#040406", padding: 5 }}>
      <SearchBar name="Find lists" onChange={setText} />
      <View style={{ flex: 1, height: Dimensions.get("window").height - 100 }}>
        <FlatList
          style={{ flex: 1, paddingVertical: 20 }}
          contentContainerStyle={{ paddingBottom: 30 }}
          data={results}
          renderItem={({ item }) => {
            return (
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: "center",
                  marginHorizontal: 10,
                }}
                onPress={() => goToList(item.id)}
              >
                <View style={[styles.container]}>
                  <View style={styles.name}>
                    <Text style={[{ color: "#E5E7E6", fontSize: 20 }]}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={styles.category}>
                    <Text style={[{ color: "#E5E7E6", fontSize: 20 }]}>
                      {item.category}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};
export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    backgroundColor: "#242A2E",
    marginVertical: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderLeftColor: "#F97068",
    borderLeftWidth: 5,
    borderRadius: 5,
  },
  name: {},
  category: {},
  quantity: {},
  menuModal: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    right: 0,
    width: 200,
    height: 100,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    alignItems: "center",
    padding: 5,
  },
});
