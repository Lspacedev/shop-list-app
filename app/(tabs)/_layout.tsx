import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: "black",
        tabBarInactiveBackgroundColor: "#333333",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => {
            return <FontAwesome5 name="list-alt" size={24} color="white" />;
          },
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerTitle: "Search",
          headerStyle: {},
          tabBarLabel: "",

          tabBarIcon: ({ color }) => {
            return <Feather name="search" size={24} color="search" />;
          },
        }}
      />
    </Tabs>
  );
}
