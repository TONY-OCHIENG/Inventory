import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className="p-4 max-w-md rounded-md bg-white/50 flex justify-center items-center flex-col">
          <img src={"/ims-box-green.svg"} alt="" />
          <h1 className="text-xl font-extrabold mt-3 text-gray-600">404 Page not found</h1>
          <Link to={"/"} className="text-sm font-bold text-gray-500">Back to home page</Link>
        </div>      
    </div>
  )
}

export default NotFound
