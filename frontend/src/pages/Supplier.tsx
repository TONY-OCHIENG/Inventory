import { Activity, BanIcon, Truck, Wallet } from "lucide-react"
import type { SupplierFilter } from "../types/types";
import { useState } from "react";

function Supplier() {
     const [activeFilter, setActiveFilter] = useState<SupplierFilter>('All')
     const filterButtons: { label: string; value: SupplierFilter }[] = [
              { label: 'All', value: 'All' },
              { label: 'Active', value: 'Active' },
              { label: 'On hold', value: 'On hold' }              
            ]
  return (
    <div className="p-4 w-full h-full">  
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
         <button className="text-xs mb-2 bg-white font-extrabold text-gray-600 p-2 border-gray-400 border rounded-md cursor-pointer">Add supplier</button>
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
    </div>
  )
}

export default Supplier
