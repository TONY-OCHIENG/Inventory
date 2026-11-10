
export interface FormInput {
    firstName: String,
    lastName : String,
    email: String,
    password: String,
    confirmPassword: String
}

export interface Response {
  success: boolean;
  message: string;
}

export interface LoginINFO{
  email: String,
  password: String
}

export interface ResponseAuth{
  success: boolean,
  user_id: String
}

export interface UserDetails{
  firstName: String,
  lastName: String,
  email: String
}
export interface FormDetail {
  loading: Boolean,
  details: UserDetails[],
  setDetails: (userID: String) => void,
  setLoading: () => void,
  logout: () => Promise<Response>,
  setCode: (code: String) => Promise<Response>,
  authenticateUser: () => Promise<ResponseAuth>,
  loginAccount: (details: LoginINFO) => Promise<Response>,
  registerAccount: (details: FormInput) => Promise<Response>;
}

//Add reminder types
export interface Reminders{
  reminder: String,
}

export interface ReminderDetails{
  reminder: String,
  rem_id: String,
  time: Date
}

export interface Reminder{
  reminder: ReminderDetails[],
  setReminders: (userID: String) => Promise<void>
  addReminder: (user_id: String, reminder: Reminders) => Promise<Response>,
  deleteReminder: (rem_id: String) => Promise<Response>
}

export interface Products{
  product_id:string,
  sku:string,
  productName: string,
  productImage: File | null,
  quantity: string,
  price: string,
  stock: string,
  supplier: string,
  category: string
}

export type StockFilter = 'All' | 'Available' | 'Low stock' | 'Depleted'
export interface Deduction{
  quantity: string, 
}
export interface ProductDetails{
  product: Products[],
  products: Products[],
  stockAlert: Products[],
  productSingle: Products[]
  totalProducts: number,
  availableStock: number,
  lowStock: number,
  depletedStock: number,
  setStockAlert: (user_id: String) => void,
  allProducts: (user_id: String) => void,
  updateDepleted: (quantity: String) => void,
  updateInstock: (quantity: String) => void,
  updateLowStock: (quantity: String) => void,
  addQuantity: (product_id: String, quantity: Deduction) => Promise<Response>,
  deductQuantity: (product_id: String, quantity: Deduction) => Promise<Response>,
  setsignleProduct: (product_id: String) => Promise<void>,
  setavailableProducts: (user_id: String) => Promise<void>,
  setlowProducts: (user_id: String) => Promise<void>,
  setdepletedStock: (user_id: String) => Promise<void>,
  setProducts: (user_id: String,page: Number, limit: Number) => Promise<void>,
  deleteProduct: (product_id: String) => Promise<Response> ,
  createProducts: (product: FormData, user_id: String) => Promise<Response>
}

/**
 * Purchase types
 */

export interface Purchase{
  purchase_id: string,
  productNumber: string,
  productName: string,
  productImage: File | null,
  quantity: string,
  date: string,
  supplier: string,
  status: string,
  amount: string
}

export interface PurchaseDetail{
  purchase: Purchase[],
  totalPurchase: number,
  pendingPurchase: number,
  recievedPurchase: number,
  canceledPurchase: number,
  setCanceledPurchase: (user_id: String) => Promise<void>,
  setRecievedPurchase: (user_id: String) => Promise<void>,
  setPendingPurchase: (user_id: String) => Promise<void>,
  setPurchases: (user_id: String, page: Number, limit: Number) => Promise<void>,
  addPurchase: (user_id: String,purchase: FormData) => Promise<Response>,
  cancelPurchase: (purchase_id: String) => Promise<Response>,
  recievePurchase: (purchase_id: String) => Promise<Response>
  deletePurchase: (purchase_id: String) => Promise<Response>
}

export type PurchaseFilter = 'All' | 'Pending' | 'Recieved' | 'Canceled'
export type SupplierFilter = 'All' | 'Active' | 'On hold'
export type ReturnFilter = 'All' | 'Pending' | 'Completed' | 'Canceled'
export type StFilter = 'All' | 'Available' | 'Low stock' | 'Depleted'
export interface SupplierDetails{
  supplierName: string,
  supplierNumber: string,
  date: string
}

export interface SupplierInfo{
  supplier_id: string,
  supplierName: string,
  supplierNumber: string,
  balance: string,
  status: string,
  date: string
}

export interface BalanceDetails{
  balance: string
}

export interface Suppliers{
  supplier: SupplierInfo[],
  suppliers: number,
  activeSuppliers: number,
  inActiveSupplier: number,
  total: number,
  totalBalance: (user_id: String) => Promise<void>,
  getinActiveSupplier: (user_id: String) => Promise<void>,
  getActiveSuppliers: (user_id: String) => Promise<void>,
  getAllSuppliers: (user_id: String) => Promise<void>,
  updateBalance: (supplier_id: String, balance: BalanceDetails) => Promise<Response>,
  deleteSupplier: (supplier_id: String) => Promise<Response>,
  activateSupplier: (supplier_id: String) => Promise<Response>,
  deactivateSupplier: (supplier_id: String) => Promise<Response>,  
  setSupplier: (user_id: String) => Promise<void>,
  addSupplier: (user_id: String, supplier: SupplierDetails) => Promise<Response>
}

export interface Return{
  returnNumber: string,
  supplierName: string,
  productName: string,
  quantity: string,
  amount: string
}

export interface ReturnDetail{
  return_id: string,
  returnNumber: string,
  supplierName: string,
  productName: string,
  quantity: string,
  status: string,
  amount: string,
}
export interface ReturnDetails{
  returns: ReturnDetail[],
  totalReturn: number,
  pendingReturn: number,
  completedReturn: number,
  canceledReturn: number,
  setcanceledReturn: (user_id: String) => Promise<void>,
  setcompletedReturn: (user_id: String) => Promise<void>,
  setpendingReturn: (user_id: String) => Promise<void>,
  settotalReturn: (user_id: String) => Promise<void>,
  canceleReturn: (user_id: String) => Promise<Response>,
  completeReturn: (return_id: String) => Promise<Response>,
  deleteReturn: (return_id: String) => Promise<Response>,
  setReturn: (user_id: String) => Promise<void>,
  addReturns: (user_id: String, detail: Return) => Promise<Response>
}


export interface Profile{
  firstName: string,
  lastName: string,
  email: string
}

export interface Password{
  currentPassword: String,
  newPassword: String,
  confirmPassword: String
}

export interface ProfileDetail{
  profile: Profile[],
  password:Password[],
  setPassword: (user_id: String, password: Password) => Promise<Response>,
  updateProfile: (user_id: String, profile: Profile) => Promise<Response>,
  setProfile: (user_id: String) => Promise<void>
}
