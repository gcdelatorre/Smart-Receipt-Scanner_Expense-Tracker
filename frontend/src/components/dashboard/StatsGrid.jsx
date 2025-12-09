import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

export default function StatsGrid({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex items-start justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
              <div className="mt-3 flex items-center gap-2 text-2xl font-semibold text-slate-900">
                {stat.value}
              </div>
              <Badge variant={stat.changeVariant} className="mt-2">
                <stat.changeIcon className="mr-1 h-4 w-4" />
                {stat.changeLabel}
              </Badge>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${stat.accent}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Progress value={stat.progress} colorClass={stat.progressColor} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

