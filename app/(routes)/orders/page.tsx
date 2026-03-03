import { getReceipStripe } from "@/actions/getReceipStripe"
import { getUserPurchases } from "@/actions/getUserPurchases"
import { currentUser } from "@clerk/nextjs/server"
import { ReceiptText } from "lucide-react"
import { OrderList } from "./components"

export default async function OrdersPage() {

    const user = await currentUser()
    if(!user) {
        return <p className="text-center text-xs">Please sign in to see your orders</p>
    }
    const purchases = await getUserPurchases(user.id)

    const receipts = await getReceipStripe(user.id);
    

  return (
    <div className="my-4 mx-6 border rounded-lg shadow-md p-6 bg-gradient-to-br from-indigo-50 to-violet-50 p-6">
      <div className="flex items-center mb-6 gap-1">
        <div className=" p-2 rounded-full bg-violet-400">
          <ReceiptText className="w-5 h-5 text-white"/>
        </div>
        <h1 className="text-2xl font-semibold text-indigo-900">All my orders</h1>
      </div>
      <OrderList purchases={purchases} receipts={receipts}/>
    </div>
  )
}
