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
         supplier,category, price} = request.body
    const { filename } = request.file
    const { id } = request.params

    if (!sku || !productName || !quantity || !supplier || !category || !filename || !price) {
        return response.status(200).json({success: false, message: "Fill all fields"})
    }

    try {
        const isertProducts = "INSERT INTO products(sku,productName,productImage,quantity,supplier,category,user_id,price) VALUES(?,?,?,?,?,?,?,?)"
        databaseconnection.query(isertProducts, [sku,productName,filename,quantity,supplier,category, id,price], 
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
    const {page, limit} = request.query
    try {
        const offset = (page - 1) * limit
        const getproducts = " SELECT * FROM products WHERE user_id = ? LIMIT ? OFFSET ?"
        databaseconnection.query(getproducts,[id,+limit,+offset],(error, result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                const countProducts = "SELECT COUNT(*) AS totalProducts FROM products WHERE user_id = ?"
                databaseconnection.query(countProducts,[id],(err,results) => {
                    if (err) return response.status(500).json({success: false, message: err})
                    const totalProducts = results[0].totalProducts
                    return response.status(200).json({success: true, results: {
                        totalProducts: totalProducts,
                        result: result
                    }})
                })
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message:"Internal server error"})
    }
}

export const deleteProduct = (request,response) => {
    const { id } = request.params
    try {
        const deleteProduct = "DELETE FROM products WHERE product_id = ?"
        databaseconnection.query(deleteProduct,[id], (error, result) => {
            if (error) return response.status(500).json({success: false, message: error})
            return response.status(200).json({success: true, message: "Product removed"})
        })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const availableStock = (request, response) => {
    const { id } = request.params
    try {
        const availableStock = "SELECT COUNT(stock) as Available FROM products WHERE stock = 'Available' AND user_id = ?"
        databaseconnection.query(availableStock,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].Available})
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const lowStock = (request, response) => {
    const { id } = request.params
    try {
        const availableStock = "SELECT COUNT(stock) as lowStock FROM products WHERE stock = 'Low stock' AND user_id = ?"
        databaseconnection.query(availableStock,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].lowStock})
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const depletedStock = (request, response) => {
    const { id } = request.params
    try {
        const availableStock = "SELECT COUNT(stock) as Depleted FROM products WHERE stock = 'Depleted' AND user_id = ?"
        databaseconnection.query(availableStock,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].Depleted})
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

//controllers that handle purchase

export const addPurchase = (request, response) => {
    const { id } = request.params
    const { filename } = request.file
    const {productName, productNumber,quantity, date, supplier,amount} = request.body

    if (!productName || !productNumber || !quantity || !date || !supplier
        || !amount || !filename
    ) {
        return response.status(200).json({success: false, message: "Fill all fields"})
    }

    try {
        const addPurchases = "INSERT INTO purchases(productNumber,productName,productImage,quantity,date,supplier,amount,user_id) VALUES(?,?,?,?,?,?,?,?)"
        databaseconnection.query(addPurchases,[productNumber,productName,filename,quantity,date,supplier,
            amount, id
        ], (error, result) => {
            if (error) return response.status(500).json({success: false, message: error})
            return response.status(201).json({success: true, message: "Purchase added successfully"})
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getPurchase = (request,response) => {
    const { id } = request.params
    const { page, limit } = request.query
    try {
        const offset = (page - 1) * limit
        const getPurchase = "SELECT * FROM purchases WHERE user_id = ? LIMIT ? OFFSET ?"
        databaseconnection.query(getPurchase,[id,+limit, +offset],(error, result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                const totalPurchases = "SELECT COUNT(*) as totalPurchase FROM purchases WHERE user_id = ?"
                databaseconnection.query(totalPurchases,[id], (err, results) => {
                    if (err) return response.status(500).json({success: false, message: err})
                    const totalPurchase = results[0].totalPurchase
                    return response.status(200).json({success: true, result: {
                        totalPurchase: totalPurchase,
                        result: result
                    }})
                })
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}