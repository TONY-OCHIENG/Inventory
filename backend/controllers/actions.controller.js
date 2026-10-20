import databaseconnection from "../database/db.js"

export const addReminders = (request,response) => {
    const { reminder } = request.body
    const { id } = request.params

    if( !reminder ) {
        return response.status(200).json({success: false, message: "Fill all fields"})
    }

    try {
        const insertReminder = "INSERT INTO reminder(reminder,user_id) VALUES(?,?)"
        databaseconnection.query(insertReminder,[reminder,id], (error, result) => {
            if (error) return response.status(500).json({success: false, message: error})
            return response.status(200).json({success: true, message: "Reminder added"})
        })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getReminders = (request,response) => {
    const { id } = request.params
    try {
        const getReminders = "SELECT * FROM reminder WHERE user_id = ?"
        databaseconnection.query(getReminders,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result})
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const deleteReminders = (request, response) => {
    const { id } = request.params
    try {
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}