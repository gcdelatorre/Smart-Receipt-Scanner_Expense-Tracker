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
          <p className="hidden text-sm font-medium text-muted-foreground md:block">{pageTitle}</p>
          {/* Mobile Title */}
          <p className="block text-xl font-bold text-foreground md:hidden">{pageTitle}</p>
        </div>
        <AddNewButton onAdd={() => setOpen(true)} />
      </div>

      {/* --- Selection Dialog --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        {/* 1. sm:max-w-2xl: Makes the modal wider on desktop to fit 3 columns comfortably.
            2. overflow-hidden: Prevents scrollbars if animations go out of bounds.
        */}
        <DialogContent className="sm:max-w-2xl overflow-hidden p-0 bg-card border-border">

          <div className="px-6 pt-6 pb-2">
            <DialogHeader>
              <DialogTitle className="text-xl text-foreground">Select Transaction Type</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Choose what you want to add to your dashboard.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6 bg-muted/30">
            {/* 1. w-full: Takes full width of the modal.
                2. grid-cols-1: Stacked on mobile.
                3. sm:grid-cols-3: 3 columns on tablet/desktop.
            */}
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
              {["income", "expense", "budget"].map((type) => {
                const conf = typeConfigs[type] || { label: type, color: "bg-muted", pill: "text-muted-foreground", bg: "bg-muted" };
                return (
                  <button
                    key={type}
                    onClick={() => handleTypeSelection(type)}
                    className={`
                      relative group flex flex-col justify-between 
                      rounded-2xl border border-border bg-card p-6 
                      text-left shadow-sm transition-all duration-300
                      hover:border-primary/50 hover:shadow-xl hover:-translate-y-1.5
                      active:scale-95
                      min-h-[160px] 
                    `}
                  >
                    <div className="mb-4">
                      <span className={`inline-block rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${conf.bg} ${conf.pill}`}>
                        {conf.label}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        Add {conf.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                        Record a new entry to your dashboard.
                      </p>
                    </div>

                    {/* Decorative colored bar at bottom */}
                    <div className={`absolute bottom-0 left-0 h-1.5 w-full rounded-b-2xl opacity-0 transition-all duration-300 group-hover:opacity-100 ${conf.color}`} />
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