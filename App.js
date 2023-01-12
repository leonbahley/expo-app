import { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { View } from "react-native";
import Main from "./components/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Main />
      </View>
    </Provider>
  );
}
