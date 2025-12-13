import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { typeConfigs } from "./utils/typeConfigs";
import { fetchUserBudget } from "./utils/fetchUser";

export default function AddEntryModal({ open, onClose, refreshTransaction }) {
  const [selectedType, setSelectedType] = useState(null);
  const [budgetCategories, setBudgetCategories] = useState([{ category: "", amount: "" }]);
  const [overallBudget, setOverallBudget] = useState(0);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    store: "",
    items: [],
    description: "",
    date: "",
    note: "",
  });

  const [receiptFile, setReceiptFile] = useState(null);
  const [uploadState, setUploadState] = useState({ status: "idle", message: "" });

  useEffect(() => {
    const fetchOverallBudget = async () => {
      const { overallBudget } = await fetchUserBudget()
      setOverallBudget(overallBudget);
    }
    fetchOverallBudget();
  }, [])

  useEffect(() => {
    if (!open) {
      if (selectedType === "budget") {
        setForm((f) => ({ ...f, amount: overallBudget }));
      } else {
        setForm({ amount: "", category: "", store: "", items: [], description: "", date: "", note: "" });
      }
      setSelectedType(null);
      setReceiptFile(null);
      setUploadState({ status: "idle", message: "" });
      setBudgetCategories([{ category: "", amount: "" }]);
    }
  }, [open]);

  if (!open) return null;

  const cfg = selectedType ? typeConfigs[selectedType] : null;

  const canSubmit =
    (selectedType === "budget" && form.amount) ||
    ((selectedType === "income" || selectedType === "expense") && form.amount && form.date);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload =
        selectedType === "income"
          ? { amount: form.amount, category: form.category, date: form.date, description: form.description }
          : selectedType === "expense"
            ? { amount: form.amount, category: form.category, store: form.store, date: form.date, description: form.description }
            : {
              overallBudget: Number(form.amount),
              categoryBudgets: budgetCategories.map((cat) => ({
                category: cat.category,
                amount: Number(cat.amount) || 0,
                usedAmount: 0,
              })),
            };

      const endpoint =
        selectedType === "income"
          ? "/api/income"
          : selectedType === "expense"
            ? "/api/expenses"
            : "/api/user/budget/693aec9c08d1f6edd4c2ad5f";

      let res;
      if (endpoint === "/api/income" || endpoint === "/api/expenses") {
        res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(endpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Error submitting data");
      }

      if (refreshTransaction) refreshTransaction();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save entry: " + err.message);
    }
  };

  const handleUploadReceipt = async () => {
    if (!receiptFile) {
      setUploadState({ status: "error", message: "Please choose a receipt image first." });
      return;
    }
    try {
      setUploadState({ status: "uploading", message: "Uploading receipt..." });
      const fd = new FormData();
      fd.append("image", receiptFile);

      const res = await fetch("/api/expenses/upload", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Upload failed");
      }

      setUploadState({ status: "success", message: "Receipt uploaded and processed." });
      if (refreshTransaction) refreshTransaction();
    } catch (err) {
      setUploadState({
        status: "error",
        message: err?.message || "Something went wrong uploading the receipt.",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-6 overflow-y-auto">
      <div className="mt-6 w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-300">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 sticky top-0 bg-white z-10">
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

        {/* TYPE SELECT */}
        {!selectedType ? (
          <div className="grid gap-4 bg-slate-50 px-6 py-6 sm:grid-cols-2">
            {["income", "expense", "budget"].map((type) => {
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
                  <p className="text-sm text-slate-700">
                    Track a new {conf.label.toLowerCase()}.
                  </p>
                </button>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 max-h-[80vh] overflow-y-auto">
            {/* TYPE TAG */}
            <div className="flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold text-slate-800">
              <span>Type</span>
              <span className={`rounded-full px-3 py-1 text-xs ${cfg.pill}`}>{cfg.label}</span>
            </div>

            {/* INCOME & EXPENSE FIELDS */}
            {selectedType !== "budget" && (
              <>
                {/* AMOUNT */}
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

                {/* CATEGORY */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Category</label>
                  <Input
                    placeholder={selectedType === "income" ? "e.g. Salary" : "e.g. Food"}
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  />
                </div>

                {/* STORE — ONLY EXPENSE */}
                {selectedType === "expense" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Store</label>
                    <Input
                      placeholder="e.g. SM Supermarket"
                      value={form.store}
                      onChange={(e) => setForm((f) => ({ ...f, store: e.target.value }))}
                    />
                  </div>
                )}

                {/* DATE */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Date</label>
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  />
                </div>

                {/* NOTE */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Note</label>
                  <Input
                    placeholder="Optional note"
                    value={form.note}
                    onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  />
                </div>

                {/* RECEIPT UPLOAD — ONLY EXPENSE */}
                {selectedType === "expense" && (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Upload receipt</p>
                        <p className="text-xs text-slate-500">Submit a photo to auto-create an expense.</p>
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-indigo-600">
                        Optional
                      </span>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700
                        file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 
                        file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
                    />

                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-slate-500">
                        Choose a receipt image (jpg, png)
                      </div>

                      <Button
                        type="button"
                        onClick={handleUploadReceipt}
                        className="rounded-xl px-4"
                        disabled={uploadState.status === "uploading" || !receiptFile}
                      >
                        {uploadState.status === "uploading" ? "Uploading..." : "Upload receipt"}
                      </Button>
                    </div>

                    {uploadState.message && (
                      <div
                        className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium ${uploadState.status === "error"
                          ? "bg-rose-50 text-rose-700"
                          : uploadState.status === "success"
                            ? "bg-green-50 text-green-700"
                            : "bg-slate-50 text-slate-600"
                          }`}
                      >
                        {uploadState.message}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* BUDGET FIELDS */}
            {selectedType === "budget" && (
              <div className="space-y-6">
                {/* OVERALL BUDGET */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Overall Budget</label>
                  <Input
                    type="number"
                    placeholder="Total monthly budget"
                    value={form.amount}
                    onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                  />
                </div>

                {/* CATEGORY BUDGETS */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">Category Budgets</label>
                    <Button
                      type="button"
                      className="rounded-xl px-3 py-1"
                      onClick={() =>
                        setBudgetCategories((prev) => [...prev, { category: "", amount: "" }])
                      }
                    >
                      + Add Category
                    </Button>
                  </div>

                  {budgetCategories.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="col-span-5 space-y-1">
                        <label className="text-xs text-slate-600">Category</label>
                        <Input
                          placeholder="e.g. Food"
                          value={item.category}
                          onChange={(e) =>
                            setBudgetCategories((prev) =>
                              prev.map((obj, i) =>
                                i === index ? { ...obj, category: e.target.value } : obj
                              )
                            )
                          }
                        />
                      </div>

                      <div className="col-span-5 space-y-1">
                        <label className="text-xs text-slate-600">Amount</label>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={item.amount}
                          onChange={(e) =>
                            setBudgetCategories((prev) =>
                              prev.map((obj, i) =>
                                i === index ? { ...obj, amount: e.target.value } : obj
                              )
                            )
                          }
                        />
                      </div>

                      <div className="col-span-2 flex justify-center items-end">
                        <Button
                          type="button"
                          variant="destructive"
                          className="rounded-xl px-3 py-2"
                          onClick={() =>
                            setBudgetCategories((prev) => prev.filter((_, i) => i !== index))
                          }
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUBMIT BUTTONS */}
            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" type="button" onClick={() => setSelectedType(null)}>
                Back
              </Button>
              <Button type="submit" className={`rounded-xl px-5 ${cfg.submit}`} disabled={!canSubmit}>
                Save {cfg.label}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
