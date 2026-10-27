import { Ban, ChevronRight, Download, FileDown, FileSpreadsheet, Gift, Plus, ShoppingBag, Timer, X } from "lucide-react"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { FaFileCsv } from "react-icons/fa6"
import { usePurchase } from "../store/purchaseStore"
import type { Purchase } from "../types/types"
import toast from "react-hot-toast"
import { useFormDetail } from "../store/authStore"
import { useNavigate } from "react-router-dom"

function Purchases() {
    const [open, setopen] = useState<Boolean>(true)
    const [openPurchase,setopenPurchase] = useState<Boolean>(false)
    const { addPurchase } = usePurchase()
    const { authenticateUser} = useFormDetail()
    const [userID, setUserID] = useState<String>("")
    const navigate = useNavigate()
    const [image, setImage] = useState<File | null>()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [purchaseDetail, setpurchaseDetail] = useState<Purchase>({
      productNumber: "",
      productName: "",
      productImage: null,
      quantity: "",
      date: "",
      supplier: "",
      amount: ""
    })

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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return    
        setImage(file)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      const { name, value} = event.target
      setpurchaseDetail((prev) => ({
        ...prev,
        [name] : value
      }))
    }

    const handleSubmit = async (event: ChangeEvent): Promise<void> => {
      event.preventDefault()
      if (!image) return //Checking if the image file exists
      const formData = new FormData()
      formData.append('productNumber',purchaseDetail.productNumber)
      formData.append('productName',purchaseDetail.productName)
      formData.append('productImage',image)
      formData.append('quantity',purchaseDetail.quantity)
      formData.append('date',purchaseDetail.date)
      formData.append('supplier',purchaseDetail.supplier)

      const { success, message} = await addPurchase(userID,formData)
      if (success) {
        toast.success(message)
      } else {
        toast.error(message)
      }
    }

  return (
   <div className="relative p-4 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
         <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">All Purchases</h1>
            <div className="flex gap-4 ml-4">
              <ShoppingBag className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Pending</h1>
            <div className="flex gap-4 ml-4">
              <Timer className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Recieved</h1>
            <div className="flex gap-4 ml-4">
              <Gift className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Canceled</h1>
            <div className="flex gap-4 ml-4">
              <Ban className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
        </div> 
        <div className="mt-4 w-full flex gap-2 h-[83%]">
         <div className={`transition duration-300 border-t-2 border-t-white ${open ? 'w-[180px]' : 'w-[50px]'} bg-white/70 p-2 shadow-md rounded-md h-[45vh]`}>
         <div className="flex justify-between items-center">
            <h1 className={`${open ? 'block' : 'hidden'} text-sm text-gray-600 font-bold`}>Actions</h1>
            <ChevronRight onClick={() => setopen(!open)}  className={`transition duration-300 ${open ? 'rotate-180' : ''} h-4 w-4 text-gray-600 cursor-pointer`}/>
         </div>
         <hr className="mt-2"/>
         <div className="mt-4 flex flex-col gap-5">
            <div onClick={() => setopenPurchase(!openPurchase)} className="flex gap-2 items-center cursor-pointer hover:bg-white p-2 rounded-md">
                <Plus  className={`${open ? 'h-4 w-4' : ''}  text-gray-600`}>
                    <title>Add Purchase</title>
                </Plus>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Add Purchases</h1>
            </div>
              <div className="flex gap-2 items-center cursor-pointer hover:bg-white p-2 rounded-md">
                <Download className={`${open ? 'h-4 w-4' : ''}  text-gray-600`}>
                    <title>Download As Excel</title>
                </Download>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Export As Excel</h1>
            </div>
              <div className="flex gap-2 items-center cursor-pointer hover:bg-white p-2 rounded-md">
                <FileSpreadsheet  className={`${open ? 'h-4 w-4' : ''}  text-gray-600`}>
                    <title>Import Excel Sheet</title>
                </FileSpreadsheet>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Import Excel Sheet</h1>
            </div>
              <div className="flex gap-2 items-center cursor-pointer hover:bg-white p-2 rounded-md">
                <FileDown  className={`${open ? 'h-4 w-4' : ''}  text-gray-600`}>
                    <title>Download As CSV</title>
                </FileDown>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Download As CSV</h1>
            </div>
              <div className="flex gap-2 items-center cursor-pointer hover:bg-white p-2 rounded-md">
                <FaFileCsv title="Import As CSV" className={`${open ? '' : 'h-5 w-5 ml-1'}  text-gray-600`}/>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Import As CSV</h1>
            </div>
         </div>
         </div>
         <div className="overflow-y-auto h-full w-full bg-white/70 border-t-2 border-t-white rounded-md shadow-md p-2">
         <div className="flex justify-between items-center">
            <div className="flex gap-2">
            <button className="px-4  text-xs rounded-md bg-green-100 py-1 shadow-md cursor-pointer">All</button>
            <button className="px-4  text-xs rounded-md bg-white py-1 shadow-md cursor-pointer">Pending</button>
            <button className="px-4  text-xs rounded-md bg-white py-1 shadow-md cursor-pointer">Recieved</button>
            <button className="px-4  text-xs rounded-md bg-white py-1 shadow-md cursor-pointer">Canceled</button>
            </div>
         </div>
         <hr className="text-gray-600 mt-1"/>
         <table className="w-full overflow-y-auto bg-white h-[90%]">
            <thead className="text-sm text-left text-gray-600 border-b">
                <th className="p-2">Purchase No</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Supplier</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
            </thead>
            <tbody className="overflow-y-auto"></tbody>
         </table>
         <hr className="text-gray-600 mb-1"/>
         <div className="flex w-full justify-between items-center">
            <h1 className="text-xs text-gray-400">Showing 1 to 10 out of 50 </h1>
         </div>
         </div>
        </div>  
        <div className={`absolute ${openPurchase ? 'block' : 'hidden'} fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center`}>
         <form onSubmit={handleSubmit} className="relative bg-white p-4 rounded-md max-w-md">
          <X onClick={() => setopenPurchase(!openPurchase)} className="absolute top-3 right-4 h-5 w-5 text-gray-600 cursor-pointer"/>
          <h1 className="font-bold text-center text-sm text-gray-600">Add Purchase</h1>
          <label htmlFor="" className="text-sm text-gray-400">Purchase number</label>
          <input type="text" name="productNumber" value={String(purchaseDetail.productNumber)} onChange={handleChange} className="w-full p-2 mb-2 border rounded-md outline-none" placeholder="#4859"/>
          <label htmlFor="" className="text-sm text-gray-400">Product name</label>
          <input type="text" name="productName" value={String(purchaseDetail.productName)} onChange={handleChange} className="w-full p-2 mb-2 border rounded-md outline-none"/>
          <label htmlFor="" className="text-sm text-gray-400">Product image</label>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/jpeg,image/png,.jpg,.jpeg,.png" name="productImage" className="w-full p-2 mb-2 border rounded-md outline-none"/>
          <label htmlFor="" className="text-sm text-gray-400">Quantity</label>
          <input type="number" name="quantity" value={String(purchaseDetail.quantity)} onChange={handleChange} className="w-full p-2 mb-2 border rounded-md outline-none"/>
          <label htmlFor="" className="text-sm text-gray-400">Amount</label>
          <input type="number" name="amount" value={String(purchaseDetail.amount)} onChange={handleChange} className="w-full p-2 mb-2 border rounded-md outline-none"/>
          <label htmlFor="" className="text-sm text-gray-400">Date</label>
          <input type="date" name="date" value={String(purchaseDetail.date)} onChange={handleChange} className="w-full p-2 mb-2 border rounded-md outline-none"/>
          <label htmlFor="" className="text-sm text-gray-400">Supplier</label>
          <input type="text" name="supplier" value={String(purchaseDetail.supplier)} onChange={handleChange} className="w-full p-2 mb-2 border rounded-md outline-none"/>
          <button className="w-full py-2 rounded-md font-extrabold text-white bg-[#244504] cursor-pointer mt-2">Add purchase</button>
         </form>
        </div>           
    </div>
  )
}

export default Purchases
