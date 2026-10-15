
function Dashboard() {
  return (
    <div className="py-20 bg-amber-200 w-full">
        <div className=" w-full px-2 grid grid-cols-1 md:grid-cols-2"> 
            <div className="w-full">
                <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div className=" rounded-md bg-white/70 p-4 shadow-md cursor-pointer">
                       <h1>Total products</h1>
                    </div>                   
                </div>
            </div>
            <div></div>        
        </div>      
    </div>
  )
}

export default Dashboard
