import { useEffect } from "react"
import { useFormDetail } from "../store/authStore"

function Home() {
    const { authenticateUser } = useFormDetail()
    useEffect(() => {
      authentication()
    },[])

    const authentication = async () => {
        const {success, user_id} = await authenticateUser()
        console.log(success, user_id)
    }
  return (
    <div>
      
    </div>
  )
}

export default Home
