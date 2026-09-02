"use client";

import { useExpenses } from "@/hooks/use-expense";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BranchLabel } from "@/components/layout/BranchLabel";
import { ExpenseChart } from "@/components/expenses/ExpenseChart";
import { ExpenseCategoryChart } from "@/components/expenses/ExpenseCategoryChart";
import { ExpenseDataTable } from "@/components/expenses/ExpenseDatatable";
import { expenseColumns } from "@/components/expenses/ExpenseColumns";
import { Banknote, CreditCard, Smartphone, TrendingDown } from "lucide-react";

export default function AccountingModulePage() {
  const { data, isLoading } = useExpenses();

  const expenses = data?.expenses ?? [];
  const totalAmount = data?.totalAmount ?? 0;
  const byMethod = data?.byMethod ?? {
    CASH: 0,
    MPESA: 0,
    CARD: 0,
    BANK_TRANSFER: 0,
  };

  return (
    <div className="space-y-6 p-1">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Accounting</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Accounting</h1>
        <p className="text-muted-foreground text-sm">
          Track operational spend, payment methods, and charted expense trends.
        </p>
        <BranchLabel />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total expenses</p>
              <p className="text-2xl font-bold text-destructive">
                {isLoading ? "—" : `KES ${totalAmount.toLocaleString()}`}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted text-destructive">
              <TrendingDown size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cash</p>
              <p className="text-2xl font-bold">
                {isLoading ? "—" : `KES ${byMethod.CASH.toLocaleString()}`}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted text-green-600">
              <Banknote size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">M-Pesa</p>
              <p className="text-2xl font-bold">
                {isLoading ? "—" : `KES ${byMethod.MPESA.toLocaleString()}`}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted text-blue-600">
              <Smartphone size={20} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Card / Bank</p>
              <p className="text-2xl font-bold">
                {isLoading
                  ? "—"
                  : `KES ${(byMethod.CARD + byMethod.BANK_TRANSFER).toLocaleString()}`}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted text-purple-600">
              <CreditCard size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ExpenseChart range="30d" />
        <ExpenseCategoryChart />
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <ExpenseDataTable data={expenses} columns={expenseColumns} />
      )}
    </div>
  );
}
