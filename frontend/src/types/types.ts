
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

export interface ProductDetails{
  product: Products[],
  totalProducts: number,
  availableStock: number,
  lowStock: number,
  depletedStock: number,
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
  setPurchases: (user_id: String, page: Number, limit: Number) => Promise<void>,
  addPurchase: (user_id: String,purchase: FormData) => Promise<Response>
}

export type PurchaseFilter = 'All' | 'Pending' | 'Recieved' | 'Canceled'