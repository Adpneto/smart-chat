import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, subMonths } from "date-fns"
import { DateRange } from "react-day-picker"
import { ptBR, enUS } from 'date-fns/locale'; // Importar os locales

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { chartData } from "@/components/constants/lists"
import { useTranslation } from 'react-i18next'

const chartConfig = {
    desktop: {
        label: "Aguardando",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function UserCharts({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const { t, i18n } = useTranslation()

    const today = new Date()
    const threeMonthsAgo = subMonths(today, 3)
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: threeMonthsAgo,
        to: today,
    })

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        if (dateRange?.from && dateRange?.to) {
            return date >= dateRange.from && date <= dateRange.to
        }
        return true
    })

    const locale = i18n.language === 'pt' ? ptBR : enUS

    return (
        <div className={cn("grid gap-2", className)}>
            <Card>
                <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                    <div className="grid flex-1 gap-1 text-center sm:text-left">
                        <CardTitle>{t('pages.dashboard.charts.two.title')}</CardTitle>
                        <CardDescription>
                            {t('pages.dashboard.charts.two.description')}
                        </CardDescription>
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-[300px] justify-start text-left font-normal",
                                    !dateRange && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange?.from ? (
                                    dateRange.to ? (
                                        <>
                                            {format(dateRange.from, "LLL dd, y", { locale })} -{" "}
                                            {format(dateRange.to, "LLL dd, y", { locale })}
                                        </>
                                    ) : (
                                        format(dateRange.from, "LLL dd, y", { locale })
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                                locale={locale}
                            />
                        </PopoverContent>
                    </Popover>
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                        <BarChart accessibilityLayer data={filteredData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <Bar
                                dataKey="desktop"
                                stackId="a"
                                fill="var(--color-desktop)"
                                radius={[0, 0, 4, 4]}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}