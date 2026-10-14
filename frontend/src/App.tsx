import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import VerificationCode from "./pages/VerificationCode"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Home from "./pages/Home"

function App() {
  return (
    <div className="w-full h-screen bg-linear-to-br from-[#A5E6A5]  to-green-100 fixed overflow-y-auto">   
    <Routes>
      <Route path="/signup" element={<Register/>}/>
      <Route path="/verificationCode" element={<VerificationCode/>}/>
      <Route path="/dashboard" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </div>
  )
}

export default App
