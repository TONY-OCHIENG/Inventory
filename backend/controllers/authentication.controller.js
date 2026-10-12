
export const registerAccount = (request,response) => {
    const { firstName, lastName, email, password,confirmPassword} = request.body

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return response.status(200).json({success: false, message: "Fill all fields"})
    }

    if ( password !== confirmPassword) {
        return response.status(200).json({success: false, message: "Password mismatch"})
    }
} 