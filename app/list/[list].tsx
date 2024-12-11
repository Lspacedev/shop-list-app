import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import FAB from "@/components/FAB";
import ListCard from "@/components/ListCard";
import type { RootState } from "@/store/store";
import { initialiseDb, readLists } from "@/db/db";
import { useDispatch, useSelector } from "react-redux";

const List = () => {
  const dispatch = useDispatch();

  //const lists = useSelector((state: RootState) => state!.lists!.lists);

  //   useEffect(() => {
  //     initialiseDb();
  //     readLists(dispatch);
  //   }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* <View>
        {lists.length > 0 ? (
          <FlatList
            data={lists}
            contentContainerStyle={{ justifyContent: "center" }}
            renderItem={({ item }) => {
              return <ListCard list={item} />;
            }}
          />
        ) : (
          <Text
            style={{
              textAlign: "center",
              margin: 25,
            }}
          >
            No lists added
          </Text>
        )}
      </View> */}
      {/* <FAB /> */}
      <Text
        style={{
          textAlign: "center",
          margin: 25,
        }}
      >
        Items
      </Text>
      <FAB urlText="/list/addItem" />
    </SafeAreaView>
  );
};
export default List;
