import { useNavigate, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "../../axiosConfig"
import { toast } from "react-hot-toast"
import { IoKey } from "react-icons/io5"
import { CiLogin } from "react-icons/ci"
import { MdEmail } from "react-icons/md"
import { FaEyeSlash } from "react-icons/fa"
import { FaRegEye } from "react-icons/fa"

import { useGlobal } from "../context/globalContext"
import logo from "../assets/logo.png"
const API_URL = import.meta.env.VITE_BACKEND_URL

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setState } = useGlobal()
  const navigate = useNavigate()
  useEffect(() => {
    let token = localStorage.getItem("token")
    if (token) {
      navigate("/email")
    } else {
      localStorage.removeItem("token")
    }
  }, [])
  const handleLogin = async (e) => {
    e.preventDefault()
    // if (!validateEmail(email)) {
    //   return { status: 403, message: "El correo electrónico no es correcto." }
    // }
    if (!email.trim() || !password.trim()) {
      return toast.error("Fill all the fields")
    }

    try {
      const response = await axios.post(API_URL + "/api/users/login", { email: email.trim(), password: password.trim() })
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        setState({ authed: true })
        navigate("/email")
      } else {
        toast.error("El correo electrónico o la contraseña son incorrectos")
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something error happened")
      console.error("Something error happened:", err)
    }
  }
  const [showPassword, setShowPassword] = useState(false)
  return (
    <section className=" w-full h-[95vh] flex items-center justify-center">
      <div className="form w-full max-w-sm p-6 bg-gray-900 rounded-2xl shadow-lg   border-blue-900">
        <div className="w-full flex justify-center">
          <img src={logo} alt="Logo" className="rounded-xl w-50" srcSet="" />
        </div>
        <h2 className="mb-7 text-center text-2xl font-semibold text-gray-500 ">Ingresar Credenciales</h2>
        <form onSubmit={handleLogin} className="space-y-6 flex flex-col">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-gray-400">
              <span className="flex items-center gap-1">
                <MdEmail /> Correo electrónico:
              </span>
              <input autoFocus type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required className="w-full px-4 py-2  " />
            </label>
            <label className="text-gray-400">
              <span className="flex items-center gap-1">
                <IoKey /> Contraseña
              </span>
              <div className="flex gap-1">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Introducir contraseña" required className="w-full " />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                </button>
              </div>
            </label>
          </div>
          <button type="submit" className="w-full !bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-900">
            <span className="flex items-center gap-1 justify-center">
              Acceso <CiLogin className="size-6" />
            </span>
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login
