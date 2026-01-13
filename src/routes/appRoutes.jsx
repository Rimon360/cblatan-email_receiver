import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from "../pages/notFound"
import Login from "../pages/userLogin"
import ProtectedRoute from "./protectedRoute"
import EmailViewer from "../pages/adminPage"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/email"
          element={
            <ProtectedRoute>
              <EmailViewer />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
