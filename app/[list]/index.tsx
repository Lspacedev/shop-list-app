import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import FAB from "@/components/FAB";
import ItemCard from "@/components/ItemCard";
import type { RootState } from "@/store/store";
import { initialiseDb, readItems } from "@/db/db";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { DeviceEventEmitter } from "react-native";
import { router, useFocusEffect } from "expo-router";

type PressType = {
  listId: number;
  itemId: number;
};
const List = () => {
  const [pressedItems, setPressedItems] = useState<PressType[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { list } = useLocalSearchParams();
  const isFocused = useIsFocused();

  const items = useSelector((state: RootState) => state.lists.items);
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      "hardwareBackPress",
      () => {
        storeData("pressed", JSON.stringify(pressedItems));
      }
    );

    return () => {
      subscription.remove();
    };
  }, [pressedItems]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await readItems(Number(list), dispatch);
        setLoading(false);
      })();
    }, [])
  );

  useEffect(() => {
    getData();
  }, [isFocused]);

  const storeData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("pressed");
      if (data) {
        setPressedItems(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  const addToPressed = async (id: number) => {
    const filteredItem = pressedItems.filter((press) => press.itemId === id);
    if (filteredItem.length > 0) {
      const filtered = pressedItems.filter((press) => press.itemId !== id);
      setPressedItems(filtered);
      await AsyncStorage.setItem("pressed", JSON.stringify(filtered));
    } else {
      const pressObj: PressType = { listId: Number(list), itemId: id };
      const arr = [...pressedItems, pressObj];
      setPressedItems((prev) => [...prev, pressObj]);
      await AsyncStorage.setItem("pressed", JSON.stringify(arr));
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#040406", paddingVertical: 25 }}
    >
      <View>
        {!loading && items ? (
          <FlatList
            data={items}
            ListEmptyComponent={
              <Text
                style={{
                  textAlign: "center",
                  margin: 25,
                  color: "white",
                  fontSize: 15,
                }}
              >
                No items added
              </Text>
            }
            contentContainerStyle={{ justifyContent: "center" }}
            renderItem={({ item }) => {
              return (
                <ItemCard
                  item={item}
                  pressedItems={pressedItems}
                  addToPressed={addToPressed}
                />
              );
            }}
          />
        ) : (
          <Text></Text>
          // <ActivityIndicator color="white" style={{ flex: 1 }} />
        )}
      </View>

      <FAB urlText={`../${list}/addItem`} />
    </SafeAreaView>
  );
};
export default List;
