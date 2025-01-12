import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SignInButton } from "@/components/SignInButton";
import { useAuth } from "@/context/auth";

export default function SignIn() {
  const { signIn } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Welcome</ThemedText>
      <ThemedText style={styles.subtitle}>Sign in to continue</ThemedText>
      <SignInButton onSignInSuccess={signIn} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
});
