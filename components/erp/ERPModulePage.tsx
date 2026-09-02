import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ERPModule, ERP_MODULE_STATUS_LABELS } from "@/lib/erp-modules";
import { ArrowRight, CheckCircle2, Layers3 } from "lucide-react";
import Link from "next/link";

function statusClasses(status: ERPModule["status"]) {
  if (status === "ready") return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  if (status === "in-progress") return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
  return "bg-slate-500/10 text-slate-700 dark:text-slate-300";
}

export default function ERPModulePage({ module }: { module: ERPModule }) {
  const roadmap = [
    "Authentication and authorization",
    "Business workflows",
    "Reporting and audit logs",
    "Cross-module integrations",
  ];

  return (
    <div className="space-y-6 p-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/erp">ERP</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{module.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Layers3 size={18} />
            <span className="text-sm font-semibold uppercase tracking-[0.12em]">ERP Module</span>
          </div>
          <h1 className="text-3xl font-bold">{module.name}</h1>
          <p className="text-muted-foreground max-w-2xl">{module.description}</p>
        </div>

        <Badge className={statusClasses(module.status)}>
          {ERP_MODULE_STATUS_LABELS[module.status]}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Module overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>{module.summary}</p>
            <div className="flex flex-wrap gap-2">
              {module.tags.map((tag) => (
                <span key={tag} className="rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.12em]">
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Implementation focus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {roadmap.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Next steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            This module is structured in the same Next.js app router pattern used across the project, with
            dashboard pages, API routes, and server-side access control using Better Auth.
          </p>
          <Link
            href="/dashboard/erp"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            Back to ERP overview
            <ArrowRight size={14} />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
