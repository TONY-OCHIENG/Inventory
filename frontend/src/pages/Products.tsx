import { Box, ChevronRight, Download, FileDown, FileSpreadsheet, Plus } from "lucide-react"
import { useState } from "react"
import { FaFileCsv } from "react-icons/fa6"

function Products() {
    const [open, setopen] = useState<Boolean>(false)
  return (
    <div className="p-4 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
         <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Total Products</h1>
            <div className="flex gap-4">
              <Box className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Available Stock</h1>
            <div className="flex gap-4 ">
              <Box className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Out Of Stock</h1>
            <div className="flex gap-4 ">
              <Box className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
           <div className="bg-white/70 p-4 rounded-md  shadow-md cursor-pointer  border-t-2 border-t-white">
            <h1 className="text-center text-sm text-gray-600">Low Stock</h1>
            <div className="flex gap-4 ">
              <Box className="w-10 h-10 text-gray-600"/>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-700">20</h1>
                <p className="text-xs text-gray-400">units</p>
              </div>
            </div>
          </div>
        </div> 
        <div className="mt-4 w-full flex gap-4 h-[83%]">
         <div className={`transition duration-300 border-t-2 border-t-white ${open ? 'w-[180px]' : 'w-[50px]'} bg-white/70 p-2 shadow-md rounded-md h-[40vh]`}>
         <div className="flex justify-between items-center">
            <h1 className={`${open ? 'block' : 'hidden'} text-sm text-gray-600 font-bold`}>Actions</h1>
            <ChevronRight onClick={() => setopen(!open)}  className={`transition duration-300 ${open ? 'rotate-180' : ''} h-4 w-4 text-gray-600 cursor-pointer`}/>
         </div>
         <hr className="mt-2"/>
         <div className="mt-4 flex flex-col gap-5">
            <div className="flex gap-2 items-center cursor-pointer">
                <Plus  className={`${open ? 'h-4 w-4' : ''}  text-gray-600`}/>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Add Products</h1>
            </div>
              <div className="flex gap-2 items-center cursor-pointer">
                <Download className={`${open ? 'h-4 w-4' : ''}  text-gray-600`}/>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Download As Excel</h1>
            </div>
              <div className="flex gap-2 items-center cursor-pointer">
                <FileSpreadsheet  className={`${open ? 'h-4 w-4' : ''}  text-gray-600`}/>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Import Excel Sheet</h1>
            </div>
              <div className="flex gap-2 items-center cursor-pointer">
                <FileDown  className={`${open ? 'h-4 w-4' : ''}  text-gray-600`}/>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Download As CSV</h1>
            </div>
              <div className="flex gap-2 items-center cursor-pointer">
                <FaFileCsv  className={`${open ? '' : 'h-5 w-5 ml-1'}  text-gray-600`}/>
                <h1 className={`${open ? 'block' : 'hidden'} text-xs text-gray-400`}>Import As CSV</h1>
            </div>

         </div>
         </div>
        </div>             
    </div>
  )
}

export default Products
