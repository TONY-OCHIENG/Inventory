import { Activity, BanIcon, Truck, Wallet } from "lucide-react"

function Supplier() {
  return (
    <div className="p-4 w-full h-full">  
     <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
         <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">All Suppliers</h1>
            <div className="flex gap-4 ml-4">
              <Truck className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">3</h1>
                <p className="text-xs text-gray-400">suppliers</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Active Suppliers</h1>
            <div className="flex gap-4 ml-4">
              <Activity className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">4</h1>
                <p className="text-xs text-gray-400">suppliers</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Outstanding Balance</h1>
            <div className="flex gap-4 ml-4">
              <Wallet className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">85</h1>
                <p className="text-xs text-gray-400">KES</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">On hold Suppliers</h1>
            <div className="flex gap-4 ml-4">
              <BanIcon className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">12</h1>
                <p className="text-xs text-gray-400">suppliers</p>
              </div>
            </div>
          </div> 
        </div>                           
    </div>
  )
}

export default Supplier
