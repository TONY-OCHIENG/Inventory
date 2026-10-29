import { Ban, ChevronRight, Download, Edit, FileDown, FileSpreadsheet, FolderOpen, Gift, NotebookPenIcon, Plus, ShoppingBag, Timer, Trash, X } from "lucide-react"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { FaFileCsv } from "react-icons/fa6"
import { usePurchase } from "../store/purchaseStore"
import type { Purchase, PurchaseFilter } from "../types/types"
import toast from "react-hot-toast"
import { useFormDetail } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import Pagination from "../components/Pagination"
import { formatDate } from "../components/dateFormat"

function Purchases() {
    const [open, setopen] = useState<Boolean>(true)
    const [openPurchase,setopenPurchase] = useState<Boolean>(false)
    const { addPurchase, setPurchases,purchase,totalPurchase,cancelPurchase,recievePurchase,
      deletePurchase
     } = usePurchase()
    const { authenticateUser} = useFormDetail()
    const [userID, setUserID] = useState<String>("")
    const navigate = useNavigate()
    const [image, setImage] = useState<File | null>()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [page, setPage] = useState<number>(1)
    let limit = 10
    const [purchaseDetail, setpurchaseDetail] = useState<Purchase>({
      purchase_id:"",
      productNumber: "",
      productName: "",
      productImage: null,
      quantity: "",
      date: "",
      supplier: "",
      status:"",
      amount: ""
    })

    useEffect(() => {
      authentication()
      setPurchases(userID,page,limit)
    },[userID,page])

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
      formData.append('amount',purchaseDetail.amount)

      const { success, message} = await addPurchase(userID,formData)
      if (success) {
        toast.success(message)
      } else {
        toast.error(message)
      }

      setpurchaseDetail({
        purchase_id:"",
        productNumber: "",
        productName: "",
        productImage: null,
        quantity: "",
        date: "",
        supplier: "",
        status:"",
        amount: ""
      })

      if (fileInputRef.current) fileInputRef.current.value = "";
      setImage(null);
      setopenPurchase(false)
      setPurchases(userID,page,limit)
    }

      /**
         * A filter function that filters purchases
         * according to purchases recieved, pending and canceled
         */
        
        const [activeFilter, setActiveFilter] = useState<PurchaseFilter>('All')
        const filteredPurchases =
          activeFilter === 'All'
            ? purchase
            : purchase.filter((item) => item.status === activeFilter)
    
        const filterButtons: { label: string; value: PurchaseFilter }[] = [
          { label: 'All', value: 'All' },
          { label: 'Pending', value: 'Pending' },
          { label: 'Recieved', value: 'Recieved' },
          { label: 'Canceled', value: 'Canceled' },
        ]

      /**
       * A function that handles background color change of status
       */

      const handleStatusColor = (status: string) => {
        if (status === 'Pending') {
          return <p className="text-sm bg-amber-200  w-[70px] rounded-full text-amber-600">{status}</p>
        }

        if (status === 'Recieved') {
          return <p className="text-sm bg-green-200  w-[70px] rounded-full text-green-600">{status}</p>
        }

        if (status === 'Canceled') {
          return <p className="text-sm bg-red-200  w-[70px] rounded-full text-red-600">{status}</p>
        }
      }
    /**
     * Implementing a function that cancel purchase
     */
    const handleCancelPurchase = async (purchase_id: String) => {
      const { success, message} = await cancelPurchase(purchase_id)
      if (success) {
        toast.success(message)
      } else {
        toast.error("An error occured")
      }
      await setPurchases(userID,page,limit)
    }

    //A function that updates purchases made to recieved

    const handleRecievePurchase = async (purchase_id: String) => {
      const { success, message} = await recievePurchase(purchase_id)
      if (success) {
        toast.success(message)
      } else {
        toast.error("An error occured")
      }
      await setPurchases(userID,page,limit)
    }

  // A function that deletes purchases

  const handleDeletepurchase = async (purchase_id: String) => {
    const { success, message} = await deletePurchase(purchase_id)
    if (success) {
      toast.success(message)
    } else {
      toast.error("An error occured")
    }
     await setPurchases(userID,page,limit)
  }

  return (
   <div className="relative p-4 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
         <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">All Purchases</h1>
            <div className="flex gap-4 ml-4">
              <ShoppingBag className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{totalPurchase}</h1>
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
        <div className="mt-4 w-full flex gap-2 h-[84%]">
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
         <div className="overflow-y-auto scrollbar-thin h-full w-full bg-white/70 border-t-2 border-t-white rounded-md shadow-md p-2">
         <div className="flex justify-between items-center">
            <div className="flex gap-2">
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
         </div>
         <hr className="text-gray-600 mt-1"/>
         <table className="w-full overflow-y-auto bg-white">
            <thead className="text-sm text-left text-gray-600 border-b">
                <th className="p-2">Purchase No</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Supplier</th>                
                <th>Status</th>
                <th>Action</th>
            </thead>
            <tbody className="overflow-y-auto">
              {
                filteredPurchases.length > 0 ?
                filteredPurchases.map((item) => (
                  <tr className="w-full text-left even:bg-gray-50 text-sm text-gray-600">
                    <td className="p-2">{item.productNumber}</td>
                    <td>{item.productName}</td>
                    <td><img src={`http://localhost:3000/images/`+ item.productImage} alt=""  className="h-11 w-11 p-1"/></td>
                    <td>{item.quantity}</td>
                      <td>{item.amount}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.supplier}</td>                  
                    <td className="text-center">{handleStatusColor(item.status)}</td>
                    <td>
                     <div className="flex gap-1 items-center">
                      <NotebookPenIcon onClick={() => handleRecievePurchase(item.purchase_id)} className="text-green-400 h-5 w-5 cursor-pointer">
                        <title>Recieve</title>
                      </NotebookPenIcon>
                      <Ban onClick={() => handleCancelPurchase(item.purchase_id)}  className="text-gray-800 h-5 w-5 cursor-pointer">
                        <title>Cancel</title>
                      </Ban>                      
                        <Trash onClick={() => handleDeletepurchase(item.purchase_id)} className="text-red-400 h-5 w-5 cursor-pointer">
                        <title>Delete</title>
                      </Trash>
                     </div>
                    </td>
                  </tr>
                ))
                :
                <tr className="h-[59vh]">
                  <td colSpan={8} className="text-center ">
                    <div className="flex flex-col justify-center items-center">
                        <FolderOpen className="h-8 w-8"/>
                       <h1 className="text-sm text-gray-600 font-extrabold">Purchases not made</h1>
                    </div>                  
                  </td>
                </tr>
              }
            </tbody>
         </table>
         <hr className="text-gray-600 mb-1"/>
         <div className="flex w-full justify-between items-center">
            <h1 className="text-xs text-gray-400"></h1>
             <Pagination page={page} setPage={setPage} total={totalPurchase} limit={limit} />
         </div>
         </div>
        </div>  
        <div className={`absolute ${openPurchase ? 'block' : 'hidden'} fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center`}>
         <form onSubmit={handleSubmit} className="relative bg-white p-4 rounded-md max-w-md">
          <X onClick={() => setopenPurchase(!openPurchase)} className="absolute top-3 right-4 h-5 w-5 text-gray-600 cursor-pointer"/>
          <h1 className="font-bold text-center text-sm text-gray-600">Add Purchase</h1>
          <label htmlFor="" className="text-sm text-gray-400">Purchase number</label>
          <input type="text" name="productNumber" value={String(purchaseDetail.productNumber)} onChange={handleChange} className="w-full p-2 mb-2 border rounded-md outline-none" placeholder="eg #4859"/>
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
