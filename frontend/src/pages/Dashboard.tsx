import { Bell, Box, CalendarClock, FolderOpen, Gift, HandPlatter, Package, PackageMinus, PackageX, Receipt, ReceiptText, RotateCcw, ShieldAlert, ShoppingBag, Timer, Trash, Truck, Wallet } from "lucide-react"
import { useActions } from "../store/actionStore"
import { useEffect, useState, type ChangeEvent } from "react"
import { useFormDetail } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import type { Reminders } from "../types/types"
import { useProduct } from "../store/productStore"
import { useReturn } from "../store/returnStore"
import { usePurchase } from "../store/purchaseStore"
import { useSupplier } from "../store/supplierStore"
import InventoryValueDonut from "../components/InventoryValueDonut"
import StockDistributionPie from "../components/StockDistributionPie"
import StockMovementChart from "../components/StockmovementChart"


function Dashboard() {
  const { addReminder,setReminders,reminder, deleteReminder } = useActions()
  const { authenticateUser } = useFormDetail()
  const [reminders, setReminder] = useState<Reminders>({
    reminder: ""
  })
  const { setPurchases,totalPurchase,recievedPurchase, setRecievedPurchase,pendingPurchase ,recentPurchase,setRecentPurchase} = usePurchase()
  const { totalReturn,settotalReturn,pendingReturn, setpendingReturn } = useReturn()
  const { availableStock, depletedStock, lowStock, setavailableProducts,
       setdepletedStock, setlowProducts, setProducts,totalProducts,setStockAlert,stockAlert } = useProduct()
  const { suppliers, getAllSuppliers, total,totalBalance,inActiveSupplier,getinActiveSupplier} = useSupplier()
  let limit = 10
  const [userID, setUserID] = useState<String>("")
  const navigate = useNavigate()
  const handleSubmit = async (event: ChangeEvent): Promise<void> => {
    event.preventDefault()
    const {success, message} = await addReminder(userID, reminders)
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
    setReminders(userID)
    setReminder({
      reminder: ""
    })
  }

  useEffect(() => {
    authentication()
    setReminders(userID)
    setlowProducts(userID)
    setavailableProducts(userID)
    setdepletedStock(userID)
    setProducts(userID,1,limit)
    setPurchases(userID,1,limit),
    settotalReturn(userID)
    setpendingReturn(userID)
    getAllSuppliers(userID)
    getinActiveSupplier(userID)
    setRecievedPurchase(userID)
    totalBalance(userID)
    setStockAlert(userID)  
    setRecentPurchase(userID)  
  },[userID,1])

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

  const handleDeleteReminder = async (rem_id: String): Promise<void> => {
    const { success, message} = await deleteReminder(rem_id)
    if (success) {
      toast.success(message)
    }else {
      toast.error("An error occured")
    } 
    
    await setReminders(userID)
  }

    //implementing a function that handle stock text color based on availability

    const handleStock = (text: String) => {
      

      if (text === 'Low stock') {
        return <p className="text-amber-500 ">{text}</p>
      } 

      if (text === 'Depleted') {
        return <p className="text-red-500  ">{text}</p>
      }
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
                <h1 className="text-xl font-extrabold text-gray-700">{totalProducts}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Available Stock</h1>
            <div className="flex gap-4 ">
              <Package className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{availableStock}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Out of Stock</h1>
            <div className="flex gap-4 ">
              <PackageX className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{depletedStock}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Low Stock</h1>
            <div className="flex gap-4 ">
              <PackageMinus className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{lowStock}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Total Returns</h1>
            <div className="flex gap-4 ">
              <RotateCcw className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{totalReturn}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Pending Returns</h1>
            <div className="flex gap-4 ">
              <Timer className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{pendingReturn}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Total Purchases</h1>
            <div className="flex gap-4 ">
              <ShoppingBag className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{totalPurchase}</h1>
                <p className="text-xs text-gray-400">documents</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Suppliers</h1>
            <div className="flex gap-4 ">
              <Truck className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{suppliers}</h1>
                <p className="text-xs text-gray-400">supplier</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Outstanding Balance</h1>
            <div className="flex gap-4 ">
              <Wallet className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{total}</h1>
                <p className="text-xs text-gray-400">KES</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white hadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">On hold suppliers</h1>
            <div className="flex gap-4 ">
              <CalendarClock className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{inActiveSupplier}</h1>
                <p className="text-xs text-gray-400">suppliers</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Recieved Purchases</h1>
            <div className="flex gap-4 ">
              <Gift className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{recievedPurchase}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md w-[200px] border-t-2 border-t-white shadow-md cursor-pointer">
            <h1 className="text-center text-sm text-gray-600">Pending purchases</h1>
            <div className="flex gap-4 ">
              <Timer className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{pendingPurchase}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="p-4 bg-white/70 shadow-md rounded-md h-[280px] border-t-2 border-t-white">
           <h1 className="font-bold text-sm text-gray-600">Stock Movement</h1>
           <hr  className="mt-2 text-gray-600"/>
            <div className="h-[70%] mt-4 w-[100%] flex justify-center items-center">
               <StockMovementChart/>
            </div>
          </div>
          <div className="p-4 bg-white/70 shadow-md rounded-md h-[280px] border-t-2 border-t-white">
           <h1 className="font-bold text-sm text-gray-600">Stock Distribution</h1>
           <hr  className="mt-2 text-gray-600"/>
            <div className="h-[70%] mt-4 w-[100%] flex justify-center items-center">
               <StockDistributionPie/>
            </div>
          </div>
          <div className="p-4 bg-white/70 shadow-md rounded-md h-[280px] border-t-2 border-t-white">
           <h1 className="font-bold text-sm text-gray-600">Stock Alert</h1>
           <hr  className="mt-2 text-gray-600"/>
           <div className="w-full h-[90%] overflow-auto scrollbar-none">
              <table className="w-full p-2 text-gray-600 text-xs mt-4 bg-white">
               {
                 stockAlert && stockAlert.length > 0 ? stockAlert.map((item) => (
                  <tr className="p-2 even:bg-gray-50">
                    <td className="p-2">{item.productName}</td>
                    <td className="text-right pr-2">{handleStock(item.stock)}</td>
                  </tr>
                 )) : 
                  <tr className="h-[30vh]">
                  <td colSpan={8} className="text-center ">
                    <div className="flex flex-col justify-center items-center">
                        <Bell className="h-8 w-8"/>
                       <h1 className="text-sm text-gray-600 font-extrabold">No available alerts</h1>
                    </div>                  
                  </td>
                </tr>
               }
              </table>
           </div>
          </div>
          <div className="p-4 bg-white/70 shadow-md rounded-md h-[280px] border-t-2 border-t-white">
           <h1 className="font-bold text-sm text-gray-600">Recent Purchases</h1>
           <hr  className="mt-2 text-gray-600"/>
           <div className="w-full h-[90%] overflow-auto scrollbar-none">
              <table className="w-full p-2 text-gray-600 text-xs mt-4 bg-white">
               {
                 recentPurchase && recentPurchase.length > 0 ? recentPurchase.map((item) => (
                  <tr className="p-2 even:bg-gray-50">
                    <td className="p-2">{item.productName}</td>
                    <td className="text-right pr-2 text-red-400">{(item.status)}</td>
                  </tr>
                 )) : 
                  <tr className="h-[30vh]">
                  <td colSpan={8} className="text-center ">
                    <div className="flex flex-col justify-center items-center">
                        <ShoppingBag className="h-8 w-8"/>
                       <h1 className="text-sm text-gray-600 font-extrabold">No recent purchases</h1>
                    </div>                  
                  </td>
                </tr>
               }
              </table>
           </div>
          </div>
          
        </div>
       </div>
       <div className="flex flex-col gap-4">
          <div className="p-4 h-[300px] w-[380px] rounded-md shadow-md bg-white/70 border-t-2 border-t-white md:fixed">
          <h1 className="text-sm text-gray-600 font-bold">Inventory value</h1>
          <hr className="text-gray-600 mt-2"/>
          <div className="h-[80%] mt-4 w-[100%] flex justify-center items-center">
           <InventoryValueDonut/>
          </div>
          </div>
           <div className="p-4 h-[320px] w-[380px] rounded-md shadow-md bg-white/70 border-t-2 border-t-white md:fixed md:top-[55%]">
          <h1 className="text-sm text-gray-600 font-bold">Reminders</h1>
          <hr className="text-gray-600 mt-2"/>
          <form onSubmit={handleSubmit} className="flex justify-between gap-4 mt-3">
            <input type="text" name="reminder" value={String(reminders.reminder)} onChange={handleOnchange} placeholder="Add Reminder..." className="text-sm p-2 outline-none focus:ring-1 text-gray-600 focus:ring-[#244504] rounded-md border w-full"/>
            <button className="p-2 bg-[#244504] text-white font-extrabold rounded-md px-4 cursor-pointer">Add</button>
          </form>
           <div className="h-[70%] p-2 border-gray-400  rounded-md overflow-auto scrollbar-none w-full mt-2 border">
              {
                reminder.length > 0 ? 
                <ul className="text-xs text-gray-600">
                   {reminder.map((item) =>(
                    <li className="p-2 bg-white flex justify-between items-center rounded-md mb-2">
                      <span className="flex flex-col">{item.reminder} <p className="mt-1">
                        {new Date(item.time).toLocaleDateString()}
                        </p></span>
                      <span><Trash onClick={() => handleDeleteReminder(item.rem_id)} className="h-5 w-5 cursor-pointer text-red-300">
                        <title>Delete</title>
                        </Trash></span>
                    </li>
                   ))}
                </ul>                 
                : 
                <div className="flex items-center justify-center flex-col w-full h-full">
                
                  <FolderOpen className="text-gray-600"/>
                  <h1 className="text-xs text-gray-600">No reminders made</h1>  
                </div>
              }
           
           </div>
          </div>
       </div>  
      </div>     
    </div>
  )
}

export default Dashboard
