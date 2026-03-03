import { getLastPurchases } from "@/actions/getLastPurchases"
import { DataTable } from "./data-table";
import { columns, PurchaseWithCourse } from "./columns";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export async function Payments() {
    const lastPurchases = await getLastPurchases();
    
    return (
        <Card className="w-full mt-6 border border-indigo-100 rounded-xl shadow-sm overflow-hidden bg-gradient-to-r from-indigo-50 to-violet-50 hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-2 pt-5 px-5">
                <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-[oklch(var(--chart-1))]"></span>
                    Recent Transactions
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                    Last purchase activities
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden">
                <div className="px-1.5 pb-1.5">
                    <DataTable columns={columns} data={lastPurchases as PurchaseWithCourse[]} />
                </div>
            </CardContent>
        </Card>
    )
}
