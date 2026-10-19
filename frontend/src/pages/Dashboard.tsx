import { Box, ClipboardList, Package, PackageMinus, PackageX, Receipt, ReceiptText, ShieldAlert, Truck } from "lucide-react"


function Dashboard() {
  return (
    <div className={`w-full py-2`}>
      <div className=" px-10 flex gap-2 flex-col flex-1 md:flex-row mt-4">
       <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Total Products</h1>
            <div className="flex gap-4 ">
              <Box className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Available Stock</h1>
            <div className="flex gap-4 ">
              <Package className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Out of Stock</h1>
            <div className="flex gap-4 ">
              <PackageX className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Low Stock</h1>
            <div className="flex gap-4 ">
              <PackageMinus className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Purchase Order</h1>
            <div className="flex gap-4 ">
              <ClipboardList className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">documents</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Invoice</h1>
            <div className="flex gap-4 ">
              <ReceiptText className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">documents</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Expired Products</h1>
            <div className="flex gap-4 ">
              <ShieldAlert className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Suppliers</h1>
            <div className="flex gap-4 ">
              <Truck className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Total Products</h1>
            <div className="flex gap-4 ">
              <Box className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] sborder-t-2 border-t-white hadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Total Products</h1>
            <div className="flex gap-4 ">
              <Box className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Total Products</h1>
            <div className="flex gap-4 ">
              <Box className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Total Products</h1>
            <div className="flex gap-4 ">
              <Box className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="p-4 bg-white/70 shadow-md rounded-md h-[280px] border-t-2 border-t-white">
           <h1 className="font-bold text-sm text-gray-600">Stock Movement</h1>
           <hr  className="mt-2 text-gray-600"/>
          </div>
          <div className="p-4 bg-white/70 shadow-md rounded-md h-[280px] border-t-2 border-t-white">
           <h1 className="font-bold text-sm text-gray-600">Stock Distribution</h1>
           <hr  className="mt-2 text-gray-600"/>
          </div>
          <div className="p-4 bg-white/70 shadow-md rounded-md h-[280px] border-t-2 border-t-white">
           <h1 className="font-bold text-sm text-gray-600">Stock Alert</h1>
           <hr  className="mt-2 text-gray-600"/>
          </div>
          <div className="p-4 bg-white/70 shadow-md rounded-md h-[280px] border-t-2 border-t-white">
           <h1 className="font-bold text-sm text-gray-600">Recent Invoice</h1>
           <hr  className="mt-2 text-gray-600"/>
          </div>
          
        </div>
       </div>
       <div className="flex flex-col gap-4">
          <div className="p-4 h-[300px] w-[380px] rounded-md shadow-md bg-white/70 border-t-2 border-t-white md:fixed">
          <h1 className="text-sm text-gray-600 font-bold">Inventory value</h1>
          <hr className="text-gray-600 mt-2"/>
          </div>
           <div className="p-4 h-[320px] w-[380px] rounded-md shadow-md bg-white/70 border-t-2 border-t-white md:fixed md:top-[55%]">
          <h1 className="text-sm text-gray-600 font-bold">Reminders</h1>
          <hr className="text-gray-600 mt-2"/>
          </div>
       </div>  
      </div>     
    </div>
  )
}

export default Dashboard
