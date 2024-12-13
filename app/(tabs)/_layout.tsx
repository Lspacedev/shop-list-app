import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: "#1D1E2C",
        tabBarInactiveBackgroundColor: "#1D1E2C",
        tabBarActiveTintColor: "whitesmoke",
        tabBarStyle: {
          borderTopWidth: 0.3,
          borderTopColor: "black",
          elevation: 1,
          shadowColor: "#5bc4ff",
          shadowOpacity: 1,
          shadowOffset: {
            height: 1,
            width: 1,
          },
          shadowRadius: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "ShoppingList",
          headerTintColor: "white",

          headerStyle: {
            backgroundColor: "#1D1E2C",
            elevation: 0,
          },
          tabBarLabel: "Lists",
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
          tabBarLabel: "Search",

          tabBarIcon: ({ color }) => {
            return <Feather name="search" size={24} color="white" />;
          },
          tabBarStyle: {
            borderTopColor: "black",
          },
        }}
      />
    </Tabs>
  );
}
