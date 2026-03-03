"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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
import { SubscriptorsChartProps } from "./SubscriptorsChart.types"
import axios from "axios"

export const description = "A bar chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig


export function SubscriptorsChart() {

  const [data, setData] = useState<SubscriptorsChartProps[]>([])
  const [isLoading, setIsLoading]= useState(true)

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios("/api/analytics/totalSuscriptors")
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSubscribers()
  }, [])

  console.log(data);
  
  return (
    <Card className="border border-indigo-100 rounded-xl shadow-sm overflow-hidden bg-gradient-to-r from-indigo-50 to-violet-50 hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2 pt-5 px-5">
        <CardTitle className="text-lg font-semibold flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-primary/80"></span>
          Last Subscribers
        </CardTitle>
        <CardDescription className="text-xs mt-1">
          The last subscribers in the last 4 months
        </CardDescription>
      </CardHeader>
      {isLoading ? (
        <div className="text-sm text-muted-foreground h-48 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 w-16 bg-muted rounded"></div>
            <div className="mt-2 text-xs">Loading data...</div>
          </div>
        </div>
      ): (
        <CardContent className="px-4 pt-2 pb-4">
          <ChartContainer config={chartConfig}>
            <BarChart 
              accessibilityLayer 
              data={data} 
              margin={{ top: 15, right: 15, left: 0, bottom: 5 }}
              barGap={4}
              barSize={24}
              className="[&_.recharts-cartesian-grid-horizontal_line]:opacity-30 [&_.recharts-cartesian-grid-horizontal_line:nth-child(1)]:opacity-0 [&_.recharts-cartesian-grid-horizontal_line:last-child]:opacity-0"
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                horizontal={true} 
                vertical={false} 
                stroke="hsl(var(--border)/30)" 
                strokeDasharray="3 3" 
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => value.slice(0, 3).toUpperCase()}
                dy={5}
              />
              <ChartTooltip
                cursor={{ fill: 'hsl(var(--muted)/60)', radius: 4 }}
                content={<ChartTooltipContent style={{backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))'}} />}
                wrapperStyle={{ outline: 'none' }}
              />
              <Bar 
                dataKey="users" 
                fill="url(#barGradient)" 
                radius={[6, 6, 0, 0]} 
                animationDuration={1000}
                animationEasing="ease-in-out"
                isAnimationActive={true}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
      <CardFooter className="flex-col items-start gap-1.5 px-5 py-3 border-t border-border/30 bg-muted/30">
        <div className="flex gap-1.5 items-center text-sm font-medium">
          <span>Building community.</span>
          <span className="text-primary-500 flex items-center gap-1">
            +7.4% <TrendingUp className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          Showing subscription data for the last 4 months
        </div>
      </CardFooter>
    </Card>
  )
}

