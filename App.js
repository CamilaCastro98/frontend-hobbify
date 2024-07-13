import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigation from "./navigation/navigation";
import { ContextProvider } from "./src/contexts/Context";

export default function App() {
  return (
    <ContextProvider>
      <GestureHandlerRootView>
      <AppNavigation />
      </GestureHandlerRootView>
    </ContextProvider>
  )
}
