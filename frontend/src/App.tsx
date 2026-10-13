import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"

function App() {
  return (
    <div className="w-full h-screen bg-linear-to-br from-green-200  to-green-100 fixed overflow-y-auto">   
    <Routes>
      <Route path="/signup" element={<Register/>}/>
    </Routes>
    </div>
  )
}

export default App
