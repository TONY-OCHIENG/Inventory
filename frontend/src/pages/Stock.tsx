import { Box, FolderOpen, Minus, PackageMinus, Plus, TrendingDown, TrendingUp, X } from "lucide-react"
import { useEffect, useState } from "react";
import type { StFilter } from "../types/types";
import { useProduct } from "../store/productStore";
import { useFormDetail } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

function Stock() {
    const { product, setProducts,totalProducts,productSingle,setsignleProduct} = useProduct()
    const [openDeduction, setopenDeduction] = useState<Boolean>(false)
    const [userID, setUserID] = useState<String>("")
    const [page, setPage] = useState<number>(1)
    let limit = 10
    const navigate = useNavigate()
    const { authenticateUser } = useFormDetail()
    const [activeFilter, setActiveFilter] = useState<StFilter>('All')
    const filteredProducts =
      activeFilter === 'All'
        ? product
        : product.filter((item) => item.stock === activeFilter)
    const filterButtons: { label: string; value: StFilter }[] = [
                  { label: 'All', value: 'All'},
                  { label: 'In stock', value: 'Available'},
                  { label: 'Low stock', value: 'Low stock'},
                  { label: 'Out of stock', value: 'Depleted'}               
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

    //implementing a function that handle stock text color based on availability

    const handleStock = (text: String) => {
      if (text === 'Available') {
        return <p className="text-green-500 bg-green-100 rounded-full  w-[70px]">{text}</p>
      }

      if (text === 'Low stock') {
        return <p className="text-amber-500 bg-amber-100 rounded-full w-[70px]">{text}</p>
      } 

      if (text === 'Depleted') {
        return <p className="text-red-500 bg-red-100  rounded-full w-[70px]">{text}</p>
      }
    }  
    
    const handleOpenDeduction = async (product_id: String) => {
      setopenDeduction(!openDeduction)
      await setsignleProduct(product_id)
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
        <div className="mt-4 scrollbar-thin  h-[74vh] overflow-x-auto w-full p-4 rounded-md border-t-2 border-t-white bg-white/70">
         <div className="flex gap-2 mb-2">
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
         <div className="h-[63vh] w-full">
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
              <tbody className=" w-full text-sm text-gray-500">
              {
                filteredProducts && filteredProducts.length > 0 ?
                filteredProducts.map((item) => (
                  <tr className="w-full text-left even:bg-gray-50">
                    <td className="p-2">{item.sku}</td>
                    <td><img src={`http://localhost:3000/images/`+ item.productImage} alt=""  className="h-11 w-11 p-1"/></td>
                    <td>{item.productName}</td>                    
                    <td>{item.quantity}</td>
                    <td>{item.category}</td>  
                    <td>{item.supplier}</td>                  
                    <td className="text-center">{handleStock(item.stock)}</td>                 
                    <td className="">
                     <div className="flex gap-2 items-center">
                       <Minus onClick={() => handleOpenDeduction(item.product_id)} className="rounded-md text-red-600 bg-red-200 cursor-pointer p-1">
                        <title>Move stock</title>
                       </Minus>
                       <Plus className=" rounded-md cursor-pointer bg-green-200 text-green-600 p-1">
                        <title>Add stock</title>
                       </Plus>
                     </div>
                    </td>
                  </tr>
                )) :
                <tr className="h-[59vh]">
                  <td colSpan={8} className="text-center ">
                    <div className="flex flex-col justify-center items-center">
                        <FolderOpen className="h-8 w-8"/>
                       <h1 className="text-sm text-gray-600 font-extrabold">Products not available</h1>
                    </div>                  
                  </td>
                </tr>
              } 
            </tbody>
         </table>
         </div>
         <div className="flex w-full justify-between items-center">
            <h1 className="text-xs text-gray-400"></h1>
            <Pagination page={page} setPage={setPage} total={totalProducts} limit={limit} />
         </div>
        </div>  
        <div className={`${openDeduction ? 'block' : 'hidden'} absolute fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center`}>
          <form   action=""  className="relative bg-white p-4 rounded-md max-w-md">
            <X onClick={() => setopenDeduction(!openDeduction)} className="absolute top-3 right-4 h-5 w-5 text-gray-600 cursor-pointer"/>
            <h1 className="text-center text-sm text-gray-600 font-extrabold">Deduct stock</h1>
            <label className="text-sm text-gray-600" htmlFor="">Product name</label>
            <input type="text" name="productName"  placeholder="" className="w-full p-2 border border-gray-400 rounded-md"/>
            <label className="text-sm text-gray-600" htmlFor="">Quantity</label>
            <input type="number" name="quantity"  placeholder="" className="w-full p-2 border border-gray-400 rounded-md"/>
            <button className="w-full py-2 rounded-md font-extrabold text-white bg-[#244504] cursor-pointer mt-3">Deduct</button>
          </form>
        </div>    
    </div>
  )
}

export default Stock
