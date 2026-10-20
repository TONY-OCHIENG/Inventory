
export const addReminders = (request,response) => {
    const { reminder } = request.body
    const { id } = request.params

    if( !reminder ) {
        return response.status(200).json({success: false, message: "Fill all fields"})
    }

    try {
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}