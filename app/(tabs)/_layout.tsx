import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@/context/auth";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const { signOut } = useAuth();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={signOut} style={{ marginRight: 15 }}>
            <ThemedText>Logout</ThemedText>
          </TouchableOpacity>
        ),
        tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
