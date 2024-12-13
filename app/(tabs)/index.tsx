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
import { useIsFocused } from "@react-navigation/native";
import { DeviceEventEmitter } from "react-native";

const Lists = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const lists = useSelector((state: RootState) => state.lists.lists);
  console.log({ isFocused, l: lists.length > 0 });
  useEffect(() => {
    initialiseDb();
    if (isFocused) {
      (async () => {
        const res = await readLists(dispatch);
        if (res) {
          setLoading(false);
        }
      })();
    }
  }, [isFocused]);
  // useEffect(() => {
  //   const subscription = DeviceEventEmitter.addListener(
  //     "hardwareBackPress",
  //     () => {
  //       setLoading(true);
  //       console.log("back press");
  //     }
  //   );

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  if (loading)
    return (
      <ActivityIndicator
        color={"#F97068"}
        style={{ flex: 1, backgroundColor: "#1D1E2C" }}
      />
    );
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#0e0f16", paddingVertical: 25 }}
    >
      <View>
        {lists.length > 0 ? (
          <FlatList
            data={lists}
            renderItem={({ item }) => {
              return <ListCard list={item} />;
            }}
          />
        ) : (
          <Text
            style={{
              textAlign: "center",
              margin: 25,
              color: "white",
            }}
          >
            No lists added
          </Text>
        )}
      </View>
      <FAB urlText="/addList" />
    </SafeAreaView>
  );
};
export default Lists;
