import { Ban, CircleCheck, Timer, Undo2, X } from "lucide-react"
import type { ReturnFilter } from "../types/types";
import { useEffect, useState } from "react";
import { useSupplier } from "../store/supplierStore";
import { useFormDetail } from "../store/authStore";
import { useNavigate } from "react-router-dom";

function Returns() {
  const [open, setOpen] = useState<Boolean>(false)
   const [activeFilter, setActiveFilter] = useState<ReturnFilter>('All')
   const [userID, setUserID] = useState<String>("")
   const navigate = useNavigate()
   const filterButtons: { label: string; value: ReturnFilter}[] = [
                { label: 'All', value: 'All' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Completed', value: 'Completed'},      
                { label: 'Canceled', value: 'Canceled' }           
          ]
  const { supplier, setSupplier } = useSupplier()
  const { authenticateUser } =  useFormDetail()

  useEffect(() => {
    authentication()
    setSupplier(userID)
  },[userID])
  
  const authentication = async () => {
        const { success, user_id} = await authenticateUser()
        if (success) {
          setUserID(user_id)
        } else {
          navigate('/login')      
        }
  }
   
  return (
    <div  className="relative p-4 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
         <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Total Returns</h1>
            <div className="flex gap-4 ml-4">
              <Undo2 className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">10</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Pending Returns</h1>
            <div className="flex gap-4 ml-4">
              <Timer className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">23</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Completed Returns</h1>
            <div className="flex gap-4 ml-4">
              <CircleCheck className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">9</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Canceled Returns</h1>
            <div className="flex gap-4 ml-4">
              <Ban className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">5</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
        </div> 
        <div className="mt-8 h-[70vh] overflow-x-auto w-full p-4 rounded-md border-t-2 border-t-white bg-white/70">
        <button onClick={() => setOpen(!open)} className="text-sm text-gray-500 px-8 bg-white py-2 rounded-md cursor-pointer border border-gray-400 font-extrabold">Add Return</button>
          <div className="flex gap-2 mt-3">
           {filterButtons.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setActiveFilter(value)}
                  className={`px-4 text-xs rounded-md py-1 shadow-md cursor-pointer transition ${
                    activeFilter === value ? 'bg-green-100 text-green-700 font-semibold' : 'bg-white'
                  }`}
                >
                  {label}
                </button>
            ))}
         </div>
         <table className="w-full bg-white mt-3">
          <thead className="text-sm text-gray-600 font-extrabold text-left border-b border-gray-400">
            <th className="p-2">Return Number</th>
            <th>Supplier Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Refund Amount</th>
            <th>Status</th>
            <th>Action</th>
          </thead>
         </table>
        </div> 
        <div className={`absolute ${open ? 'block' : 'hidden'} fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center`}>
         <form  className="relative bg-white p-4 rounded-md max-w-md">
          <X onClick={() => setOpen(!open)} className="absolute top-3 right-4 h-5 w-5 text-gray-600 cursor-pointer"/>
          <h1 className="font-bold text-center text-sm text-gray-600">Add Return</h1>
          <label htmlFor="" className="text-sm text-gray-400">Return number</label>
          <input type="text" name="returnNumber"className="w-full p-2 mb-2 border rounded-md outline-none" placeholder="7467"/>
          <label htmlFor="" className="text-sm text-gray-400">Supplier name</label>
          <select name="" className="w-full text-sm  mb-2 border rounded-md outline-none p-2" id="">
           {
            supplier.map((item) => (
              <option value={item.supplierName}>{item.supplierName}</option>
            ))
           }  
          </select>  
          <label htmlFor="" className="text-sm text-gray-400">Product name</label>
          <input type="text" name="productName"  className="w-full p-2 mb-2 border rounded-md outline-none"/>  
          <label htmlFor="" className="text-sm text-gray-400">Quantity</label>
          <input type="number" name="quantity"  className="w-full p-2 mb-2 border rounded-md outline-none"/>  
          <label htmlFor="" className="text-sm text-gray-400">Refund Amount</label>
          <input type="number" name="amount"  className="w-full p-2 mb-2 border rounded-md outline-none"/>                             
          <button className="w-full py-2 rounded-md font-extrabold text-white bg-[#244504] cursor-pointer mt-2">New Return</button>
         </form>
        </div>    
    </div>
  )
}

export default Returns
