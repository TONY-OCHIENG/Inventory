import { Activity, BanIcon, Truck, Wallet, X } from "lucide-react"
import type {SupplierDetails, SupplierFilter } from "../types/types";
import { useEffect, useState, type ChangeEvent } from "react";
import { useSupplier } from "../store/supplierStore";
import toast from "react-hot-toast";
import { useFormDetail } from "../store/authStore";
import { useNavigate } from "react-router-dom";

function Supplier() {
    const [open, setOpen] = useState<Boolean>(false)
    const [supplierDetails, setSupplierdetails] = useState<SupplierDetails>({
        supplierName: "",
        supplierNumber:'',
        date:''
    })
    const navigate = useNavigate()
    const { authenticateUser} = useFormDetail()
    const [userID, setUserID] = useState<String>("")
    const { addSupplier } = useSupplier()
    const [activeFilter, setActiveFilter] = useState<SupplierFilter>('All')
    const filterButtons: { label: string; value: SupplierFilter }[] = [
              { label: 'All', value: 'All' },
              { label: 'Active', value: 'Active' },
              { label: 'On hold', value: 'On hold' }              
        ]
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target
        setSupplierdetails((prev) => ({
            ...prev,
            [name] : value
        }))
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

    const handleSubmit = async (event: ChangeEvent): Promise<void> => {
        event.preventDefault()
        const { success, message} = await addSupplier("1", supplierDetails)
        if (success) {
            toast.success(message)
        } else {
            toast.error("An error occured")
        }
    } 
  return (
    <div className="relative p-4 w-full h-full">  
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
        <div className="mt-8 h-[70vh] overflow-x-auto w-full p-4 rounded-md border-t-2 border-t-white bg-white/70">
         <button onClick={() => setOpen(!open)} className="text-xs mb-2 bg-white font-extrabold text-gray-600 p-2 border-gray-400 border rounded-md cursor-pointer">Add supplier</button>
         <div className="flex gap-2 ">
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
         <table className="mt-2 w-full bg-white">
            <thead className="text-sm text-gray-600 text-left border-b">
                <th className="p-2">Supplier No</th>
                <th>Supplier Name</th>
                <th>Date</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Action</th>
            </thead>
         </table>
        </div>  
        <div  className={`absolute ${open ? 'block' : 'hidden'} fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center`}>
         <form onSubmit={handleSubmit} className="relative bg-white p-4 rounded-md max-w-md">
          <X onClick={() => setOpen(!open)} className="absolute top-3 right-4 h-5 w-5 text-gray-600 cursor-pointer"/>
          <h1 className="font-bold text-center text-sm text-gray-600">Add Supplier</h1>
          <label htmlFor="" className="text-sm text-gray-400">Supplier number</label>
          <input type="text" name="supplierNumber"value={String(supplierDetails.supplierNumber)}  onChange={handleChange} className="w-full p-2 mb-2 border rounded-md outline-none" placeholder="eg 0710203040"/>
          <label htmlFor="" className="text-sm text-gray-400">Supplier name</label>
          <input type="text" name="supplierName" value={String(supplierDetails.supplierName)}  onChange={handleChange} className="w-full p-2 mb-2 border rounded-md outline-none"/>           
          <label htmlFor="" className="text-sm text-gray-400">Date</label>
          <input type="date" name="date" value={String(supplierDetails.date)} onChange={handleChange} className="w-full p-2 mb-2 border rounded-md outline-none"/>          
          <button className="w-full py-2 rounded-md font-extrabold text-white bg-[#244504] cursor-pointer mt-2">Add supplier</button>
         </form>
        </div>                       
    </div>
  )
}

export default Supplier
