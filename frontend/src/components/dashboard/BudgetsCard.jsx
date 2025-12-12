import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Info } from "lucide-react";
import { fetchUserBudget } from '../utils/fetchUser'
import { useEffect, useState } from "react";

export default function BudgetsCard({ refreshTrigger }) {

  const [overallBudget, setOverallBudget] = useState(0)
  const [categoryBudgets, setCategoryBudgets] = useState([])

  useEffect(() => {

    const fetchBudgets = async () => {
      const { overallBudget, categoryBudgets } = await fetchUserBudget()
      setOverallBudget(overallBudget)
      setCategoryBudgets(categoryBudgets)
    }
    fetchBudgets()
  }, [refreshTrigger]);

  const categoryBudgetElements = categoryBudgets.map((budget) => (
    <div key={budget.category} className="space-y-2">
      <div className="flex items-center justify-between text-sm font-medium text-slate-700">
        <span>{budget.category}</span>
        <span className="text-slate-500">
          ${budget.used} / ${budget.amount}
        </span>
      </div>
      <Progress value={(budget.amount / budget.amount) * 100} />
    </div>
  ))

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-500">Budgets</CardTitle>
        <div className="mt-3 flex items-center gap-2 text-2xl font-semibold text-slate-900">
          {overallBudget ? `$${overallBudget.toFixed(2)}` : `Loading...`}
        </div>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          Edit
        </button>
      </CardHeader>
      <CardContent className="space-y-5">
        {categoryBudgetElements}
        {/* <div className="rounded-2xl bg-indigo-50 px-4 py-4 text-sm text-indigo-800">
          <div className="flex items-start gap-2">
            <span className="mt-0.5">
              <Info className="h-4 w-4" />
            </span>
            <span>You're close to hitting your limit on Entertainment!</span>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}

