import { useEffect, useState } from "react"
import { useFormDetail } from "../store/authStore"
import { Outlet, useNavigate } from "react-router-dom"
import { Menu } from "lucide-react"

function Home() {
    const { authenticateUser,details, setDetails } = useFormDetail()
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

    authentication()
    
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
  return (
    <div className={`flex dark w-full`}>
        <div className={`fixed left-0 inset-0 h-screen ${open ? 'w-[5%]' : 'w-[15%]'} transition-all duration-300 bg-white/60 border-r-3 border-r-white
        shadow-md
        `}></div>
        <div>
            <div className={`absolute right-0 shadow-md cursor-pointer flex justify-between items-center top-0 h-[8vh] ${open ? 'w-[95%]' : 'w-[85%]'} transition-all duration-300 bg-white/60 border-b-2 border-b-white`}>
            <div onClick={() => {setOpen(!open)}} className="bg-white ml-4 rounded-md p-1">
                <Menu className={`h-5 text-green-950`}/>
            </div>
            </div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Home
