import { Box, PackageMinus, TrendingDown, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react";
import type { StFilter } from "../types/types";
import { useProduct } from "../store/productStore";
import { useFormDetail } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

function Stock() {
    const { product, setProducts,totalProducts } = useProduct()
    const [userID, setUserID] = useState<String>("")
    const [page, setPage] = useState<number>(1)
    let limit = 10
    const navigate = useNavigate()
    const { authenticateUser } = useFormDetail()
    const [activeFilter, setActiveFilter] = useState<StFilter>('All')
    const filterButtons: { label: string; value: StFilter }[] = [
                  { label: 'All', value: 'All'},
                  { label: 'In stock', value: 'In stock'},
                  { label: 'Low stock', value: 'Low stock'},
                  { label: 'Out of stock', value: 'Out of stock'}               
            ]
    useEffect(() => {
        handleAuthentication()
        setProducts(userID,page,limit)
    },[userID,page])
    const handleAuthentication = async () => {
        const { success, user_id} = await authenticateUser()
        if (success) {
          setUserID(user_id)
        } else {
          navigate('/login')      
        }
    }

    
  return (
   
    <div className="relative w-full p-4 h-full">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
         <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Total Products</h1>
            <div className="flex gap-4 ml-4">
              <Box className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">10</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">In Stock</h1>
            <div className="flex gap-4 ml-4">
              <TrendingUp className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">3</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Low Stock</h1>
            <div className="flex gap-4 ml-4">
              <TrendingDown className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">4</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Out Of Stock</h1>
            <div className="flex gap-4 ml-4">
              <PackageMinus className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">0</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div> 
        </div> 
        <div className="mt-8 scrollbar-thin h-[72vh] overflow-x-auto w-full p-4 rounded-md border-t-2 border-t-white bg-white/70">
         <div className="flex gap-2 mb-4">
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
         <div className="h-[59vh] w-full">
         <table className="w-full bg-white mt-3">
            <thead className="text-gray-600 text-sm text-left border-b border-gray-400">
                <th className="p-2">SKU</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Action</th>
            </thead>
         </table>
         </div>
         <div className="flex w-full justify-between items-center">
            <h1 className="text-xs text-gray-400"></h1>
            <Pagination page={page} setPage={setPage} total={totalProducts} limit={limit} />
         </div>
        </div>      
    </div>
  )
}

export default Stock
