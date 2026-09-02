"use client";

import { useUsers } from "@/hooks/use-user";
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
import { UsersDataTable } from "@/components/users/UserDatatable";
import { userColumns } from "@/components/users/UserColumns";
import { Briefcase, Shield, User, Users } from "lucide-react";

export default function HRModulePage() {
  const { data: users = [], isLoading } = useUsers();

  const adminCount = users.filter((user) => user.role === "ADMIN").length;
  const managerCount = users.filter((user) => user.role === "MANAGER").length;
  const cashierCount = users.filter((user) => user.role === "CASHIER").length;
  const activeCount = users.filter((user) => user.isActive).length;

  return (
    <div className="space-y-6 p-1">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>HR</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Human resources</h1>
        <p className="text-muted-foreground text-sm">
          Workforce access, roles, and staffing overview across the business.
        </p>
        <BranchLabel />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total staff</p>
              <p className="text-2xl font-bold">{isLoading ? "—" : users.length}</p>
            </div>
            <div className="p-2 rounded-lg bg-muted">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Admins</p>
              <p className="text-2xl font-bold text-red-500">{isLoading ? "—" : adminCount}</p>
            </div>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/20">
              <Shield className="h-4 w-4 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Managers</p>
              <p className="text-2xl font-bold text-blue-500">{isLoading ? "—" : managerCount}</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <Briefcase className="h-4 w-4 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Cashiers</p>
              <p className="text-2xl font-bold text-green-500">{isLoading ? "—" : cashierCount}</p>
            </div>
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
              <User className="h-4 w-4 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-emerald-500">{isLoading ? "—" : activeCount}</p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20">
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <UsersDataTable data={users} columns={userColumns} />
      )}
    </div>
  );
}
