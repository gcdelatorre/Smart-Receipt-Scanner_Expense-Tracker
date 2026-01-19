import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { BanknoteX, Info, PlusCircle, Receipt } from "lucide-react";
import { fetchUserBudget } from '../utils/fetchUser'
import { useEffect, useState, useCallback } from "react";
import { getBudgetStatus } from "../utils/getBudgetStatus";
import EditBudgetModal from "../EditBudgetModal";

export default function BudgetsCard({ refreshTrigger }) {

  const [overallBudget, setOverallBudget] = useState(0)
  const [categoryBudgets, setCategoryBudgets] = useState([])
  const [showModal, setShowModal] = useState(false);

  const fetchBudgets = useCallback(async () => {
    const { overallBudget, categoryBudgets } = await fetchUserBudget()
    setOverallBudget(overallBudget)
    setCategoryBudgets(categoryBudgets)
  }, []);

  useEffect(() => {
    fetchBudgets()
  }, [refreshTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBudgetUpdate = () => {
    fetchBudgets(); // Refetch data after update
  }

  const categoryBudgetElements = categoryBudgets.map((budget) => {

    const status = getBudgetStatus(budget.usedAmount, budget.amount)

    return (
      <div key={budget.category} className="space-y-2">
        <div className="flex items-center justify-between text-sm font-medium text-slate-700">
          <div className="flex justify-between items-center w-full">
            <p className="text-base text-slate-900">{budget.category}</p>
            <p className="text-slate-600">
              ${budget.usedAmount} / ${budget.amount}
            </p>
          </div>
        </div>
        <Progress value={status.progress} colorClass={status.progressColor} />
      </div>
    )
  })

  return (
    <>
      {categoryBudgets.length > 0 ?
        (<Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">Budget</CardTitle>
            <div className="mt-3 flex items-center gap-2 text-2xl font-semibold text-slate-900">
              {overallBudget ? `$${overallBudget.toFixed(2)}` : `Loading...`}
            </div>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700" onClick={() => setShowModal(true)}>
              Edit
            </button>
          </CardHeader>
          <CardContent className="space-y-4 pt-1">
            {categoryBudgetElements}
          </CardContent>
        </Card>) : (
          <Card className="border-dashed border-slate-200 bg-slate-50">
            <CardContent className="flex flex-col items-center gap-3 text-sm text-slate-600 py-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 mb-2">
                <BanknoteX className="h-6 w-6" />
              </div>
              <p className="text-lg font-semibold text-slate-800 text-center">
                No Category Budgets Added
              </p>
              <p className="text-center max-w-md">
                You haven’t added any Category Budget yet. Add a new entry to
                start tracking.
              </p>
            </CardContent>
          </Card>
        )
      }
      <EditBudgetModal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
        categoryBudgets={categoryBudgets}
        overallBudget={overallBudget}
        onUpdate={handleBudgetUpdate}
      />
    </>
  );
}

