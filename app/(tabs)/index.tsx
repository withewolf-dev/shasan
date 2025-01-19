import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const InstagramDM = () => {
  const injectedJS = `
    const hideSVG = () => {
      const svgElement = document.querySelector('svg[aria-label="Back"]');
      if (svgElement) {
        svgElement.style.display = 'none';
        console.log('SVG element hidden successfully!');
        observer.disconnect(); // Stop observing once the element is hidden
      } else {
        console.log('SVG element not found yet...');
      }
    };

    // Set up a MutationObserver to monitor DOM changes
    const observer = new MutationObserver(() => {
      hideSVG();
    });

    // Start observing the document body for added nodes
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial call in case the SVG is already present
    hideSVG();
  `;
  return (
    <View style={styles.container}>
      <WebView
        onTap={() => {
          console.log("Tapped");
        }}
        injectedJavaScript={injectedJS}
        source={{ uri: "https://www.instagram.com/direct/inbox/" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default InstagramDM;
