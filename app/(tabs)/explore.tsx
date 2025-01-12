import { StyleSheet, Image, Platform, TouchableOpacity } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { SignInButton } from "@/components/SignInButton";
import * as ExpoGoogleAuthentication from "@heartbot/expo-google-authentication";
import { ExpoGoogleAuthenticationConfigureProps } from "@heartbot/expo-google-authentication";

GoogleSignin.configure();

GoogleSignin.configure({
  webClientId:
    "258145241027-jhpk3tmbhr23a6jlgpbiqbs08r8knh2t.apps.googleusercontent.com",
  iosClientId: "YOUR_IOS_CLIENT_ID",
});

const configureProps: ExpoGoogleAuthenticationConfigureProps = {
  webClientId:
    "258145241027-jhpk3tmbhr23a6jlgpbiqbs08r8knh2t.apps.googleusercontent.com",
  iOSClientId: "YOUR_IOS_CLIENT_ID",
};
ExpoGoogleAuthentication.configure(configureProps);
export default function TabTwoScreen() {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const login = async () => {
    const loginResponse = await ExpoGoogleAuthentication.login();
    console.log(loginResponse);
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(response);
      if (isSuccessResponse(response)) {
        console.log(response.data);
        setUserInfo(response.data);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            console.log("IN_PROGRESS");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            console.log("PLAY_SERVICES_NOT_AVAILABLE");
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{userInfo?.user?.email} asdas</ThemedText>
      </ThemedView>

      <Collapsible title="Google Sign In">
        <ThemedText>
          Sign in with your Google account to access additional features.
        </ThemedText>
        {userInfo ? (
          <>
            <ThemedText>Welcome, {userInfo.user.name}!</ThemedText>
            <ThemedText>Email: {userInfo.user.email}</ThemedText>
            <TouchableOpacity
              style={[styles.button, styles.signOutButton]}
              onPress={signOut}
            >
              <ThemedText style={styles.buttonText}>Sign Out</ThemedText>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.signOutButton]}
            onPress={login}
          >
            <ThemedText style={styles.buttonText}>Sign Out</ThemedText>
          </TouchableOpacity>
        )}
      </Collapsible>

      <ThemedText>
        This app includes example code to help you get started.
      </ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          and{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{" "}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the
          web version, press <ThemedText type="defaultSemiBold">w</ThemedText>{" "}
          in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For signine <ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to
          provide files for different screen densities
        </ThemedText>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ alignSelf: "center" }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText>{" "}
          to see how to load{" "}
          <ThemedText style={{ fontFamily: "SpaceMono" }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{" "}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook
          lets you inspect what the user's current color scheme is, and so you
          can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{" "}
          <ThemedText type="defaultSemiBold">
            components/HelloWave.tsx
          </ThemedText>{" "}
          component uses the powerful{" "}
          <ThemedText type="defaultSemiBold">
            react-native-reanimated
          </ThemedText>{" "}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The{" "}
              <ThemedText type="defaultSemiBold">
                components/ParallaxScrollView.tsx
              </ThemedText>{" "}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  signOutButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
