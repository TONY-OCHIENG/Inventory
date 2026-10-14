import { useEffect, useState } from "react"
import { useFormDetail } from "../store/authStore"
import { useNavigate } from "react-router-dom"

function Home() {
    const { authenticateUser } = useFormDetail()
    const [userID, setUserID] = useState<String>()
    const navigate = useNavigate()
    useEffect(() => {
      authentication()
    },[])

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
    
    

  return (
    <div>
      
    </div>
  )
}

export default Home
