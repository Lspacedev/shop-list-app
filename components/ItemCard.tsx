import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { View, Text, Dimensions, StyleSheet, Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { deleteItem } from "@/db/db";
type ItemType = {
  id: number;
  name: string;
  category: string;
  notes: string;
  quantity: number;
  timestamp: string;
  price: number;
};

type ItemProps = {
  item: ItemType;
  pressedItems: Number[];
  addToPressed: (id: Number) => void;
};

const ItemCard: React.FC<ItemProps> = ({
  item,
  pressedItems,
  addToPressed,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  useEffect(() => {
    if (pressedItems.indexOf(item.id) !== -1) {
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
    router.back();
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: pressed ? "#575959" : "#0e0f16" },
        isPressed && {
          borderLeftColor: "#e39e9a",
          borderLeftWidth: 5,
        },
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
        <Text
          style={[
            styles.text,
            isPressed && { textDecorationLine: "line-through", color: "grey" },
          ]}
        >
          {item.name}
        </Text>

        <View style={{ flex: 1 }}>
          <Text
            style={[
              { color: "white", fontSize: 10 },
              isPressed && {
                color: "grey",
              },
            ]}
          >
            Qty:
          </Text>
          <Text
            style={[
              styles.text,
              isPressed && {
                textDecorationLine: "line-through",
                color: "grey",
              },
            ]}
          >
            {item.quantity}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              { color: "white", fontSize: 10 },
              isPressed && {
                color: "grey",
              },
            ]}
          >
            Price:
          </Text>

          <Text
            style={[
              styles.text,
              isPressed && {
                textDecorationLine: "line-through",
                color: "grey",
              },
            ]}
          >
            {item.price}
          </Text>
        </View>
        <Pressable
          onPress={isPressed ? () => removeItem() : () => goToUpdate()}
          style={{ flex: 1 }}
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
                margin: 10,
                textAlign: "right",
              }}
            />
          )}
        </Pressable>
      </View>
      <View style={{ flex: 2 }}>
        <Text
          style={[
            { color: "whitesmoke", fontSize: 14 },
            isPressed && { textDecorationLine: "line-through", color: "grey" },
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
    height: 90,
    marginHorizontal: 10,
    borderLeftColor: "#F97068",
    borderLeftWidth: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },

  text: {
    flex: 1,
    fontSize: 18,
    color: "white",
  },
  quantity: {},
});
