import { Eye, EyeOffIcon, Loader } from "lucide-react"
import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormDetail } from "../store/authStore"
import toast from "react-hot-toast"
interface LOGIN{
    email: String,
    password: String
}
function Login() {
    const [showPassword, setShowPassword] = useState<Boolean>(false)
    const [detail, setDetail] = useState<LOGIN>({
            email:'',
            password:'',
    })  
    const navigate = useNavigate()
    const {loading,setLoading, loginAccount } = useFormDetail()
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value} = event.target
        setDetail((v) => ({ ...v, [name]: value }));
    }
    const handleSubmit = async (event: ChangeEvent): Promise<void> => {
        event.preventDefault()
        setLoading()
        const { success, message} = await loginAccount(detail)
        if (success) {
            toast.success(message)
            setLoading()
            navigate('/dashboard')
        } else {
            toast.error(message)
            setLoading()
        }
    }
  return (
    <div className="h-screen w-full flex justify-center items-center px-2">
     <form action="" onSubmit={handleSubmit} className="md:w-[28%] w-full p-4 rounded-md bg-white/50">
        <div className="flex items-center justify-center w-full gap-4">
            <img src="/ims-box-green.svg" alt="" className="h-6" />
             <h1 className="text-center text-sm font-extrabold text-gray-600">LOGIN TO IMS</h1>
        </div>       
         
          <label htmlFor="lastName" className="text-gray-600 text-sm">Email</label>
          <input type="email"  name="email" onChange={handleChange} id="email" placeholder="eg. johndoe@gmail.com" required className="placeholder:text-sm w-full p-2 border rounded-md outline-none focus:ring-2
         focus:ring-green-700 mb-2"/>
          <label htmlFor="password"  className="text-gray-600 text-sm flex justify-between">Password</label>          
          <input type={showPassword ? 'text' : 'password'} onChange={handleChange} name="password" id="password" required className="w-full p-2 border rounded-md outline-none focus:ring-2
         focus:ring-green-700 mb-2"/>

         <div className="flex gap-2 cursor-pointer" onClick={() => {setShowPassword(!showPassword)}}>
            {
                showPassword ? 
                 <div className="flex gap-2 cursor-pointer">
                <EyeOffIcon className="h-4 text-gray-400 cursor-pointer"/>
                <p className="text-gray-400 text-xs">hide password</p>
                </div>                 
                :                
                 <div className="flex gap-2 cursor-pointer">
                    <Eye className="h-4 text-gray-400 cursor-pointer"/>
                    <p className="text-gray-400 text-xs">show password</p> 
                </div>  
            }
            
         </div>
         <button className="py-2.5 text-white cursor-pointer font-extrabold flex justify-center  w-full mt-2 bg-[#244504] rounded-md">
            {
                loading ? <Loader className="animate-spin"/> : "Login"
            }
         </button>
         <p className="mt-2 text-gray-400 text-xs">Don't have an Account <Link className="font-extrabold sm" to={'/signup'}>Click to Register</Link></p>
        </form>     
    </div>
  )
}

export default Login
