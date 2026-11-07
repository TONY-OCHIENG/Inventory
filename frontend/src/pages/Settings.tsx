import { ChevronRight, Lock, User } from "lucide-react"
import { NavLink, Outlet } from "react-router-dom"


function Settings() {
    const settings = [
        {name: "Profile",link:'/dashboard/settings/profile', icon:User},
        {name: "Password", link:'/dashboard/settings/password', icon:Lock}
    ]
  return (
    <div className="p-4 w-full h-full flex gap-4">
        <div className={`bg-white/80 border-t-2 border-t-white p-4 rounded-md w-[18%] h-[25%] flex flex-col`}>
           <div className="flex justify-between items-center">
             <h1 className={` text-sm text-gray-600 font-bold`}>Settings</h1>
            <ChevronRight className={`transition duration-300  h-4 w-4 text-gray-600 cursor-pointer`}/>
           </div>
           <hr className="mt-2 mb-2 text-gray-400"/>
           <div>
                    <ul className="">
                        {
                            settings.map((item) => (
                                <li className="mb-1"><NavLink end
                               className={({isActive}) => `relative flex items-center hover:bg-white/60 rounded-md
                              max-md:justify-center gap-2 w-full rounded-2 py-2.5 text-xs text-gray-400 
                               ${isActive && 'bg-white/90 rounded-md text-gray-400 group'}`}
                                to={item.link}> <item.icon className="h-5 text-gray-400">
                                <title>{item.name}</title>
                                </item.icon>
                                 <span>{item.name}</span>
                                </NavLink></li>
                            ))
                        }
                    </ul>                
                </div>  
        </div>
        <div className="w-full h-full">
            <Outlet/>
        </div>
    </div>
  )
}

export default Settings
