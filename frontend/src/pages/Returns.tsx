import { Ban, CircleCheck, Timer, Trash, Undo2, X } from "lucide-react"
import type { Return, ReturnFilter } from "../types/types";
import { useEffect, useState, type ChangeEvent } from "react";
import { useSupplier } from "../store/supplierStore";
import { useFormDetail } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useReturn } from "../store/returnStore";
import toast from "react-hot-toast";


function Returns() {
  const [open, setOpen] = useState<Boolean>(false)
  const [activeFilter, setActiveFilter] = useState<ReturnFilter>('All')
  const { addReturns,returns , setReturn, canceleReturn, completeReturn, 
    deleteReturn, totalReturn, settotalReturn, pendingReturn, setpendingReturn
    , completedReturn, setcompletedReturn
   } = useReturn()
  const [returnDetails, setReturnDetails] = useState<Return>({
    returnNumber: "",
    supplierName:"",
    productName: "",
    quantity:"",
    amount:""
  })
  const [userID, setUserID] = useState<String>("")
  const navigate = useNavigate()
  const filterButtons: { label: string; value: ReturnFilter}[] = [
                { label: 'All', value: 'All' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Completed', value: 'Completed'},      
                { label: 'Canceled', value: 'Canceled' }           
          ]
  
  const filterReturn = 
          activeFilter === 'All'
            ? returns
            : returns.filter((item) => item.status === activeFilter)
  const { supplier, setSupplier } = useSupplier()
  const { authenticateUser } =  useFormDetail()

  useEffect(() => {
    authentication()
    setSupplier(userID)
    setReturn(userID)
    settotalReturn(userID)
    setpendingReturn(userID)
    setcompletedReturn(userID)
  },[userID])
  
  const authentication = async () => {
        const { success, user_id} = await authenticateUser()
        if (success) {
          setUserID(user_id)
        } else {
          navigate('/login')      
        }
  }
  
  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value} = event.target
    setReturnDetails((prev) => ({
      ...prev,
      [name] : value
    }))
  }
  
  const handleSubmit = async (event: ChangeEvent): Promise<void> => {
    event.preventDefault()
    const { success, message} = await addReturns(userID, returnDetails)
    if (success) {
      toast.success(message)
    } else {
      toast.error("An error occured")
    }

    setReturnDetails({
        returnNumber: "",
        supplierName:"",
        productName: "",
        quantity:"",
        amount:""
    })

    setOpen(!open)
    setReturn(userID)
    setSupplier(userID)
    settotalReturn(userID)
    setpendingReturn(userID)
    setcompletedReturn(userID)
  }

  //handle color change based on status

  const handleColor = (status: String) => {
    if (status === 'Pending') {
      return <p className="bg-red-200 text-red-600 font-bold rounded-full text-center w-[70px]">{status}</p>
    }
    if (status === 'Canceled') {
      return <p className="bg-amber-200 text-amber-600 font-bold rounded-full text-center w-[70px]">{status}</p>
    }

    if (status === 'Completed') {
      return <p className="bg-green-200 text-green-600 font-bold rounded-full text-center w-[84px]">{status}</p>
    }
  }

  //A function that canceles return
  const handleCanceleReturn = async (return_id: string) => {
    const { success, message} = await canceleReturn(return_id)
    if (success) {
      toast.success(message)
    } else {
      toast.error("An error occured")
    }
    await setReturn(userID)
    await setSupplier(userID)
    await settotalReturn(userID)
    await setpendingReturn(userID)
    await setcompletedReturn(userID)
  
  }
  // A function that completes return

  const handleCompleteReturn = async (return_id: String) => {
    const { success, message} = await completeReturn(return_id)
    if (success) {
      toast.success(message)
    } else {
      toast.error("An error occured")
    }
    await setReturn(userID)
    await setSupplier(userID)  
    await settotalReturn(userID)
    await setpendingReturn(userID)
    await setcompletedReturn(userID)
  }

  // A function that deletes return

  const handleDeleteReturn = async (return_id: String) => {
    const { success, message} = await deleteReturn(return_id)
    if (success) {
      toast.success(message)
    } else {
      toast.error("An erro occured")
    }

    await setReturn(userID)
    await setSupplier(userID)  
    await settotalReturn(userID)
    await setpendingReturn(userID)
    await setcompletedReturn(userID)
  } 
  return (
    <div  className="relative p-4 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
         <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Total Returns</h1>
            <div className="flex gap-4 ml-4">
              <Undo2 className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{totalReturn}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Pending Returns</h1>
            <div className="flex gap-4 ml-4">
              <Timer className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{pendingReturn}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Completed Returns</h1>
            <div className="flex gap-4 ml-4">
              <CircleCheck className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{completedReturn}</h1>
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
          <tbody>
              {
                filterReturn && filterReturn.length > 0 ?
                 filterReturn.map((item) => (
                  <tr className="even:bg-gray-50 text-sm text-gray-600 text-left">
                    <td className="p-2">{item.returnNumber}</td>
                    <td>{item.supplierName}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                    <td>{handleColor(item.status)}</td>
                    <td>
                      <div className="flex gap-2 items-center">
                        <CircleCheck onClick={() => handleCompleteReturn(item.return_id)} className="h-4 w-4 text-green-400 cursor-pointer">
                          <title>Complete</title>
                        </CircleCheck>
                        <Ban onClick={() => handleCanceleReturn(item.return_id)} className="h-4 w-4 text-amber-400 cursor-pointer">
                          <title>Cancele</title>
                        </Ban>
                        <Trash onClick={() => handleDeleteReturn(item.return_id)} className="h-4 w-4 text-red-400 cursor-pointer">
                          <title>Delete</title>
                        </Trash>
                      </div>
                    </td>
                  </tr>
                 ))
                : 
                 <tr className="h-[48vh]">
                  <td colSpan={8} className="text-center ">
                    <div className="flex flex-col justify-center items-center">
                        <Undo2 className="h-8 w-8"/>
                       <h1 className="text-sm text-gray-600 font-extrabold">No Returns </h1>
                    </div>                  
                  </td>
                </tr>
              }
          </tbody>
         </table>
        </div> 
        <div className={`absolute ${open ? 'block' : 'hidden'} fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center`}>
         <form onSubmit={handleSubmit} className="relative bg-white p-4 rounded-md max-w-md">
          <X onClick={() => setOpen(!open)} className="absolute top-3 right-4 h-5 w-5 text-gray-600 cursor-pointer"/>
          <h1 className="font-bold text-center text-sm text-gray-600">Add Return</h1>
          <label htmlFor="" className="text-sm text-gray-400">Return number</label>
          <input required type="text"  name="returnNumber" value={String(returnDetails.returnNumber)} onChange={handleValueChange} className="w-full p-2 mb-2 border rounded-md outline-none"/>
          <label htmlFor="" className="text-sm text-gray-400">Supplier name</label>
          <select required name="suppliername" value={String(returnDetails.supplierName)} 
              onChange={(event) =>
              setReturnDetails((prev) => ({ ...prev, supplierName: event.target.value }))
            }
            className="w-full text-sm  mb-2 border rounded-md outline-none p-2" id="">
              <option value="" disabled>
                Select a supplier
              </option>
           {
            supplier.map((item) => (
              <option value={item.supplierName}>{item.supplierName}</option>
            ))
           }  
          </select>  
          <label htmlFor="" className="text-sm text-gray-400">Product name</label>
          <input required type="text" name="productName" value={String(returnDetails.productName)} onChange={handleValueChange} className="w-full p-2 mb-2 border rounded-md outline-none"/>  
          <label htmlFor="" className="text-sm text-gray-400">Quantity</label>
          <input required type="number" value={String(returnDetails.quantity)} onChange={handleValueChange} name="quantity"  className="w-full p-2 mb-2 border rounded-md outline-none"/>  
          <label htmlFor="" className="text-sm text-gray-400">Refund Amount</label>
          <input required type="number" name="amount" value={String(returnDetails.amount)} onChange={handleValueChange} className="w-full p-2 mb-2 border rounded-md outline-none"/>                             
          <button className="w-full py-2 rounded-md font-extrabold text-white bg-[#244504] cursor-pointer mt-2">New Return</button>
         </form>
        </div>    
    </div>
  )
}

export default Returns
