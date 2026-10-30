import { Box, ChevronRight, Download, FolderOpen, Package, PackageMinus, PackageX, Plus, Trash, X } from "lucide-react"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import type { Products, StockFilter } from "../types/types"
import { useProduct } from "../store/productStore"
import toast from "react-hot-toast"
import { useFormDetail } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import { useDownloadExcel } from 'react-export-table-to-excel'
import Pagination from "../components/Pagination"

function Product() {
    const [open, setopen] = useState<Boolean>(true)
    const [openAddProduct, setOpenAddProduct] = useState<Boolean>(false)
    const [image, setImage] = useState<File | null>()
    const { product, createProducts, setProducts,
     availableStock, depletedStock, lowStock, setavailableProducts,
     setdepletedStock, setlowProducts, 
      deleteProduct,totalProducts } = useProduct()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [userID, setUserID] = useState<String>("")
    const { authenticateUser } = useFormDetail()
    const navigate = useNavigate()
    const [page, setPage] = useState<number>(1)
    let limit = 10
    const [productDetail, setProductdetails] = useState<Products>({
      product_id:"",
      sku: "",
      productName:"",
      productImage: null,
      stock: '',
      quantity:"",
      price:"",
      supplier:"",
      category:""
    })

       useEffect(() => {
        authentication()
        setProducts(userID,page,limit)
        setlowProducts(userID)
        setavailableProducts(userID)
        setdepletedStock(userID)
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
    
    const handleOnchange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value} = event.target
      setProductdetails((prev) => ({
        ...prev,
        [name] : value
      }))
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return    
        setImage(file)
    }
    
    const handleSubmit = async (event: ChangeEvent): Promise<void> => {
      event.preventDefault()
    
      if (!image) return //checking if file exists

      const formData = new FormData()
      formData.append('sku',productDetail.sku)
      formData.append('productName',productDetail.productName)
      formData.append('image',image)
      formData.append('quantity',productDetail.quantity)
      formData.append('price',productDetail.price)
      formData.append('supplier',productDetail.supplier)
      formData.append('category',productDetail.category)

      //An api call that post product to the database

      const { success, message} = await createProducts(formData, userID)
      if (success) {
        toast.success(message)
        setOpenAddProduct(false)
      } else {
        toast.error(message)
        setOpenAddProduct(false)
      }

      setProductdetails({
        product_id:'',
        sku: "",
        productName:"",
        productImage: null,
        stock:'',
        quantity:"",
        price:"",
        supplier:"",
        category:""
      })
      
       if (fileInputRef.current) fileInputRef.current.value = "";
       setImage(null);
       setProducts(userID,page,limit)
        setlowProducts(userID)
        setavailableProducts(userID)
        setdepletedStock(userID)
    } 
    //Implementing a function that deletes product
    const handleDeleteProduct = async (product_id: String) => {
      const { success, message} = await deleteProduct(product_id)
      if (success) {
        toast.success(message)
      } else {
        toast.error("An error occured")
      }
      await setProducts(userID,page,limit)
      await setlowProducts(userID)
      await setavailableProducts(userID)
      await setdepletedStock(userID)
    }

    //Downloading table data to excel
    const tableRef = useRef(null)
    const { onDownload } = useDownloadExcel({
        currentTableRef:tableRef.current,
        filename: "product_Details",
        sheet:"product_Details"
    }) 

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

    /**
     * A filter function that filters products 
     * according to stock availability
     */
    
    const [activeFilter, setActiveFilter] = useState<StockFilter>('All')
    const filteredProducts =
      activeFilter === 'All'
        ? product
        : product.filter((item) => item.stock === activeFilter)

    const filterButtons: { label: string; value: StockFilter }[] = [
      { label: 'All', value: 'All' },
      { label: 'In Stock', value: 'Available' },
      { label: 'Low Stock', value: 'Low stock' },
      { label: 'Out of Stock', value: 'Depleted' },
    ]
  return (
    <div className="relative overflow-x-hidden p-4 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
         <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Total Products</h1>
            <div className="flex gap-4 ml-4">
              <Box className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{totalProducts}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Available Stock</h1>
            <div className="flex gap-4 ml-4">
              <Package className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{availableStock}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Out Of Stock</h1>
            <div className="flex gap-4 ml-4">
              <PackageX className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{depletedStock}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Low Stock</h1>
            <div className="flex gap-4 ml-4">
              <PackageMinus className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">{lowStock}</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
        </div> 
        <div className="mt-4 w-full flex gap-2 h-[84%]">
         <div className={`transition duration-300 border-t-2 border-t-white ${open ? 'w-[180px]' : 'w-[50px]'} bg-white/70 p-2 shadow-md rounded-md h-[25vh]`}>
         <div className="flex justify-between items-center">
            <h1 className={`${open ? 'block' : 'hidden'} text-sm text-gray-600 font-bold`}>Actions</h1>
            <ChevronRight onClick={() => setopen(!open)}  className={`transition duration-300 ${open ? 'rotate-180' : ''} h-4 w-4 text-gray-600 cursor-pointer`}/>
         </div>
         <hr className="mt-2"/>
         <div className="mt-4 flex flex-col gap-5">
            <div onClick={() => setOpenAddProduct(!openAddProduct)} className="flex gap-2 items-center cursor-pointer hover:bg-white p-2 rounded-md">
                <Plus  className={`${open ? 'h-4 w-4' : ''}  text-gray-600`}>
                    <title>Add Products</title>
                </Plus>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Add Products</h1>
            </div>
              <div onClick={onDownload} className="flex gap-2 items-center cursor-pointer hover:bg-white p-2 rounded-md">
                <Download className={`${open ? 'h-4 w-4' : ''}  text-gray-600`}>
                    <title>Download As Excel</title>
                </Download>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Export As Excel</h1>
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
         <table ref={tableRef}  className="w-full bg-white">
            <thead className="text-sm text-left text-gray-600 border-b">
                <th className="p-2">SKU</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Stock</th>
                <th>Supplier</th>
                <th>Category</th>
                <th>Action</th>
            </thead>
            <tbody className=" w-full text-sm text-gray-500">
              {
                filteredProducts && filteredProducts.length > 0 ?
                filteredProducts.map((item) => (
                  <tr className="w-full text-left even:bg-gray-50">
                    <td className="p-2">{item.sku}</td>
                    <td>{item.productName}</td>
                    <td><img src={`http://localhost:3000/images/`+ item.productImage} alt=""  className="h-11 w-11 p-1"/></td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td className="text-center">{handleStock(item.stock)}</td>
                    <td>{item.supplier}</td>
                    <td>{item.category}</td>
                    <td className="">
                     <div className="flex gap-2 items-center">
                      <Trash onClick={() => handleDeleteProduct(item.product_id)}  className="text-red-400 h-5 w-5 cursor-pointer">
                        <title>Delete</title>
                      </Trash>
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
         <div className="relative bottom-0 left-0 w-full">
          <hr className=" text-gray-600 mb-1"/>
         <div className="flex w-full justify-between items-center">
            <h1 className="text-xs text-gray-400"></h1>
            <Pagination page={page} setPage={setPage} total={totalProducts} limit={limit} />
         </div>
         </div>
         </div>
        </div>   
        <div className={`${openAddProduct ? 'block' : 'hidden'} absolute fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center`}>
          <form onSubmit={handleSubmit} className="relative p-4 bg-white rounded-md max-w-md">
           <h1 className="text-sm font-bold text-gray-600 text-center">Add Products</h1>
           <X onClick={() => setOpenAddProduct(!openAddProduct)} className="h-5 w-5 cursor-pointer font-extrabold text-gray-600 absolute top-1 right-3"/>
           <label htmlFor="" className="text-sm text-gray-600 ">SKU</label>
           <input type="text" name="sku" value={String(productDetail.sku)} onChange={handleOnchange} className="w-full p-2 border rounded-md outline-none mb-2"/>
           <label htmlFor="" className="text-sm text-gray-600 ">Product name</label>
           <input type="text" name="productName" value={String(productDetail.productName)} onChange={handleOnchange}  className="w-full p-2 border rounded-md outline-none mb-2"/>
           <label htmlFor="" className="text-sm text-gray-600 ">Product image</label>
           <input type="file"  ref={fileInputRef} onChange={handleFileChange} name="image" accept="image/jpeg,image/png,.jpg,.jpeg,.png" className="w-full p-2 border rounded-md outline-none mb-2"/>
           <label htmlFor="" className="text-sm text-gray-600 ">Quantity</label>
           <input type="number" value={String(productDetail.quantity)} name="quantity" onChange={handleOnchange}  className="w-full p-2 border rounded-md outline-none mb-2"/>
           <label htmlFor="" className="text-sm text-gray-600 ">Amount</label>
           <input type="number" value={String(productDetail.price)} name="price" onChange={handleOnchange}  className="w-full p-2 border rounded-md outline-none mb-2"/>
           <label htmlFor="" className="text-sm text-gray-600 ">Supplier name</label>
           <input type="text" name="supplier" value={String(productDetail.supplier)} onChange={handleOnchange}  className="w-full p-2 border rounded-md outline-none mb-2"/>
           <label htmlFor="" className="text-sm text-gray-600 ">Product Category</label>
           <input type="text" name="category" value={String(productDetail.category)} onChange={handleOnchange}  className="w-full p-2 border rounded-md outline-none mb-2"/>
           <button className="py-2 w-full bg-[#244504] font-extrabold text-white mt-2 cursor-pointer rounded-md">Add products</button>
          </form>
        </div>          
    </div>
  )
}

export default Product
