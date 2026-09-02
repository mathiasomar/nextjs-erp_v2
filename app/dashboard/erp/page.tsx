import { ERPModuleOverview } from "@/components/erp/ERPModuleOverview";

export default function ERPPage() {
  return (
    <div className="space-y-6 p-2">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground uppercase tracking-[0.18em]">Enterprise architecture</p>
        <h1 className="text-3xl font-bold">ERP module overview</h1>
      </div>
      <ERPModuleOverview />
    </div>
  );
}
