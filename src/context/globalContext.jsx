import { createContext, useContext, useState } from "react"

const GlobalContenxt = createContext()

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState("initial")
  return <GlobalContenxt.Provider value={{ state, setState }}>{children}</GlobalContenxt.Provider>
}

export const useGlobal = () => useContext(GlobalContenxt)
