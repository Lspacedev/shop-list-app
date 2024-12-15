import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { View, Text, Dimensions, StyleSheet, Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { deleteItem, readItems } from "@/db/db";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";

type ItemType = {
  id: number;
  name: string;
  category: string;
  notes: string;
  quantity: number;
  timestamp: string;
  price: number;
};

type PressType = {
  listId: number;
  itemId: number;
};
type ItemProps = {
  item: ItemType;
  pressedItems: PressType[];
  addToPressed: (id: number) => void;
};

const ItemCard: React.FC<ItemProps> = ({
  item,
  pressedItems,
  addToPressed,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const { list } = useLocalSearchParams();

  useEffect(() => {
    const filtered = pressedItems.filter(
      (pressed) => pressed.itemId === item.id
    );
    if (filtered.length > 0) {
      setIsPressed(true);
    } else {
      setIsPressed(false);
    }
  }, [pressedItems]);
  const goToUpdate = () => {
    router.push({
      pathname: "../[item]/updateItem",
      params: { item: item.id },
    });
  };
  const removeItem = async () => {
    await deleteItem(item.id);
    addToPressed(item.id);
    readItems(Number(list), dispatch);
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: pressed ? "#575959" : "#242A2E" },
      ]}
      onPress={() => addToPressed(item.id)}
    >
      <View
        style={{
          flex: 4,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isPressed ? (
          <AntDesign
            name="checkcircle"
            size={24}
            color="#F97068"
            style={{ marginHorizontal: 10 }}
          />
        ) : (
          <MaterialIcons
            name="radio-button-unchecked"
            size={24}
            color="white"
            style={{ marginHorizontal: 10 }}
          />
        )}
        <Text
          style={[
            styles.text,
            isPressed && { textDecorationLine: "line-through", color: "grey" },
          ]}
        >
          {item.name}
        </Text>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text
            style={[
              { fontSize: 14, color: "white" },
              isPressed && {
                textDecorationLine: "line-through",
                color: "grey",
              },
            ]}
          >
            {item.quantity}
          </Text>
        </View>
        <View
          style={{ flex: 2, flexDirection: "row", justifyContent: "center" }}
        >
          <Text
            style={[
              { fontSize: 14, color: "white" },
              isPressed && {
                textDecorationLine: "line-through",
                color: "grey",
              },
            ]}
          >
            {`R${item.price}`}
          </Text>
        </View>
        <Pressable
          onPress={isPressed ? () => removeItem() : () => goToUpdate()}
          style={{ flex: 2 }}
        >
          {isPressed ? (
            <EvilIcons
              name="close"
              size={24}
              color="white"
              style={{
                padding: 0,
                margin: 10,
                textAlign: "right",
              }}
            />
          ) : (
            <MaterialIcons
              name="edit"
              size={24}
              color="white"
              style={{
                padding: 0,
                marginHorizontal: 10,
                textAlign: "right",
              }}
            />
          )}
        </Pressable>
      </View>
      <View style={{ flex: 2 }}>
        <Text
          style={[
            { color: "whitesmoke", fontSize: 10, marginHorizontal: 45 },
            isPressed && {
              textDecorationLine: "line-through",
              color: "grey",
            },
          ]}
        >
          {item.notes}
        </Text>
      </View>
    </Pressable>
  );
};
export default ItemCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    marginHorizontal: 10,
    marginVertical: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  text: {
    flex: 3,
    fontSize: 18,
    color: "white",
  },
  quantity: {},
});
