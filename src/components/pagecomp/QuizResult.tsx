import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getQuizHistory } from "@/api/quiz-api";

type Props = {
  correct: number;
  total: number;
  materialId: number;
  onRestart?: () => void;
};


const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;
function QuizResult({ correct = 0, total = 0, materialId = 1, onRestart }: Props) {
  const [show, setShow] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  useEffect(() => {
  async function loadHistory() {
    try {
      const res = await getQuizHistory(materialId);

      // Convert API response into chart format
      const mapped = res
        .filter((item: any) => item.score !== null)
        .map((item: any) => ({
          date: new Date(item.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          score: item.score,
        }));

      setHistory(mapped);
    } catch (err) {
      console.error("Failed to load quiz history", err);
    }
  }

  loadHistory();
}, [materialId]);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={`p-10 opacity-0 absolute inset-0  z-40 ${
        show ? "opacity-100 " : ""
      }`}
    >
      <Card className=" w-full">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">Quiz Result</CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <div className="w-1/2 flex flex-col justify-between">
            <h3>
              <span className="font-bold text-6xl">{correct}</span> /{" "}
              <span className="text-2xl ml-1 mr-4">{total}</span>
              Correct answer
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-2 px-2">
              <Button variant={"outline"} className="h-20" onClick={onRestart}>
                Restart Quiz
              </Button>
              <Button variant={"outline"} className="h-20">
                More Quizes
              </Button>
              <Button variant={"outline"} className="h-20">
                Fix Your Mistake
              </Button>
              <Button variant={"outline"} className="h-20">
                Flash Card
              </Button>
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-2xl font-semibold">Recent Performance</div>
            <ChartContainer config={chartConfig} className="">
 <AreaChart
  data={history}
  margin={{ left: 12, right: 12 }}
>
  <CartesianGrid vertical={false} />
  <XAxis
    dataKey="date"
    tickLine={false}
    axisLine={false}
    tickMargin={8}
  />
  <ChartTooltip
    cursor={false}
    content={<ChartTooltipContent indicator="dot" hideLabel />}
  />
  <Area
    dataKey="score"
    type="linear"
    fill="var(--color-desktop)"
    fillOpacity={0.4}
    stroke="var(--color-desktop)"
    animationBegin={2000}
  />
</AreaChart>

            </ChartContainer>
          </div>
        </CardContent>
        {/* <CardFooter>
      </CardFooter> */}
      </Card>
    </div>
  );
}

export default QuizResult;
