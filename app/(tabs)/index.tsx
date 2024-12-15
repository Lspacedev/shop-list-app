import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import FAB from "@/components/FAB";
import ListCard from "@/components/ListCard";
import type { RootState } from "@/store/store";
import { initialiseDb, readLists } from "@/db/db";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { DeviceEventEmitter } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { deleteList } from "@/db/db";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
type PressType = {
  listId: number;
  itemId: number;
};
const Lists = () => {
  const dispatch = useDispatch();
  const [assets, setAssets] = useState<number[]>([]);
  const [selector, setSelector] = useState(false);
  const [show, setShow] = useState(false);

  const isFocused = useIsFocused();
  const lists = useSelector((state: RootState) => state.lists.lists);
  useEffect(() => {
    initialiseDb();
  }, []);
  // useEffect(() => {
  //   initialiseDb();
  //   if (isFocused) {
  //     (async () => {
  //       const res = await readLists(dispatch);
  //       if (res) {
  //         setLoading(false);
  //       }
  //     })();
  //   }
  // }, [isFocused]);
  useFocusEffect(
    useCallback(() => {
      readLists(dispatch);
    }, [])
  );
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      "hardwareBackPress",
      () => {
        console.log("back press");
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);
  useEffect(() => {
    if (assets.length > 0) {
      setShow(true);
    } else {
      setSelector(false);
      setShow(false);
    }
  }, [assets]);

  const selectList = async (listId: number) => {
    const arr = [...assets];

    const foundList = arr.filter((id) => id === listId);
    if (foundList.length > 0) {
      const filteredArr = assets.filter((id) => id !== listId);
      setAssets(filteredArr);
    } else {
      setAssets((prev) => [...prev, listId]);
    }
  };
  const deleteLists = async () => {
    let arr: PressType[] = [];
    const data = await AsyncStorage.getItem("pressed");

    if (data) {
      arr = JSON.parse(data);
    }
    if (assets.length > 0) {
      Promise.all(
        assets.map(async (listId) => {
          await deleteList(listId);
          arr = arr.filter((obj: PressType) => obj.listId !== Number(listId));

          await readLists(dispatch);
        })
      );
      await AsyncStorage.setItem("pressed", JSON.stringify(arr));

      setAssets([]);
      setShow(false);
    } else {
      setShow(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#040406" }}>
      <View style={{ flex: 1, height: Dimensions.get("window").height - 100 }}>
        <FlatList
          style={{ flex: 1, paddingVertical: 20 }}
          contentContainerStyle={{ paddingBottom: 30 }}
          data={lists}
          renderItem={({ item }) => {
            return (
              <ListCard
                list={item}
                assets={assets}
                selectList={selectList}
                selector={selector}
                setSelector={(bool) => setSelector(bool)}
              />
            );
          }}
        />
      </View>

      {show ? (
        <Pressable
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey",
            position: "absolute",
            bottom: 30,
            right: 30,
          }}
          onPress={() => deleteLists()}
        >
          <MaterialIcons name="delete" size={24} color="black" />
        </Pressable>
      ) : (
        <FAB urlText="/addList" />
      )}
    </SafeAreaView>
  );
};
export default Lists;
const styles = StyleSheet.create({
  options: {
    position: "absolute",
    bottom: -10,
    height: 50,
    backgroundColor: "grey",
    zIndex: 1,
  },
});
