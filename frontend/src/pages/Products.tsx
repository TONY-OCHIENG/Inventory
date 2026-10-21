import { Box, ChevronRight, Download, FileDown, FileSpreadsheet, Package, PackageMinus, PackageX, Plus, X } from "lucide-react"
import { useState } from "react"
import { FaFileCsv } from "react-icons/fa6"

function Products() {
    const [open, setopen] = useState<Boolean>(false)
    const [openAddProduct, setOpenAddProduct] = useState<Boolean>(false)
  return (
    <div className="relative overflow-x-hidden p-4 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
         <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Total Products</h1>
            <div className="flex gap-4 ml-4">
              <Box className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Available Stock</h1>
            <div className="flex gap-4 ml-4">
              <Package className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Out Of Stock</h1>
            <div className="flex gap-4 ml-4">
              <PackageX className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Low Stock</h1>
            <div className="flex gap-4 ml-4">
              <PackageMinus className="w-10 h-10 text-gray-600"/>
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
            <div onClick={() => setOpenAddProduct(!openAddProduct)} className="flex gap-2 items-center cursor-pointer hover:bg-white p-2 rounded-md">
                <Plus  className={`${open ? 'h-4 w-4' : ''}  text-gray-600`}>
                    <title>Add Products</title>
                </Plus>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Add Products</h1>
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
            <button className="px-4  text-xs rounded-md bg-white py-1 shadow-md cursor-pointer">In Stock</button>
            <button className="px-4  text-xs rounded-md bg-white py-1 shadow-md cursor-pointer">Out of Stock</button>
            <button className="px-4  text-xs rounded-md bg-white py-1 shadow-md cursor-pointer">Low Stock</button>
            </div>
            <div>
                <input type="text" placeholder="Search product name..." className="border text-sm rounded-md px-2 bg-white outline-none 
                text-gray-600 placeholder:text-xs"/>
            </div>
         </div>
         <hr className="text-gray-600 mt-1"/>
         <table className="w-full overflow-y-auto bg-white h-[90%]">
            <thead className="text-sm text-gray-600 border-b">
                <th></th>
                <th className="p-2">SKU</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Quantity</th>
                <th>Stock</th>
                <th>Supplier</th>
                <th>Category</th>
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
        <div className={`${openAddProduct ? 'block' : 'hidden'} absolute w-full h-full bg-black/50 top-0 left-0 flex justify-center items-center`}>
          <form className="relative p-4 bg-white rounded-md max-w-md">
           <h1 className="text-sm font-bold text-gray-600 text-center">Add Products</h1>
           <X onClick={() => setOpenAddProduct(!openAddProduct)} className="h-5 w-5 cursor-pointer font-extrabold text-gray-600 absolute top-1 right-3"/>
           <label htmlFor="" className="text-sm text-gray-600 ">SKU</label>
           <input type="text" className="w-full p-2 border rounded-md outline-none mb-2"/>
           <label htmlFor="" className="text-sm text-gray-600 ">Product name</label>
           <input type="text" className="w-full p-2 border rounded-md outline-none mb-2"/>
           <label htmlFor="" className="text-sm text-gray-600 ">Product image</label>
           <input type="file"  accept="image/jpeg,image/png,.jpg,.jpeg,.png" className="w-full p-2 border rounded-md outline-none mb-2"/>
           <label htmlFor="" className="text-sm text-gray-600 ">Quantity</label>
           <input type="number" className="w-full p-2 border rounded-md outline-none mb-2"/>
           <label htmlFor="" className="text-sm text-gray-600 ">Supplier name</label>
           <input type="text" className="w-full p-2 border rounded-md outline-none mb-2"/>
           <label htmlFor="" className="text-sm text-gray-600 ">Product Category</label>
           <input type="text" className="w-full p-2 border rounded-md outline-none mb-2"/>
           <button className="py-2 w-full bg-[#244504] font-extrabold text-white mt-2 cursor-pointer rounded-md">Add products</button>
          </form>
        </div>          
    </div>
  )
}

export default Products
