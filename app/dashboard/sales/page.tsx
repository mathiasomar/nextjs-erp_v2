"use client";

import { useOrders } from "@/hooks/use-orders";
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
import { OrdersDataTable } from "@/components/orders/OrderDatatable";
import { orderColumns } from "@/components/orders/OrderColumns";
import { BadgeDollarSign, CheckCircle2, Clock3, ShoppingCart } from "lucide-react";

export default function SalesModulePage() {
  const { data: orders = [], isLoading } = useOrders();

  const totalRevenue = orders
    .filter((order) => order.status === "COMPLETED")
    .reduce((sum, order) => sum + order.total, 0);

  const completedCount = orders.filter((order) => order.status === "COMPLETED").length;
  const pendingCount = orders.filter((order) => order.status === "PENDING").length;
  const cancelledCount = orders.filter((order) => order.status === "CANCELLED").length;
  const recentOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="space-y-6 p-1">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Sales</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Sales</h1>
        <p className="text-muted-foreground text-sm">
          Sales order flow, completion rate, and revenue performance.
        </p>
        <BranchLabel />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Total orders</p>
              <p className="text-xl font-bold">{isLoading ? "—" : orders.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-xs text-muted-foreground">Completed</p>
              <p className="text-xl font-bold text-green-600">
                {isLoading ? "—" : completedCount}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BadgeDollarSign className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="text-xs text-muted-foreground">Revenue</p>
              <p className="text-xl font-bold text-emerald-600">
                {isLoading ? "—" : `KES ${totalRevenue.toLocaleString()}`}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-xs text-muted-foreground">Pending / cancelled</p>
              <p className="text-xl font-bold text-amber-600">
                {isLoading ? "—" : `${pendingCount} / ${cancelledCount}`}
              </p>
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
        <OrdersDataTable data={recentOrders.slice(0, 8)} columns={orderColumns} />
      )}
    </div>
  );
}
