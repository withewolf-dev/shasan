import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

interface SignInButtonProps {
  onSignInSuccess: () => Promise<void>;
}

export function SignInButton({ onSignInSuccess }: SignInButtonProps) {
  const backgroundColor = useThemeColor({}, "tint");

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onSignInSuccess}
      activeOpacity={0.8}
    >
      <ThemedText style={styles.buttonText}>Sign in with Google</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
