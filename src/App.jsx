import "./App.css"
import { Toaster } from "react-hot-toast"
import AppRoutes from "./routes/appRoutes"
import { GlobalProvider } from "./context/globalContext" 
function App() {
  return (
    <>
      <GlobalProvider> 
        <Toaster position="bottom-right" reverseOrder={false} /> 
        <AppRoutes />
      </GlobalProvider>
    </>
  )
}

export default App
