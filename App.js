import AppNavigation from "./navigation/navigation";
import { ContextProvider } from "./src/contexts/Context";

export default function App() {
  return (
    <ContextProvider>
      <AppNavigation />
    </ContextProvider>
  )
}
