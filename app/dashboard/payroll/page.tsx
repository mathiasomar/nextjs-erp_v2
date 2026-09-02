"use client";

import { BranchLabel } from "@/components/layout/BranchLabel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/use-user";
import { BriefcaseBusiness, CreditCard, Landmark, Users } from "lucide-react";

export default function PayrollModulePage() {
  const { data: users = [], isLoading } = useUsers();

  const activeStaff = users.filter((user) => user.isActive).length;
  const adminCount = users.filter((user) => user.role === "ADMIN").length;
  const managerCount = users.filter((user) => user.role === "MANAGER").length;
  const cashierCount = users.filter((user) => user.role === "CASHIER").length;
  const payrollBase =
    adminCount * 65000 + managerCount * 45000 + cashierCount * 28000;

  return (
    <div className="space-y-6 p-1">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Payroll</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Payroll</h1>
        <p className="text-muted-foreground text-sm">
          Workforce compensation oversight, role coverage, and payroll readiness.
        </p>
        <BranchLabel />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Staff</p>
              <p className="text-2xl font-bold">
                {isLoading ? "—" : users.length}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {isLoading ? "—" : activeStaff}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
              <BriefcaseBusiness className="h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Payroll base</p>
              <p className="text-2xl font-bold">
                {isLoading ? "—" : `KES ${payrollBase.toLocaleString()}`}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <CreditCard className="h-4 w-4 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Tax / statutory</p>
              <p className="text-2xl font-bold text-purple-600">Pending</p>
            </div>
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <Landmark className="h-4 w-4 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Workforce summary</h2>
            <Badge variant="outline">Role-based view</Badge>
          </div>

          {isLoading ? (
            <Skeleton className="h-20 w-full rounded-md" />
          ) : (
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Admins</p>
                <p className="mt-1 text-xl font-bold text-red-500">{adminCount}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Managers</p>
                <p className="mt-1 text-xl font-bold text-blue-500">{managerCount}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Cashiers</p>
                <p className="mt-1 text-xl font-bold text-green-500">{cashierCount}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
