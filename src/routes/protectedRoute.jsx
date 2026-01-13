import { useEffect, useState } from "react"
import axios from "../../axiosConfig"
import { Navigate, useNavigate } from "react-router-dom"
import { useGlobal } from "../context/globalContext"
import toast from "react-hot-toast"
const API_URL = import.meta.env.VITE_BACKEND_URL
function ProtectedRoute({ children }) {
  const [verified, setVerified] = useState(null)
  const { setState } = useGlobal()
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return setVerified(false)
    axios
      .get(API_URL + "/api/verify-token", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        let user = res.data.user
        if (user && user.email_verified) {
          res.data.user.token = token
          if (!["appcbl_soft", "admin", "specific", "member", "all_profile"].includes(user.role)) {
            toast.error("¡Aún no tienes permiso para utilizar este software!")
            setVerified(false)
            return
          }
          setState(user)
          setVerified(true)
        } else if (user.email_verified == false) {
          setState(user)
          setVerified(true)
          navigate("/confirm-email")
          return
        } else if (user.verified === false) {
          setState(user)
          navigate("/confirm-email")
        } else {
          throw new Error("No token provided or email not verified!")
        }
      })
      .catch((e) => {
        toast.error(e?.response?.data.message || e.message || "User verification failed!")
        localStorage.removeItem("token")
        setVerified(false)
      })
  }, [])
  if (verified === null) return null // or loader
  if (verified === false) return <Navigate to="/login" /> // or loader

  return children
}

export default ProtectedRoute
