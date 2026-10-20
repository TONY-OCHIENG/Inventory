import { Box, CalendarClock, ClipboardList, FolderOpen, HandPlatter, Package, PackageMinus, PackageX, Receipt, ReceiptText, ShieldAlert, ShoppingBag, Truck } from "lucide-react"
import { useActions } from "../store/actionStore"
import { useEffect, useState, type ChangeEvent } from "react"
import { useFormDetail } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import type { Reminders } from "../types/types"


function Dashboard() {
  const { addReminder } = useActions()
  const { authenticateUser } = useFormDetail()
  const [reminder, setReminder] = useState<Reminders>({
    reminder: ""
  })
  const [userID, setUserID] = useState<String>("")
  const navigate = useNavigate()
  const handleSubmit = async (event: ChangeEvent): Promise<void> => {
    event.preventDefault()
    const {success, message} = await addReminder(userID, reminder)
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  useEffect(() => {
    authentication()
  },[userID])

  //user authentication function

  const authentication = async () => {
    const { success, user_id} = await authenticateUser()
    if (success) {
      setUserID(user_id)
    } else {
      navigate('/login')      
    }
  }

  // handling value change

  const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setReminder((prev) => ({
      ...prev,
      [name] : value
    }))
  }
  
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
            <h1 className="text-center text-sm text-gray-600">Quotations</h1>
            <div className="flex gap-4 ">
              <Receipt className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">documents</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Suppliers</h1>
            <div className="flex gap-4 ">
              <Truck className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">supplier</p>
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
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white hadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Slow Moving Products</h1>
            <div className="flex gap-4 ">
              <CalendarClock className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Recent Purchases</h1>
            <div className="flex gap-4 ">
              <ShoppingBag className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Reserved Products</h1>
            <div className="flex gap-4 ">
              <HandPlatter className="w-10 h-10 text-gray-600"/>
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
          <form onSubmit={handleSubmit} className="flex justify-between gap-4 mt-3">
            <input type="text" name="reminder" onChange={handleOnchange} placeholder="Add Reminder..." className="text-sm p-2 outline-none focus:ring-1 text-gray-600 focus:ring-[#244504] rounded-md border w-full"/>
            <button className="p-2 bg-[#244504] text-white font-extrabold rounded-md px-4 cursor-pointer">Add</button>
          </form>
           <div className="h-[70%] border-gray-400 flex justify-center items-center rounded-md overflow-auto scrollbar-none w-full mt-2 border">
            <div className="flex items-center flex-col">
              <FolderOpen className="text-gray-600"/>
              <h1 className="text-xs text-gray-600">No reminders made</h1>  
             </div>
           </div>
          </div>
       </div>  
      </div>     
    </div>
  )
}

export default Dashboard
