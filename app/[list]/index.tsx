import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import FAB from "@/components/FAB";
import ItemCard from "@/components/ItemCard";
import type { RootState } from "@/store/store";
import { initialiseDb, readItems } from "@/db/db";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const List = () => {
  const [pressedItems, setPressedItems] = useState<Number[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { list } = useLocalSearchParams();
  const isFocused = useIsFocused();

  const items = useSelector((state: RootState) => state.lists.items);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        await readItems(Number(list), dispatch);
        setLoading(false);
      })();
    }
  }, [isFocused]);
  // useEffect(() => {
  //   if (!isFocused) {
  //     console.log("save to storage");
  //     storeData("pressed", JSON.stringify(pressedItems));
  //   } else {
  //     console.log("get from storage");
  //     getData();
  //   }
  // }, [isFocused]);
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
  const addToPressed = (id: Number) => {
    const filteredItem = pressedItems.filter((itemId) => itemId === id);
    if (filteredItem.length > 0) {
      setPressedItems((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setPressedItems((prev) => [...prev, id]);
    }
  };

  if (loading) return <ActivityIndicator />;
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#242A2E", paddingVertical: 25 }}
    >
      <View>
        {items.length > 0 ? (
          <FlatList
            data={items}
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
          <Text
            style={{
              textAlign: "center",
              margin: 25,
            }}
          >
            No items added
          </Text>
        )}
      </View>

      <FAB urlText={`../${list}/addItem`} />
    </SafeAreaView>
  );
};
export default List;
