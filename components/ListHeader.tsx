import {
  Pressable,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { deleteList } from "@/db/db";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

type ListType = {
  id: number;
  name: string;
  category: string;
  notes: string;
  timestamp: string;
};
type PressType = {
  listId: number;
  itemId: number;
};
const ListHeader = (id: any) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<ListType>();

  const [openMenu, setOpenMenu] = useState(false);
  const listId = id.id.list;
  const lists: Array<ListType> = useSelector(
    (state: RootState) => state.lists?.lists
  );

  //const [list] = lists.filter((list) => list.id === Number(listId));

  useEffect(() => {
    const findList = lists.filter((list) => list.id === Number(listId));
    const listObj: ListType = findList[0];
    setList(listObj);
  }, [listId]);

  const goToLists = () => {
    router.push("/(tabs)");
  };
  const goToUpdate = () => {
    router.push({
      pathname: "/[list]/updateList",
      params: { list: listId },
    });
  };
  const removeList = async () => {
    setLoading(true);
    await deleteList(Number(listId));
    const data = await AsyncStorage.getItem("pressed");
    await AsyncStorage.removeItem("pressed");

    if (data) {
      const arr = JSON.parse(data);

      const filtered = arr.filter(
        (obj: PressType) => obj.listId !== Number(listId)
      );
      await AsyncStorage.setItem("pressed", JSON.stringify(filtered));
    }
    router.push("/");
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#505558", "#242A2E"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          paddingTop: StatusBar.currentHeight,
          height: 100,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <Pressable onPress={goToLists} style={{ flex: 1 }}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>
      <Text style={styles.text}>{list?.name}</Text>
      <Modal
        style={styles.menuModal}
        animationType="fade"
        transparent={true}
        visible={openMenu}
        onRequestClose={() => {
          setOpenMenu(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setOpenMenu(false);
          }}
        >
          <View style={{ backgroundColor: "transparent", flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.menu}>
                <Text
                  onPress={() => {
                    setOpenMenu(false);
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    textAlign: "right",
                  }}
                >
                  <EvilIcons name="close" size={24} color="black" />
                </Text>
                <Pressable
                  style={styles.menuItem}
                  onPress={() => {
                    goToUpdate();
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>
                <Pressable
                  style={styles.menuItem}
                  onPress={() => {
                    removeList();
                  }}
                >
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          setOpenMenu(true);
        }}
      >
        <SimpleLineIcons
          name="options-vertical"
          size={24}
          style={{
            color: "white",
            padding: 5,
            borderRadius: 50,
          }}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 5,
    borderBottomWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    flex: 8,
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
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
export default ListHeader;
