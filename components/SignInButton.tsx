import { StyleSheet, TouchableOpacity } from "react-native";
import {
  GoogleSignin,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";

import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

interface SignInButtonProps {
  onSignInSuccess: (user: User | null) => void;
}

export function SignInButton({ onSignInSuccess }: SignInButtonProps) {
  const backgroundColor = useThemeColor({}, "tint");

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const currentUser = GoogleSignin.getCurrentUser();
      onSignInSuccess(currentUser);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available");
      } else {
        console.log("Some other error:", error);
      }
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={signIn}
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
