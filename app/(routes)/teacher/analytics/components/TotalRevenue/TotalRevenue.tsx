"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import axios from "axios"
import { TotalRevenueProps } from "./TotalRevenue.types"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig



export function TotalRevenue() {

  const [data, setData] = useState<TotalRevenueProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await axios("/api/analytics/revenueByMonth")
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchRevenue()
  }, [])

  
  return (
    <Card className="border border-indigo-100 rounded-xl shadow-sm overflow-hidden bg-gradient-to-r from-indigo-50 to-violet-50 hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle>Total Benefits</CardTitle>
        <CardDescription>Benefits of the last 4 months</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-sm text-muted-foreground h-48 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 w-16 bg-muted rounded"></div>
              <div className="mt-2 text-xs">Loading data...</div>
            </div>
          </div>
        ) : (
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke="oklch(0.67 0.15 250)"
              strokeWidth={2}
              dot={{
                fill: "oklch(0.67 0.15 250)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
            )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
