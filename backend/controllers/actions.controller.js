import { request, response } from "express"
import databaseconnection from "../database/db.js"
import { comparepassword, hashPassword } from "../configs/hashPassword.js"

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
                        results: result
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

export const cancelPurchase = (request, response) => {
    const { id } = request.params
    try {
        const cancelPurchase = "UPDATE purchases SET status = 'Canceled' WHERE purchase_id = ?"
        databaseconnection.query(cancelPurchase,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            return response.status(200).json({success: true, message: "Purchase canceled"})
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const recievePurchase = (request,response) => {
    const { id } = request.params
    try {
        const recievePurchase = "UPDATE purchases SET status = 'Recieved' WHERE purchase_id = ?"
        databaseconnection.query(recievePurchase,[id],(err, result) => {
            if (err) return response.status(500).json({success: false, message: err})
            return response.status(200).json({success: true, message: "Purchase recieved"})
        })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const deletePurchase = (request,response) => {
    const { id } = request.params
    try {
        const deletePurchase = "DELETE  FROM purchases WHERE purchase_id = ?"
        databaseconnection.query(deletePurchase,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            return response.status(200).json({success: true, message: "Purchase deleted"})
        })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const pendingPurchase = (request, response) => {
    const { id } = request.params
    try {
        const pendingPurchase = "SELECT COUNT(*) as pendingPurchase FROM purchases WHERE user_id = ? AND status = 'Pending'"
        databaseconnection.query(pendingPurchase,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].pendingPurchase})
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}


export const recievedPurchase = (request, response) => {
    const { id } = request.params
    try {
        const recievedPurchase = "SELECT COUNT(*) as recievedPurchase FROM purchases WHERE user_id = ? AND status = 'Recieved'"
        databaseconnection.query(recievedPurchase,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].recievedPurchase})
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const canceledPurchase = (request, response) => {
    const { id } = request.params
    try {
        const recievedPurchase = "SELECT COUNT(*) as canceledPurchase FROM purchases WHERE user_id = ? AND status = 'Canceled'"
        databaseconnection.query(recievedPurchase,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].canceledPurchase})
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const addSuppliers = (request, response) => {
    const { id } = request.params
    const { supplierNumber,supplierName,date} = request.body
    if (!supplierName || !supplierNumber || !date) {
        return response.status(200).json({success: false, message: "Fill all fields"})
    }

    try {
        const addSupplier = "INSERT INTO suppliers(supplierNumber,supplierName,date,user_id) VALUES(?,?,?,?)"
        databaseconnection.query(addSupplier,[supplierNumber,supplierName,date,id], (err, result) => {
            if (err) return response.status(500).json({success: false, message: err})
            return response.status(201).json({success: true, message: "Supplier added"})
        })
    } catch (error) {
        console.error(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getSuppliers = (request,response) => {
    const { id } = request.params
    try {
        const getSuppliers = "SELECT * FROM suppliers WHERE user_id = ?"
        databaseconnection.query(getSuppliers,[id], (error, result) => {
            if (error) return response.status(500).json({success: false, message: result})
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

export const activateSupplier = (request, response) => {
    const { id } = request.params
    try {
        const activateSupplier = "UPDATE suppliers SET status = 'Active' WHERE supplier_id = ?"
        databaseconnection.query(activateSupplier,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            return response.status(200).json({success: true, message: "Supplier Activated"})
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const deactivateSupplier = (request, response) => {
    const { id } = request.params
    try {
        const deactivateSupplier = "UPDATE suppliers SET status = 'On hold' WHERE supplier_id = ?"
        databaseconnection.query(deactivateSupplier,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            return response.status(200).json({success: true, message: "Supplier On hold"})
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const deleteSupplier = (request,response) => {
    const { id } = request.params
    try {
      const deleteSupplier = "DELETE FROM suppliers WHERE supplier_id = ?"
      databaseconnection.query(deleteSupplier, [id], (error,result) => {
        if (error) return response.status(500).json({success: false, message: error})
        return response.status(200).json({success: true, message: "Supplier removed"})
      })  
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const updateBalance = (request, response) => {
    const { id } = request.params
    const { balance } = request.body
    if (!balance) {
        return response.status(200).json({success: false, message: "Fill required field"})
    }

    try {
        const updateBalance = "UPDATE suppliers SET balance = ? WHERE supplier_id = ?"
        databaseconnection.query(updateBalance,[balance,id], (error, result) => {
            if (error) return response.status(500).json({success: false, message: error})
            return response.status(200).json({success: true, message: "Balance updated"})
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getAllsuppliers = (request,response) => {
    const { id } = request.params
    try {
        const getAllsuppliers = "SELECT COUNT(supplier_id) as totalSuppliers FROM suppliers WHERE user_id = ?"
        databaseconnection.query(getAllsuppliers,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].totalSuppliers})
            } else {
                return response.status(200).json({success: false, result: result})
            }                
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getActivesuppliers = (request,response) => {
    const { id } = request.params
    try {
        const getActivesuppliers = "SELECT COUNT(*) as activeSuppliers FROM suppliers WHERE status = 'Active' AND user_id = ?"
        databaseconnection.query(getActivesuppliers,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].activeSuppliers})
            } else {
                return response.status(200).json({success: false, result: result})
            }                
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getinActivesuppliers = (request,response) => {
    const { id } = request.params
    try {
        const getinActivesuppliers = "SELECT COUNT(*) as inactiveSuppliers FROM suppliers WHERE status = 'On hold' AND user_id = ?"
        databaseconnection.query(getinActivesuppliers,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].inactiveSuppliers})
            } else {
                return response.status(200).json({success: false, result: result})
            }                
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const getTotalBalance = (request,response) => {
    const { id } = request.params
    try {
        const totalBalance = "SELECT SUM(balance) as totalBalance FROM suppliers WHERE user_id = ?"
        databaseconnection.query(totalBalance,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].totalBalance})
            } else {
                return response.status(200).json({success: false, result: result})
            }                
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const addReturns = (request, response) => {
    const { id } = request.params
    const { returnNumber, supplierName, productName, quantity, amount} = request.body
    if (!returnNumber || !supplierName || !productName || !quantity || !amount) {
        return response.status(200).json({success: false, message: "Fill all fields"})
    }
    try {
        const addReturns = "INSERT INTO returns(returnNumber,supplierName,productName,quantity,amount,user_id) VALUES(?,?,?,?,?,?)"
        databaseconnection.query(addReturns,[returnNumber,supplierName,productName,quantity,amount,id], 
            (error,result) => {
                if (error) return response.status(500).json({success: false, message: error})
                return response.status(201).json({success: true, message: "Return added"})
            } 
        )
    } catch (error) {
        console.log(error)
    }
}

export const getReturns = (request, response) => {
    const { id } = request.params
    try {
        const getReturn = "SELECT * FROM returns WHERE user_id = ?"
        databaseconnection.query(getReturn,[id],(error,result) => {
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

export const cancelReturn = (request, response) => {
    const { id } = request.params
    try {
        const canceleReturn = "UPDATE returns SET status = 'Canceled' WHERE return_id = ?"
        databaseconnection.query(canceleReturn,[id], (error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            return response.status(200).json({success: true, message: "Return canceled"})
        })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const completeReturn = (request, response) => {
    const { id } = request.params
    try {
        const completeReturn = "UPDATE returns SET status = 'Completed' WHERE return_id = ?"
        databaseconnection.query(completeReturn,[id], (error,result) => {
            if (error) return response.status(500).json({success: false, message: error})
            return response.status(200).json({success: true, message: "Return completed"})
        })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const deleteReturn = (request,response) => {
    const { id } = request.params
    try {
        const deleteReturn = "DELETE FROM returns WHERE return_id = ?"
        databaseconnection.query(deleteReturn,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: "internal server error"})
            return response.status(200).json({success: true, message: "Return deleted"})
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "internal server error"})
    }
}

export const totalReturns = (request,response) => {
    const { id } = request.params
    try {
        const totalReturns = "SELECT COUNT(*) as totalReturns FROM returns WHERE user_id = ?"
        databaseconnection.query(totalReturns,[id],(err, result) => {
            if (err) return response.status(500).json({success: false, message: err})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].totalReturns})
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const completedReturns = (request,response) => {
    const { id } = request.params
    try {
        const completeReturns = "SELECT COUNT(status) as completedReturns FROM returns WHERE user_id = ? AND status = 'Completed'"
        databaseconnection.query(completeReturns,[id],(err, result) => {
            if (err) return response.status(500).json({success: false, message: err})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].completedReturns})
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const pendingReturns = (request,response) => {
    const { id } = request.params
    try {
        const pendingReturns = "SELECT COUNT(status) as pendingReturns FROM returns WHERE user_id = ? AND status = 'Pending'"
        databaseconnection.query(pendingReturns,[id],(err, result) => {
            if (err) return response.status(500).json({success: false, message: err})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].pendingReturns})
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const canceledReturns = (request,response) => {
    const { id } = request.params
    try {
        const canceledReturns = "SELECT COUNT(status) as canceledReturns FROM returns WHERE user_id = ? AND status = 'Canceled'"
        databaseconnection.query(canceledReturns,[id],(err, result) => {
            if (err) return response.status(500).json({success: false, message: err})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result[0].canceledReturns})
            } else {
                return response.status(200).json({success: false, result: result})
            }
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const singleProduct = (request, response) => {
    const { id } = request.params
    try {
        const singleProduct = "SELECT * FROM products WHERE product_id = ?"
        databaseconnection.query(singleProduct,[id],(error, result) => {
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

export const deductQuantity = (request,response) => {
    const { id } = request.params
    const { quantity } = request.body
    if (!quantity) {
        return response.status(200).json({success: false, message: "Fill required field"})
    }


    if ( quantity <= 0) {
        return response
            .status(200)
            .json({ success: false, message: "Deduction must be a positive whole number" });
    }

    try {
        const deductProduct = "UPDATE products SET quantity = quantity - ? WHERE product_id = ?"
        databaseconnection.query(deductProduct,[quantity,id], (error, result) => {
            if (error) return response.status(500).json({success: false, message: "An error occured"})
            if (result.affectedRows === 0) {
                    return response
                    .status(200)
                    .json({ success: false, message: "Product not found or insufficient stock" });
                }
            return response.status(200).json({success: true, message: "Quantity deducted"})
        })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const addQuantity = (request,response) => {
    const { id } = request.params
    const { quantity } = request.body

    if(!quantity) {
        return response.status(200).json({success: false, message: "Fill required field"})
    }

    if (isNaN(quantity)) {
        return response.status(200).json({success: false, message: "Enter correct number"})
    }

    if (quantity < 0) {
        return response.status(200).json({success: false, message:"Quantity must be greater than zero"})
    }

    const addQuantity = 
    "UPDATE products SET quantity = quantity + ? WHERE product_id = ?"
    databaseconnection.query(addQuantity, [quantity,id], (error, result) => {
        if (error) return response.status(500).json({success: false, message: "An error occured"})
        if (result.affectedRows === 0) {
                    return response
                    .status(400)
                    .json({ success: false, message: "Product not found or insufficient stock" });
            }
            
        return response.status(200).json({success: true, message: "Quantity added"})
    })
}

export const updatetoLowstock = (request,response) => {
    const { id } = request.params
    const updatetoLowstock = "UPDATE products SET stock = 'Low stock' WHERE quantity = ?"
    databaseconnection.query(updatetoLowstock,[id],(error, result) => {
        if (error) return response.status(500).json({success: false, message: "An error occured"})
        return response.status(200).json({success: true, message: "Low stock alert"})
    })
}

export const updatetoInstock = (request,response) => {
    const { id } = request.params
    const updatetoLowstock = "UPDATE products SET stock = 'Available' WHERE quantity = ?"
    databaseconnection.query(updatetoLowstock,[id],(error, result) => {
        if (error) return response.status(500).json({success: false, message: "An error occured"})
        return response.status(200).json({success: true, message: "Low stock alert"})
    })
}

export const updatetoDepleted = (request,response) => {
    const { id } = request.params
    const updatetoLowstock = "UPDATE products SET stock = 'Depleted' WHERE quantity = ?"
    databaseconnection.query(updatetoLowstock,[id],(error, result) => {
        if (error) return response.status(500).json({success: false, message: "An error occured"})
        return response.status(200).json({success: true, message: "Low stock alert"})
    })
}

export const userProfile = (request,response) => {
    const { id } = request.params
    try {
        const userProfile = "SELECT firstName,lastName,email FROM users WHERE user_id = ?"
        databaseconnection.query(userProfile,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: "Internal server error"})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result})
            } else {
                return response.json({success: false, result: result})
            }
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const updateProfile = (request,response) => {
    const {id } = request.params
    const { firstName,lastName,email} = request.body

    try {
        const updateProfile = "UPDATE users SET firstName = ?,lastName = ?, email = ? WHERE user_id = ?"
        databaseconnection.query(updateProfile,[firstName,lastName,email,id], (error,result) => {
            if (error) return response.status(500).json({success: false, message: "Internal server error"})
            return response.status(200).json({success: true, message: "Profile updated"})
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const changePassword = (request, response) => {
    const { id } = request.params
    const { currentPassword, newPassword, confirmPassword} = request.body
    if (!currentPassword || !newPassword || !confirmPassword) {
        return response.json({success: false, message: "Fill all fields"})
    }

    if (newPassword !== confirmPassword) {
        return response.json({success: false, message: "Password mismatch"})
    }
    
    try {
        const checkPassword = "SELECT password FROM users WHERE user_id = ?"
        databaseconnection.query(checkPassword,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: "Internal server error"})
            const password = result[0].password
            const comparePassword = comparepassword(currentPassword,password)
            if (!comparePassword) {
                return response.json({success: false, message: "Invalid password"})
            } else {
                const hashpassword = hashPassword(newPassword)
                const updatePassword = "UPDATE users SET password = ? WHERE user_id = ?"
                databaseconnection.query(updatePassword,[hashpassword,id],(err,results) => {
                    if (err) return response.status(500).json({success: false, message: "Internal server error"})
                    return response.status(200).json({success: true, message: "Password updated"})
                })
            }
        })
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message:"Internal server error"})
    }

}

export const addNotification = (request,response) => {
    const { id } = request.params
    const { notifiaction } = request.body
    try {
        const addNotification = "INSERT INTO notifications(notification,user_id) VALUES(?,?)"
        databaseconnection.query(addNotification,[notifiaction,id], (error,result) => {
            if (error) return response.status(500).json({success: false, message: "Internal server error"})
            return response.status(200)
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const allproducts = (request,response) => {
    const { id } = request.params
    try {
        const allProducts = "SELECT * FROM products WHERE user_id = ?"
        databaseconnection.query(allProducts,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: "Internal server error"})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result})
            } else {
                return response.json({success: false, result: result})
            }
        })        
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const stockAlert = (request,response) => {
    const { id } = request.params
    try {
        const stockAlert = "SELECT * FROM products WHERE stock = 'Depleted' OR stock = 'Low stock' AND user_id = ?"    
        databaseconnection.query(stockAlert,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: "Internal server error"})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result})
            } else {
                return response.json({success: false, result: result})
            }
        })    
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const recentPurchase = (request, response) => {
    const { id } = request.params
    try {
        const recentPurchase = "SELECT * FROM purchases WHERE status = 'Pending' AND user_id = ?"
        databaseconnection.query(recentPurchase,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: "Internal server error"})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result})
            } else {
                return response.json({success: false, result: result})
            }
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}