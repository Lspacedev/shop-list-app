import React, { useEffect } from "react";
import { useState } from "react";
import { Link, router } from "expo-router";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";

type ListType = {
  id: number;
  name: string;
  category: string;
  notes: string;
  timestamp: string;
};

type ListProps = {
  list: ListType;
  assets: number[];
  selectList: (listId: number) => void;
  selector: boolean;
  setSelector: (bool: boolean) => void;
};

const ListCard: React.FC<ListProps> = ({
  list,
  assets,
  selectList,
  selector,
  setSelector,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isSelected, setIsSelcted] = useState(false);

  useEffect(() => {
    if (assets.indexOf(list.id) !== -1) {
      setIsSelcted(true);
    } else {
      setIsSelcted(false);
    }
  }, [assets]);
  const goToList = () => {
    router.push({
      pathname: "../[list]",
      params: { list: list.id },
    });
  };
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center", marginHorizontal: 10 }}
      onPress={selector ? () => selectList(list.id) : () => goToList()}
      onLongPress={() => {
        setSelector(true);
        selectList(list.id);
      }}
    >
      <View
        style={[
          styles.container,
          isSelected && { borderWidth: 2, borderColor: "grey" },
        ]}
      >
        <View style={styles.name}>
          <Text
            style={[
              { color: "#E5E7E6", fontSize: 20 },
              isSelected && { color: "grey" },
            ]}
          >
            {list && list.name}
          </Text>
        </View>
        <View style={styles.category}>
          <Text
            style={[
              { color: "#E5E7E6", fontSize: 20 },
              isSelected && { color: "grey" },
            ]}
          >
            {list && list.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ListCard;

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
