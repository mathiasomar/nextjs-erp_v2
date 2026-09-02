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
import { useCustomers } from "@/hooks/use-customer";
import { Gift, Star, TrendingUp, Users } from "lucide-react";

export default function CRMModulePage() {
  const { data: customers = [], isLoading } = useCustomers();

  const activeCustomers = customers.filter((customer) => customer.isActive).length;
  const totalOrders = customers.reduce(
    (sum, customer) => sum + (customer._count?.orders ?? 0),
    0,
  );
  const totalPoints = customers.reduce((sum, customer) => sum + customer.points, 0);
  const vipCustomers = customers.filter((customer) => customer.points >= 500).length;

  return (
    <div className="space-y-6 p-1">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>CRM</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">CRM & customer lifecycle</h1>
        <p className="text-muted-foreground text-sm">
          Retention, repeat-purchase activity, and loyalty engagement across your customer base.
        </p>
        <BranchLabel />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Customers</p>
              <p className="text-2xl font-bold">
                {isLoading ? "—" : customers.length}
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
                {isLoading ? "—" : activeCustomers}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Orders</p>
              <p className="text-2xl font-bold">
                {isLoading ? "—" : totalOrders}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Points issued</p>
              <p className="text-2xl font-bold text-amber-600">
                {isLoading ? "—" : totalPoints.toLocaleString()}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/20">
              <Gift className="h-4 w-4 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Customer engagement</h2>
            <Badge variant="outline" className="text-amber-600 border-amber-400">
              {vipCustomers} VIPs
            </Badge>
          </div>

          {isLoading ? (
            <Skeleton className="h-24 w-full rounded-md" />
          ) : (
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Loyal customers</p>
                <p className="mt-1 text-xl font-bold text-amber-500">{vipCustomers}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Repeat buyers</p>
                <p className="mt-1 text-xl font-bold text-blue-500">
                  {customers.filter((customer) => (customer._count?.orders ?? 0) >= 2).length}
                </p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-xs text-muted-foreground">Average points</p>
                <p className="mt-1 text-xl font-bold text-green-500">
                  {customers.length ? Math.round(totalPoints / customers.length) : 0}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            <h2 className="font-semibold">Top customers</h2>
          </div>

          {isLoading ? (
            <Skeleton className="h-20 w-full rounded-md" />
          ) : customers.length ? (
            <div className="space-y-2">
              {[...customers]
                .sort((a, b) => b.points - a.points)
                .slice(0, 5)
                .map((customer, idx) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between rounded-md border p-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{idx + 1}. {customer.name}</p>
                      <p className="text-muted-foreground text-xs">{customer.phone}</p>
                    </div>
                    <Badge variant="secondary">{customer.points} pts</Badge>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No customers available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
