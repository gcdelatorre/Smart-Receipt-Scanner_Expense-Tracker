import { useState } from "react";
import AddNewButton from "../ui/AddNewButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader, // Added DialogHeader for semantic correctness
  DialogTitle,
} from "@/components/ui/dialog"
import { typeConfigs } from "../utils/typeConfigs";
import { AddBudgetModal, AddExpenseModal, AddIncomeModal } from "../ModalDialogs";
import { expenseCategories } from "../utils/categories";

export default function HeaderBar({ pageTitle, onRefresh }) {

  const [open, setOpen] = useState(false)
  const [openTransactionModal, setOpenTransactionModal] = useState(false)
  const [transactionType, setTransactionType] = useState(null)

  const handleTypeSelection = (type) => {
    setTransactionType(type);
    setOpen(false); // Close the selection menu first
    setTimeout(() => setOpenTransactionModal(true), 150); // Open the specific modal
  };

  const handleBackToSelection = () => {
    setOpenTransactionModal(false);
    setOpen(true);
  }

  return (
    <>
      {/* --- Top Bar --- */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          {/* Desktop Title */}
          <p className="hidden text-sm font-medium text-slate-500 md:block">{pageTitle}</p>
          {/* Mobile Title */}
          <p className="block text-xl font-bold text-slate-900 md:hidden">{pageTitle}</p>
        </div>
        <AddNewButton onAdd={() => setOpen(true)} />
      </div>

      {/* --- Selection Dialog --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        {/* 1. sm:max-w-2xl: Makes the modal wider on desktop to fit 3 columns comfortably.
            2. overflow-hidden: Prevents scrollbars if animations go out of bounds.
        */}
        <DialogContent className="sm:max-w-2xl overflow-hidden p-0 bg-white">

          <div className="px-6 pt-6 pb-2">
            <DialogHeader>
              <DialogTitle className="text-xl">Select Transaction Type</DialogTitle>
              <DialogDescription>
                Choose what you want to add to your dashboard.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6 bg-slate-50/50">
            {/* 1. w-full: Takes full width of the modal.
                2. grid-cols-1: Stacked on mobile.
                3. sm:grid-cols-3: 3 columns on tablet/desktop.
            */}
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
              {["income", "expense", "budget"].map((type) => {
                const conf = typeConfigs[type] || { label: type, color: "bg-gray-100", pill: "text-gray-600" }; // Fallback
                return (
                  <button
                    key={type}
                    onClick={() => handleTypeSelection(type)}
                    className={`
                      relative group flex flex-col justify-between 
                      rounded-xl border border-slate-200 bg-white p-5 
                      text-left shadow-sm transition-all duration-200
                      hover:border-slate-300 hover:shadow-md hover:-translate-y-1
                      active:scale-95
                      min-h-[140px] /* Ensures consistent height */
                    `}
                  >
                    <div className="mb-3">
                      <span className={`inline-block rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${conf.pill} bg-opacity-10`}>
                        {conf.label}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                        Add new {conf.label.toLowerCase()}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Click to record entry
                      </p>
                    </div>

                    {/* Decorative colored bar at bottom */}
                    <div className={`absolute bottom-0 left-0 h-1 w-full rounded-b-xl opacity-0 transition-opacity group-hover:opacity-100 ${conf.color.replace('border-', 'bg-').replace('text-', 'bg-')}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- Specific Modals --- */}
      {transactionType === "income" && (
        <AddIncomeModal open={openTransactionModal} onOpenChange={setOpenTransactionModal} onBack={handleBackToSelection} onIncomeAdded={onRefresh} />
      )}
      {transactionType === "expense" && (
        <AddExpenseModal open={openTransactionModal} onOpenChange={setOpenTransactionModal} onBack={handleBackToSelection} onExpenseAdded={onRefresh} />
      )}
      {transactionType === "budget" && (
        <AddBudgetModal
          open={openTransactionModal}
          onOpenChange={setOpenTransactionModal}
          expenseCategories={expenseCategories}
          onBack={handleBackToSelection}
          onBudgetAdded={onRefresh}
        />
      )}
    </>
  );
}