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
        const deleteReminders = "DELETE FROM reminder WHERE rem_id = ?"
        databaseconnection.query(deleteReminders,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            return response.status(200).json({success: true, message: "Reminder removed"})
        })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const addProducts = (request,response) => {
    const { sku, productName, quantity,
         supplier,category} = request.body
    const { filename } = request.file
    const { id } = request.params

    if (!sku || !productName || !quantity || !supplier || !category || !filename) {
        return response.status(200).json({success: false, message: "Fill all fields"})
    }

    try {
        const isertProducts = "INSERT INTO products(sku,productName,productImage,quantity,supplier,category,user_id) VALUES(?,?,?,?,?,?,?)"
        databaseconnection.query(isertProducts, [sku,productName,filename,quantity,supplier,category, id ], 
            (error, result) => {
                if (error) return response.status(500).json({success: false, message: error})
                return response.status(201).json({success: true, message: "Product added"})
            }
        )        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getProducts = (request,response) => {
    const { id } = request.params
    try {
        const getproducts = "SELECT * FROM products WHERE user_id = ?"
        databaseconnection.query(getproducts,[id],(error, result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result})
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message:"Internal server error"})
    }
}