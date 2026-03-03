"use client";
import { OrderListProps } from "./OrderList.types";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/formatPrice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function OrderList(props: OrderListProps) {
  const { purchases, receipts } = props;
  const totalPurchases = purchases.reduce((acc, purchase) => {
    const rawPrice = purchase.course.price?.replace(",", ".") || "0";
    const price =
      rawPrice && !isNaN(Number(rawPrice)) ? parseFloat(rawPrice) : 0;

    return acc + price;
  }, 0);

  const formatedTotal = formatPrice(totalPurchases.toString() || "0");

  const downloadReceipt = (index: number) => {
    const receiptUrl = receipts[index].receiptUrl;
    if (receiptUrl) {
      window.open(receiptUrl, "_blank");
    } else {
      toast.error("Receipt not found", {
        style: {
          background: "hsl(0, 100%, 80%)",
          color: "hsl(0, 100%, 20%)",
          border: "1px solid hsl(0, 100%, 70%)",
          borderRadius: "0.5rem",
          padding: "1rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      });
    }
  };
  return (
    <>
      <div className="rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[800px] md:min-w-full">
            <TableHeader className="bg-gradient-to-r from-indigo-50 to-violet-50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[120px] text-slate-600 font-semibold whitespace-nowrap">
                  Date
                </TableHead>
                <TableHead className="text-slate-600 font-semibold min-w-[200px]">
                  Course
                </TableHead>
                <TableHead className="text-slate-600 font-semibold whitespace-nowrap">
                  Status
                </TableHead>
                <TableHead className="text-slate-600 font-semibold whitespace-nowrap">
                  Receipt
                </TableHead>
                <TableHead className="text-right text-slate-600 font-semibold whitespace-nowrap">
                  Price
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase, index) => (
                <TableRow
                  key={index}
                  className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors"
                >
                  <TableCell className="font-medium text-slate-700 whitespace-nowrap">
                    {purchase.createdAtFormatted}
                  </TableCell>
                  <TableCell
                    className="font-medium text-slate-800 min-w-[200px] max-w-[300px] truncate"
                    title={purchase.course.title}
                  >
                    {purchase.course.title}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <span className="w-2 h-2 mr-2 rounded-full bg-green-500"></span>
                      Paid
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1.5 border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => downloadReceipt(index)}
                    >
                      <span>View Receipt</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right font-medium text-slate-900">
                    {formatPrice(purchase.course.price || "0")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableCell
                  colSpan={4}
                  className="text-right font-semibold text-slate-700"
                >
                  Total
                </TableCell>
                <TableCell className="text-right font-bold text-indigo-700 text-lg whitespace-nowrap">
                  {formatedTotal}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        {purchases.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            No orders found
          </div>
        )}
      </div>
      <p className="text-center text-sm text-slate-500 mt-6">
        List of your recent orders
      </p>
    </>
  );
}
