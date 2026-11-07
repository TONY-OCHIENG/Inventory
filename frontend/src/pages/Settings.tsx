import { ChevronRight, Lock, User } from "lucide-react"


function Settings() {
  return (
    <div className="p-4 w-full h-full">
        <div className={`bg-white/80 border-t-2 border-t-white p-4 rounded-md w-[15%] flex flex-col`}>
          <div className="flex justify-between items-center">
            <h1 className={` text-sm text-gray-600 font-bold`}>Settings</h1>
            <ChevronRight className={`transition duration-300  h-4 w-4 text-gray-600 cursor-pointer`}/>
          </div>
         <hr className="mt-2"/>
        <div className="flex gap-2 items-center text-gray-500 cursor-pointer mt-2">
            <User className="h-4 w-4"/>
            <h1 className="text-sm">Profile</h1>
        </div>
         <div className="flex gap-2 items-center text-gray-500 cursor-pointer mt-2">
            <Lock className="h-4 w-4"/>
            <h1 className="text-sm">Change Password</h1>
        </div>
        </div>
    </div>
  )
}

export default Settings
