"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Building2, Package2, Sparkles } from "lucide-react";
import Link from "next/link";
import { ERP_MODULES, ERPModule, ERP_MODULE_STATUS_LABELS } from "@/lib/erp-modules";

function getStatusClass(status: ERPModule["status"]) {
  if (status === "ready") return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  if (status === "in-progress") return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
  return "bg-slate-500/10 text-slate-700 dark:text-slate-300";
}

export function ERPModuleOverview() {
  const [modules, setModules] = useState<ERPModule[]>(ERP_MODULES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/erp/summary");
        if (!res.ok) return;
        const data = await res.json();
        if (!ignore && Array.isArray(data.modules)) {
          setModules(data.modules);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    void load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm text-muted-foreground">ERP Platform</p>
          <h2 className="text-2xl font-bold">Modular business architecture</h2>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard" className="inline-flex items-center gap-2">
            <ArrowUpRight size={14} />
            Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Building2 size={16} />
              Enterprise modules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{modules.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Package2 size={16} />
              Ready modules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {modules.filter((m) => m.status === "ready").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Sparkles size={16} />
              Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {modules.filter((m) => m.status !== "ready").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.slug} className="h-full">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-primary">{module.shortName}</span>
                <Badge className={getStatusClass(module.status)}>
                  {ERP_MODULE_STATUS_LABELS[module.status]}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-snug">{module.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{module.summary}</p>
              <div className="flex flex-wrap gap-2">
                {module.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button asChild variant="secondary" size="sm" className="w-full">
                <Link href={module.path}>Open module</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {loading && <p className="text-sm text-muted-foreground">Refreshing ERP module status...</p>}
    </div>
  );
}
