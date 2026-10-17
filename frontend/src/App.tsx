import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import VerificationCode from "./pages/VerificationCode"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Purchases from "./pages/Purchases"

function App() {
  return (
    <div className="bg-linear-to-br from-[#A5E6A5] fixed w-full overflow-auto  to-green-100 ">   
    <Routes>
      <Route path="/signup" element={<Register/>}/>
      <Route path="/verificationCode" element={<VerificationCode/>}/>
      <Route path="/dashboard" element={<Home/>}>
       <Route path="" element={<Dashboard/>}/>
       <Route path="/dashboard/products" element={<Products/>}/>
       <Route path="/dashboard/purchases" element={<Purchases/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </div>
  )
}

export default App
