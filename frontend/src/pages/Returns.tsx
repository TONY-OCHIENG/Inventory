import { Ban, CircleCheck, Timer, Undo2 } from "lucide-react"
import type { ReturnFilter } from "../types/types";
import { useState } from "react";

function Returns() {
   const [activeFilter, setActiveFilter] = useState<ReturnFilter>('All')
   const filterButtons: { label: string; value: ReturnFilter}[] = [
                { label: 'All', value: 'All' },
                { label: 'Pending', value: 'Pending' },
                { label: 'Completed', value: 'Completed'},      
                { label: 'Canceled', value: 'Canceled' }           
          ]
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
        <button className="text-sm text-gray-500 px-8 bg-white py-2 rounded-md cursor-pointer border border-gray-400 font-extrabold">Add Return</button>
        </div>
        <div className="flex gap-2 mt-2"></div>
    </div>
  )
}

export default Returns
