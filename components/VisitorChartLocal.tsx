"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type ViewOption =
  | "none"
  | "10min"
  | "30min"
  | "hourly"
  | "daily"
  | "monthly"
  | "yearly";

type Person = {
  id: number;
  Up: number;
  Down: number;
  createdAt: string;
  totalsDown: number;
  totalsUp: number;
  totals: number[];
};

type AggregatedData = {
  date: string;
  in: number;
  out: number;
  total: number;
  down: number; // Add these properties for labels
  up: number;
};

export function VisitorChartLocal() {
  const [peoples, setPeoples] = React.useState<Person[]>([]);
  const [view, setView] = React.useState<ViewOption>("none");
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("in");

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/peoples");
        //console.log(response.data);
        setPeoples((prevPeoples) => {
          if (JSON.stringify(prevPeoples) !== JSON.stringify(response.data)) {
            return response.data;
          }
          return prevPeoples;
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching data:",
            error.response?.data || error.message
          );
        } else if (error instanceof Error) {
          console.error("Error fetching data:", error.message);
        } else {
          console.error("An unknown error occurred");
        }
      }
    };

    fetchData().then(() => {
      intervalId = setInterval(fetchData, 1000);
    });

    return () => clearInterval(intervalId);
  }, []);

  const aggregateData = (
    data: Person[],
    view: ViewOption
  ): AggregatedData[] => {
    if (view !== "none") {
      data = data.filter((person) => person.Up !== 0 || person.Down !== 0);
    }

    const maxIdResult = data
      .filter((person) => person.Up === 0 && person.Down === 0)
      .reduce((max, person) => (person.id > max ? person.id : max), 0);

    data = data.filter((person) => person.id > maxIdResult);

    if (view === "none") {
      return data.map((person) => ({
        date: new Date(person.createdAt).toLocaleString("en-US", {
          timeZone: "UTC",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        in: person.totalsDown ?? 0,
        out: person.totalsUp ?? 0,
        total: person.totals[0] ?? 0,
        down: person.Down ?? 0,
        up: person.Up ?? 0,
      }));
    }

    const groupedData: { [key: string]: AggregatedData } = {};
    data.forEach((person) => {
      const date = new Date(person.createdAt);
      const key =
        view === "10min"
          ? `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()} ${date.getHours()}:${
              Math.floor(date.getMinutes() / 10) * 10
            }:00`
          : view === "30min"
          ? `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()} ${date.getHours()}:${
              Math.floor(date.getMinutes() / 30) * 30
            }:00`
          : view === "hourly"
          ? `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()} ${date.getHours()}:00`
          : view === "monthly"
          ? `${date.getFullYear()}-${date.getMonth() + 1}`
          : view === "yearly"
          ? `${date.getFullYear()}`
          : date.toLocaleDateString("en-US");

      if (!groupedData[key]) {
        groupedData[key] = {
          date: key,
          in: 0,
          out: 0,
          total: 0,
          down: 0,
          up: 0,
        };
      }

      // Handle totals for "none" view type
      groupedData[key].in += person.Down ?? 0;
      groupedData[key].out += person.Up ?? 0;
      groupedData[key].total += person.totals[0] ?? 0;
      groupedData[key].down += person.Down ?? 0;
      groupedData[key].up += person.Up ?? 0;
    });

    return Object.values(groupedData);
  };

  const chartDataWithTotal = React.useMemo(
    () => aggregateData(peoples, view),
    [peoples, view]
  );
  console.log(chartDataWithTotal);

  const chartConfig = {
    views: {
      label: "Visitor",
    },
    in: {
      label: view === "none" ? "Up" : "In", // Adjust based on view
      //@ts-ignore
      dataKey: "in",
      color: "hsl(var(--chart-1))",
    },
    out: {
      label: view === "none" ? "Down" : "Out", // Adjust based on view
      //@ts-ignore
      dataKey: "out",
      color: "hsl(var(--chart-2))",
    },
    total: {
      label: "Remaining",
      //@ts-ignore
      dataKey: "total",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;
  const totalPerCategory = React.useMemo(() => {
    const formatter = new Intl.NumberFormat("en-US");
    const totalIn = chartDataWithTotal.reduce(
      (acc, curr) => acc + (view === "none" ? curr.down : curr.in),
      0
    );
    const totalOut = chartDataWithTotal.reduce(
      (acc, curr) => acc + (view === "none" ? curr.up : curr.out),
      0
    );
    const totalEnter = chartDataWithTotal.reduce(
      (acc, curr) => acc + curr.in,
      0
    );
    const totalExit = chartDataWithTotal.reduce(
      (acc, curr) => acc + curr.out,
      0
    );
    const totalVisitor = chartDataWithTotal.reduce(
      (acc, curr) => curr.total,
      0
    );
    return {
      in: formatter.format(totalIn),
      out: formatter.format(totalOut),
      enter: formatter.format(totalEnter),
      exit: formatter.format(totalExit),
      total: formatter.format(totalVisitor),
    };
  }, [chartDataWithTotal, view]);

  return (
    <>
      <div className="flex items-center justify-center xl:justify-end ">
        <Select onValueChange={(value) => setView(value as ViewOption)}>
          <SelectTrigger className="w-[90vw] xl:w-[10vw]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>View Options</SelectLabel>
              <SelectItem value="none">Session</SelectItem>
              <SelectItem value="10min">Every 10 Minutes</SelectItem>
              <SelectItem value="30min">Every 30 Minutes</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Bar Chart</CardTitle>
            <CardDescription>
              {/* Showing total visitors for the last 3 months */}
            </CardDescription>
          </div>
          <div className="flex">
            {["in", "out", "total"].map((key) => {
              const chart = key as keyof typeof chartConfig;
              //Hide remaining for every type except Session
              if (chart === "total" && view !== "none") {
                return null;
              }
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/100 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none xl:text-3xl">
                    {totalPerCategory[
                      key as keyof typeof totalPerCategory
                    ].toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[40vh] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartDataWithTotal}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return view === "none"
                    ? value
                    : view === "10min" || view === "30min" || view === "hourly"
                    ? `${date.getHours()}:${date
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`
                    : view === "daily"
                    ? date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : view === "monthly"
                    ? `${date.getFullYear()}-${date.getMonth() + 1}`
                    : view === "yearly"
                    ? date.getFullYear().toString()
                    : date.toLocaleString();
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return view === "none"
                        ? value
                        : new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });
                    }}
                  />
                }
              />
              <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
