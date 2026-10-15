import { useEffect, useState } from "react"
import { useFormDetail } from "../store/authStore"
import { Outlet, useNavigate } from "react-router-dom"
import { Bell, ChevronDown, LogOut, Menu, Moon } from "lucide-react"
import toast from "react-hot-toast"

function Home() {
    const { authenticateUser,details, setDetails,logout } = useFormDetail()
    const [userID, setUserID] = useState<String>("")
    const navigate = useNavigate()
    useEffect(() => {
      authentication()
      fetchDetails(userID)
    },[userID])

    const authentication = async () => {
        const {success, user_id} = await authenticateUser()
        if (success) {
            setUserID(user_id)
             navigate("/dashboard")            
        } else {
            navigate('/login')
        }
    }
    
    /**
     * Implementing a function that fetches user details 
     * after auhtentication user
     */

    const fetchDetails = async (userID: String): Promise<void> => {
        await setDetails(userID)
    }

    /**
     * Opening and closing nav bar
     */
    const [open, setOpen] = useState<Boolean>(false)

    /**
     * Implementing a function that calls logout api
     */

    const logoutUser = async (): Promise<void> => {
        const { success, message } = await logout()
        if (success) {
            navigate('/login')
            toast.success(message)
           
        } else {
            toast.error("An error occured")
        }
    }
    /**
     * Opening and closing notification tab state
     */
  return (
    <div className={`flex dark w-full`}>
        <div className={`relative  left-0 inset-0 h-screen ${open ? 'w-[15%] md:w-[5%]' : 'w-[50%] md:w-[15%]'} transition-all duration-300 bg-white/60 border-r-3 border-r-white
        shadow-md p-2 flex justify-between flex-col
        `}>
            <div className={`p-2 bg-white shadow-md rounded-md top-0 `}>
                <div className="flex gap-2 items-center">
                    <img src="/ims-box-green.svg" className="h-10" alt="" />
                    <div className="flex flex-col w-full"> 
                        <h1 className={`text-2xl text-gray-800 font-bold transition-all  ${open ? 'hidden' : 'block'}`}>IMS</h1>
                        <p className={`text-gray-700 text-[0.5rem] transition-all  ${open ? 'hidden' : 'block'}`}>INVENTORY MANAGEMENT SYSTEM</p>
                    </div>
                </div>                
            </div>
              <div className={`p-2 h-15 bg-white shadow-md rounded-md  mb-1 bottom-0 `}>
                <div className="flex justify-between items-center">
                    <div className={`h-10 w-10 bg-green-50 flex justify-center items-center font-extrabold  rounded-full shadow-md`}>
                        <h1 className="font-extrabold text-gray-600">
                            {
                                details.map((item) => (<span>{item.firstName.charAt(0)}{item.lastName.charAt(0)}</span>))               
                            }
                        </h1>
                    </div>
                    <div className="flex flex-col">
                     <h1 className={`${open ? 'hidden' : 'block'} text-gray-600 text-xs font-serif`}>{
                       details.map((item) => (<span>{item.firstName} {item.lastName}</span>))    
                    }</h1>
                     <p className={`${open ? 'hidden' : 'block'} text-gray-700 text-sm`}>Admin</p>
                    </div>  
                    <LogOut onClick={logoutUser} className={`h-10 text-gray-700 ${open ? 'hidden' : 'block'} cursor-pointer`}/>                  
                </div>                
            </div>
        </div>
        <div>
            <div className={`absolute fixed right-0 px-4 shadow-md flex justify-between items-center top-0 h-[8vh] ${open ? 'w-[85%] md:w-[95%]' : 'w-[50%] md:w-[85%]'} transition-all duration-300 bg-white/60 border-b-2 border-b-white`}>
            <div onClick={() => {setOpen(!open)}} className="bg-white cursor-pointer  rounded-md p-1">
                <Menu className={`h-5 text-green-950`}/>
            </div>
            <div className="flex gap-6 items-center mr-6">
                <div>
                    <Moon className="h-5 text-gray-500 cursor-pointer"/>
                </div>
                <div>
                    <Bell className="h-5 text-gray-500 cursor-pointer"/>
                    <div className={`absolute bg-white/60 rounded-md shadow-md p-4 w-[300px] h-[120px] right-[10%] bottom-[-7rem]`}>
                        <div className="flex justify-between border-b-1 items-center">
                            <h1 className="text-sm text-green-900">Notifications</h1>
                            <p className="text-xs cursor-pointer text-gray-600">view all</p>
                        </div>
                        <div className="flex flex-col w-full justify-center items-center p-4">
                            <Bell/>
                            <p className="text-xs text-gray-600">No new notifications</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-2 cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-white flex justify-center items-center">
                         <h1 className="font-extrabold text-gray-600">
                            {
                                details.map((item) => (<span>{item.firstName.charAt(0)}{item.lastName.charAt(0)}</span>))               
                            }
                        </h1>
                    </div>
                    <div>
                        <ChevronDown className="text-gray-500 h-5"/>
                    </div>
                </div>
            </div>
            </div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Home
