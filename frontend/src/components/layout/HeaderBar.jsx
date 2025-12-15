import { useState, useEffect } from "react";
import AddNewButton from "../ui/AddNewButton";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { typeConfigs } from "../utils/typeConfigs";
import { AddIncomeModal } from "../ModalDialogs";

export default function HeaderBar({ pageTitle }) {

  const [open, setOpen] = useState(false)
  const [transactionType, setTransactionType] = useState(null)

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="hidden md:block">
          <p className="text-sm font-medium text-slate-500">{pageTitle}</p>
        </div>
        <div className="md:hidden">
          <p className="text-base font-semibold text-slate-900">{pageTitle}</p>
        </div>
        <AddNewButton onAdd={() => setOpen(true)} />
      </div>

      {open
        && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogTitle>Select Transaction Type</DialogTitle>
              <DialogDescription>
                <div className="grid gap-4 bg-slate-50 px-6 py-6 sm:grid-cols-2">
                  {["income", "expense", "budget"].map((type) => {
                    const conf = typeConfigs[type];
                    return (
                      <button
                        key={type}
                        onClick={() => setTransactionType(type)}
                        className={`flex h-28 flex-col items-start justify-between rounded-2xl border px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow ${conf.color}`}
                      >
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${conf.pill}`}>
                          {conf.label}
                        </span>
                        <p className="text-sm text-slate-700">
                          Track a new {conf.label.toLowerCase()}.
                        </p>
                      </button>
                    );
                  })}
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )
      }
      // unfinished must be all three modals
      {transactionType === "income" && <AddIncomeModal open={open} onOpenChange={setOpen} />}
    </>
  );
}

