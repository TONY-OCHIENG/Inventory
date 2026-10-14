import { useEffect, useState } from "react"
import { useFormDetail } from "../store/authStore"
import { useNavigate } from "react-router-dom"

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

    console.log(details)

  return (
    <div>
        {
            details.map((item) => (
                <h1>{item.firstName} {item.lastName}</h1>
            ))
        }
      
    </div>
  )
}

export default Home
