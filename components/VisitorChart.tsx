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
import { getPeople } from "./services/apiPeoples";
import supabase from "./services/supabase";
import { useRouter } from "next/navigation";

export function VisitorChart() {
  const [peoples, setPeoples] = React.useState<any[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/peoples");
        setPeoples(response.data);
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
    fetchData();
  }, []);

  // React.useEffect(() => {
  //   const fetchPeoples = async () => {
  //     const { data, error } = await supabase.from("peoples").select("*");
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       setPeoples(data);
  //     }
  //   };

  //   fetchPeoples();

  //   const channel = supabase
  //     .channel("realtime_peoples")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "*",
  //         schema: "public",
  //         table: "peoples",
  //       },
  //       (payload) => {
  //         console.log("NYAHHAHA", payload);
  //         fetchPeoples(); // Fetch the updated data directly
  //         router.refresh(); // Refresh the router if needed
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, [router]);

  const chartDataWithTotal = peoples.map((person) => ({
    date: new Date(person.created_at).toLocaleDateString("en-US"), // Format date to only show date without time
    in: person.totals_down,
    out: person.totals_up,
    total: person.totals[0],
  }));

  const chartConfig = {
    views: {
      label: "Visitor",
    },
    in: {
      label: "In",
      color: "hsl(var(--chart-1))",
    },
    out: {
      label: "Out",
      color: "hsl(var(--chart-2))",
    },
    total: {
      label: "Total",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("in");

  const totalPerCategory = React.useMemo(() => {
    const formatter = new Intl.NumberFormat("en-US"); // Ensure consistent formatting
    const totalIn = chartDataWithTotal.reduce((acc, curr) => acc + curr.in, 0);
    const totalOut = chartDataWithTotal.reduce(
      (acc, curr) => acc + curr.out,
      0
    );
    const totalVisitor = chartDataWithTotal.reduce(
      (acc, curr) => acc + curr.total,
      0
    );
    return {
      in: formatter.format(totalIn),
      out: formatter.format(totalOut),
      total: formatter.format(totalVisitor),
    };
  }, [chartDataWithTotal]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["in", "out", "total"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
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
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
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
  );
}
