import { Link } from "react-router-dom"
import { Eye, EyeOffIcon } from 'lucide-react'
import { useState, type ChangeEvent } from "react"

import type { FormInput } from "../types/types"

function Register() {
    const [showPassword, setShowPassword] = useState<Boolean>(false)
    const [detail, setDetail] = useState<FormInput>({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    })    
 

     const handleSubmit = async (event: ChangeEvent): Promise<void> => {
        event.preventDefault()
        
     }
     
  return (
    <div className="w-full h-full flex justify-center items-center px-2">
        <form action="" className="max-w-md p-4 rounded-md bg-white/50">
        <div className="flex items-center justify-center w-full gap-4">
            <img src="/ims-box-green.svg" alt="" className="h-6" />
             <h1 className="text-center text-sm font-extrabold text-gray-600">REGISTER TO IMS</h1>
        </div>       
         <label htmlFor="" className="text-sm text-gray-600">First name</label>
         <input type="text"  name="firstName" required placeholder="First name" className="placeholder:text-sm w-full p-2 border rounded-md outline-none focus:ring-2
         focus:ring-green-700 mb-2"/>
         <label htmlFor="lastName" className="text-gray-600 text-sm">Last name</label>
          <input type="text"  name="lastName" id="lastName" placeholder= "Last name" required className="placeholder:text-sm w-full p-2 border rounded-md outline-none focus:ring-2
         focus:ring-green-700 mb-2"/>
          <label htmlFor="lastName" className="text-gray-600 text-sm">Email</label>
          <input type="email"  name="email" id="email" placeholder="eg. johndoe@gmail.com" required className="placeholder:text-sm w-full p-2 border rounded-md outline-none focus:ring-2
         focus:ring-green-700 mb-2"/>
          <label htmlFor="password"  className="text-gray-600 text-sm flex justify-between">Password</label>          
          <input type={showPassword ? 'text' : 'password'} name="password" id="password" required className="w-full p-2 border rounded-md outline-none focus:ring-2
         focus:ring-green-700 mb-2"/>
          <label htmlFor="confirmPassword" className="text-gray-600 text-sm">Confirm password</label>
          <input type={showPassword ? 'text' : 'password'}   name="confirmPassword" id="confirmPassword" required className="w-full p-2 border rounded-md outline-none focus:ring-2
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
         <button className="py-2.5 text-white cursor-pointer font-extrabold  w-full mt-2 bg-[#244504] rounded-md">Register</button>
         <p className="mt-2 text-gray-400 text-xs">Already have an Account <Link className="font-extrabold sm" to={'/login'}>Click to login</Link></p>
        </form>      
    </div>
  )
}

export default Register
