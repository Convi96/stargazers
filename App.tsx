import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import Home from "./src/pages/Home/Home";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/utilities/navigatorTypes";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import SearchResultsPage from "./src/pages/SearchResultsPage/SearchResultsPage";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./src/utilities/colors";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "MonaSans-Bold": require("./assets/fonts/MonaSans-Bold.otf"),
    "MonaSans-Regular": require("./assets/fonts/MonaSans-Regular.otf"),
    "MonaSans-Medium": require("./assets/fonts/MonaSans-Medium.otf"),
    "MonaSans-Light": require("./assets/fonts/MonaSans-Light.otf"),
    "MonaSans-SemiBold": require("./assets/fonts/MonaSans-SemiBold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{
              presentation: "modal",
              headerShown: Platform.OS === "android",
              headerTintColor: "white",
              headerStyle: { backgroundColor: colors.background },
            }}
            name="SearchResultsPage"
            component={SearchResultsPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
