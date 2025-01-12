import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@/context/auth";
import { ThemedText } from "@/components/ThemedText";

export default function TabLayout() {
  const { signOut } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={signOut} style={{ marginRight: 15 }}>
            <ThemedText>Logout</ThemedText>
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
    </Tabs>
  );
}
