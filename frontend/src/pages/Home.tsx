import { useEffect, useState } from "react"
import { useFormDetail } from "../store/authStore"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { Barcode, Bell, Box, ChevronDown, LayoutDashboard, LogOut, Menu, Notebook, NotebookPen, Package, Receipt, ReceiptText, RotateCcw, Settings, ShoppingBag, Truck, User } from "lucide-react"
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
            //  navigate("/dashboard")            
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
    const [openNotificaton, setopenNotification] = useState<Boolean>(false)
    const [openProfile, setopenProfile] = useState<Boolean>(false)
    /**
     * Navigation menu links
     */
    const mainLinks = [
        {name: "Dashboard",link:'/dashboard', icon:LayoutDashboard},
        {name: "Products",link:'/dashboard/products', icon:Box},
        {name: "Purchases",link:'/dashboard/purchases', icon:ShoppingBag},
        {name: "Suppliers",link:'/dashboard/supplier', icon:Truck},
        {name: "Returns",link:'/dashboard/returns', icon:RotateCcw}
    ]
    const stockLinks = [
        {name: "Stock",link:'/dashboard/stock', icon:Package}
    ]
    const documents = [
        {name: "Invoice",link:'/dashboard/invoice', icon:ReceiptText},
        {name: "Quotation",link:'/dashboard/quotation', icon:Receipt},
        {name: "Goods recieved note",link:'/dashboard/quotation', icon:Notebook},
        {name: "Purchase order",link:'/dashboard/purchaseorder', icon:NotebookPen}
    ]
    const barcode = [
         {name: "Barcode",link:'/dashboard/barcode', icon:Barcode}
    ]
    const notifications = [
        {name: "Notification",link:'/dashboard/notification', icon:Bell}
    ]

    const settings = [
        {name: "Settings",link:'/dashboard/settings', icon:Settings}
    ]

  return (
    <div className={`flex  w-[100%] h-screen`}>
       <div className={` bottom-0 top-0 inset-y-0   left-0 ${open ? 'w-[15%] md:w-[5%]' : 'w-[50%] md:w-[15%]'} transition-all duration-300 bg-white/60 border-r-3 border-r-white
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
            <div className="py-5 flex flex-col overflow-auto scrollbar-none">
                <h1 className="text-xs text-gray-400">MAIN</h1>
                <div>
                    <ul className="">
                        {
                            mainLinks.map((item) => (
                                <li className="mb-1"><NavLink end
                               className={({isActive}) => `relative flex items-center hover:bg-white/60 rounded-md
                              max-md:justify-center gap-2 w-full rounded-2 py-2.5 text-xs text-gray-400 
                               ${isActive && 'bg-white/90 rounded-md text-gray-400 group'}`}
                                to={item.link}> <item.icon className="h-5 text-gray-400">
                                <title>{item.name}</title>
                                </item.icon>
                                 <span className={`${open ? 'hidden' : 'block'}`}>{item.name}</span>
                                </NavLink></li>
                            ))
                        }
                    </ul>                
                </div> 
                  <h1 className="text-xs text-gray-400">STOCK</h1>
                <div>
                    <ul className="">
                        {
                            stockLinks.map((item) => (
                                <li className="mb-1"><NavLink 
                               className={({isActive}) => `relative flex items-center hover:bg-white/60 rounded-md
                              max-md:justify-center gap-2 w-full rounded-2 py-2.5 text-xs text-gray-400 
                               ${isActive && 'bg-white/90 rounded-md text-gray-400 group'}`}
                                to={item.link}> <item.icon className="h-5 text-gray-400">
                                <title>{item.name}</title>
                                </item.icon>
                                 <span className={`${open ? 'hidden' : 'block'}`}>{item.name}</span>
                                </NavLink></li>
                            ))
                        }
                    </ul>                
                </div>
                  <h1 className="text-xs text-gray-400">DOCUMENTS</h1>
                <div>
                    <ul className="">
                        {
                            documents.map((item) => (
                                <li className="mb-1"><NavLink 
                               className={({isActive}) => `relative flex items-center hover:bg-white/60 rounded-md
                              max-md:justify-center gap-2 w-full rounded-2 py-2.5 text-xs text-gray-400 
                               ${isActive && 'bg-white/90 rounded-md text-gray-400 group'}`}
                                to={item.link}> <item.icon className="h-5 text-gray-400">
                                <title>{item.name}</title>
                                </item.icon>
                                 <span className={`${open ? 'hidden' : 'block'}`}>{item.name}</span>
                                </NavLink></li>
                            ))
                        }
                    </ul>                
                </div>    
                   <h1 className="text-xs text-gray-400">BARCODE</h1>
                <div>
                    <ul className="">
                        {
                            barcode.map((item) => (
                                <li className="mb-1"><NavLink 
                               className={({isActive}) => `relative flex items-center hover:bg-white/60 rounded-md
                              max-md:justify-center gap-2 w-full rounded-2 py-2.5 text-xs text-gray-400 
                               ${isActive && 'bg-white/90 rounded-md text-gray-400 group'}`}
                                to={item.link}> <item.icon className="h-5 text-gray-400">
                                <title>{item.name}</title>
                                </item.icon>
                                 <span className={`${open ? 'hidden' : 'block'}`}>{item.name}</span>
                                </NavLink></li>
                            ))
                        }
                    </ul>                
                </div>   
                  <h1 className="text-xs text-gray-400">NOTIFICATIONS</h1>
                <div>
                    <ul className="">
                        {
                            notifications.map((item) => (
                                <li className="mb-1"><NavLink 
                               className={({isActive}) => `relative flex items-center hover:bg-white/60 rounded-md
                              max-md:justify-center gap-2 w-full rounded-2 py-2.5 text-xs text-gray-400 
                               ${isActive && 'bg-white/90 rounded-md text-gray-400 group'}`}
                                to={item.link}> <item.icon className="h-5 text-gray-400">
                                <title>{item.name}</title>
                                </item.icon>
                                 <span className={`${open ? 'hidden' : 'block'}`}>{item.name}</span>
                                </NavLink></li>
                            ))
                        }
                    </ul>                
                </div>    
                   <h1 className="text-xs text-gray-400">SETTINGS</h1>
                <div>
                    <ul className="">
                        {
                            settings.map((item) => (
                                <li className="mb-1"><NavLink 
                               className={({isActive}) => `relative flex items-center hover:bg-white/60 rounded-md
                              max-md:justify-center gap-2 w-full rounded-2 py-2.5 text-xs text-gray-400 
                               ${isActive && 'bg-white/90 rounded-md text-gray-400 group'}`} end
                                to={item.link}> <item.icon className="h-5 text-gray-400">
                                <title>{item.name}</title>
                                </item.icon>
                                 <span className={`${open ? 'hidden' : 'block'}`}>{item.name}</span>
                                </NavLink></li>
                            ))
                        }
                    </ul>                
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
                     <p className={`${open ? 'hidden' : 'block'} text-gray-700 text-xs`}>Admin</p>
                    </div>  
                    <LogOut onClick={logoutUser} className={`w-5 h-5 text-gray-700 ${open ? 'hidden' : 'block'} cursor-pointer`}/>                  
                </div>                
            </div>
        </div>        
        <div className={`overflow-y-auto scrollbar-none w-full flex-1 ${open ? 'w-[85%] md:w-[95%]' : 'w-[50%] md:w-[85%] right-0 '}`}>
            <div className={` fixed right-0 px-4 shadow-md flex justify-between items-center top-0 h-[8vh] ${open ? 'w-[85%] md:w-[95%]' : 'w-[50%] md:w-[85%]'} transition-all duration-300 bg-white/60 border-b-2 border-b-white`}>
            <div onClick={() => {setOpen(!open)}} className="bg-white cursor-pointer  rounded-md p-1">
                <Menu className={`h-5 text-green-950`}/>
            </div>
            <div className="flex gap-6 items-center mr-6">
                <div>
                    <Bell onClick={() => {setopenNotification(!openNotificaton), setopenProfile(false)}} className="h-5 text-gray-500 cursor-pointer"/>
                    <div className={`${openNotificaton ? 'block' : 'hidden'} absolute bg-white/80 rounded-md shadow-md p-4 w-[300px] h-[120px] right-[10%] bottom-[-7rem]`}>
                        <div className="flex justify-between border-b-1 items-center">
                            <h1 className="text-sm text-green-900">Notifications</h1>
                            <p className="text-xs cursor-pointer text-gray-600">view all</p>
                        </div>
                        <div className="flex flex-col w-full justify-center items-center p-4">
                            <Bell className="text-gray-500 h-5"/>
                            <p className="text-xs text-gray-600">No new notifications</p>
                        </div>
                    </div>
                </div>
                <div  onClick={() => {setopenProfile(!openProfile), setopenNotification(false)}}  className={`flex justify-center items-center gap-2`}>
                    <div className="h-8 w-8 rounded-full bg-white flex justify-center items-center">
                         <h1 className="font-extrabold text-gray-600 cursor-pointer">
                            {
                                details.map((item) => (<span>{item.firstName.charAt(0)}{item.lastName.charAt(0)}</span>))               
                            }
                        </h1>
                    </div>
                    <div>
                        <ChevronDown className={`text-gray-500 ${openProfile ? 'rotate-180' : ''} transition-all duration-200 cursor-pointer h-5`}/>
                    </div>
                       <div className={`${openProfile ? 'block' : 'hidden' } absolute bg-white/80 rounded-md shadow-md p-4 w-[200px] h-[120px] right-[1%] bottom-[-7rem]`}>
                        <div className="flex flex-col border-b-1 ">
                        <h1 className="text-sm text-gray-800 font-serif">{
                           details.map((item) => (<span>{item.firstName} {item.lastName}</span>))  
                        }</h1>
                            <p className="text-[0.8rem] cursor-pointer text-gray-600">{
                              details.map((item) => (<span>{item.email}</span>))     
                            }</p>
                        </div>
                        <div className="flex flex-col w-full ">
                            <div className={`flex gap-2 items-center mt-2 cursor-pointer`}>
                             <Settings className="h-5 text-gray-600"/>
                             <p className="text-sm text-gray-600">Settings</p>
                            </div>  
                            <div className={`flex gap-2 items-center mt-2 cursor-pointer`}>
                             <User className="h-5 text-gray-600"/>
                             <p className="text-sm text-gray-600">Profile</p>
                            </div>                           
                        </div>
                    </div>
                    
                </div>
            </div>
            </div>
            <div className="scrollbar-thin h-[92%] overflow-auto w-full  mt-15 ">
                <Outlet/> 
            </div>                                       
        </div>       
     </div>
  )
}

export default Home
