import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useState, useEffect } from "react";
import { usePreferences } from "@/hooks/usePreferences";

function SpendingTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const { formatCurrency } = usePreferences();
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 shadow-sm text-sm">
      <p className="font-semibold text-foreground">{item.payload.day}</p>
      <p className="text-muted-foreground">{formatCurrency(item.value)}</p>
    </div>
  );
}

export default function SpendingChart() {

  const { formatCurrency } = usePreferences();

  const [period, setPeriod] = useState("This Week");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const api = (await import('../../services/api')).default;
        const res = await api.get(`/expenses/analytics?period=${period}`);
        setChartData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChartData();
  }, [period]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-foreground">Spending Analytics</p>
          <p className="text-sm text-muted-foreground">{period}</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[135px] bg-card">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="This Week">This Week</SelectItem>
            <SelectItem value="This Month">This Month</SelectItem>
            <SelectItem value="This Year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${formatCurrency(v / 1000)}k`}
              width={50}
            />
            <Tooltip content={<SpendingTooltip />} cursor={{ stroke: "hsl(var(--border))" }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
              fill="url(#lineGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

