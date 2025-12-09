import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const typeConfigs = {
  income: {
    label: "Income",
    color: "bg-green-50 text-green-700 border-green-100",
    pill: "bg-green-100 text-green-800",
    submit: "bg-green-600 hover:bg-green-700",
  },
  expense: {
    label: "Expense",
    color: "bg-rose-50 text-rose-700 border-rose-100",
    pill: "bg-rose-100 text-rose-800",
    submit: "bg-rose-600 hover:bg-rose-700",
  },
};

export default function AddEntryModal({ open, onClose }) {
  const [selectedType, setSelectedType] = useState(null);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    note: "",
    date: "",
  });

  useEffect(() => {
    if (!open) {
      setSelectedType(null);
      setForm({ amount: "", category: "", note: "", date: "" });
    }
  }, [open]);

  if (!open) return null;

  const cfg = selectedType ? typeConfigs[selectedType] : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: integrate with backend later
    console.log("Submitted", { type: selectedType, ...form });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-300">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Add new
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {selectedType ? `${cfg.label} entry` : "Choose entry type"}
            </p>
          </div>
          <Button variant="secondary" size="icon" className="rounded-xl" onClick={onClose}>
            ✕
          </Button>
        </div>

        {!selectedType ? (
          <div className="grid gap-4 bg-slate-50 px-6 py-6 sm:grid-cols-2">
            {(["income", "expense"]).map((type) => {
              const conf = typeConfigs[type];
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex h-28 flex-col items-start justify-between rounded-2xl border px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow ${conf.color}`}
                >
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${conf.pill}`}>
                    {conf.label}
                  </span>
                  <p className="text-sm text-slate-700">Track a new {conf.label.toLowerCase()}.</p>
                </button>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
            <div className="flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold text-slate-800">
              <span>Type</span>
              <span className={`rounded-full px-3 py-1 text-xs ${cfg.pill}`}>{cfg.label}</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Amount</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <Input
                placeholder="e.g. Salary"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Date</label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Note</label>
              <Input
                placeholder="Optional note"
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" type="button" onClick={() => setSelectedType(null)}>
                Back
              </Button>
              <Button
                type="submit"
                className={`rounded-xl px-5 ${cfg.submit}`}
              >
                Save {cfg.label}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

