"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {

  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A linear area chart"

const data = [
  { day: "Mon", minutes: 20 },
  { day: "Tue", minutes: 45 },
  { day: "Wed", minutes: 10 },
  { day: "Thu", minutes: 30 },
  { day: "Fri", minutes: 50 },
  { day: "Sat", minutes: 40 },
  { day: "Sun", minutes: 25 },
]


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function LearningTimeChart() {
  return (

        <ChartContainer className="w-full h-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="minutes"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
  )
}
