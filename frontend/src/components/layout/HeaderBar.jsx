
export default function HeaderBar({ pageTitle, onAdd }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="hidden md:block">
        <p className="text-sm font-medium text-slate-500">{pageTitle}</p>
      </div>
      <div className="md:hidden">
        <p className="text-base font-semibold text-slate-900">{pageTitle}</p>
      </div>

    </div>
  );
}

