"use client";

import { InventoryDataTable } from "@/components/inventory/InventoryDatatable";
import { inventoryColumns } from "@/components/inventory/InventoryColums";
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
import { useInventory, useLowStock } from "@/hooks/use-inventory";
import {
  AlertTriangle,
  Boxes,
  PackageCheck,
  TrendingDown,
  Warehouse,
} from "lucide-react";

export default function WarehouseModulePage() {
  const { data: inventory = [], isLoading } = useInventory();
  const { data: lowStockItems = [] } = useLowStock();

  const lowStockCount = inventory.filter(
    (item) => item.quantity > 0 && item.quantity <= item.lowStockAt,
  ).length;
  const outOfStockCount = inventory.filter((item) => item.quantity === 0).length;
  const totalUnits = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const stockValue = inventory.reduce(
    (sum, item) => sum + item.quantity * (item.product.costPrice || 0),
    0,
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
            <BreadcrumbPage>Warehouse</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Warehouse management</h1>
        <p className="text-muted-foreground text-sm">
          Fulfillment, stock visibility, and replenishment health across all locations.
        </p>
        <BranchLabel />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Products</p>
              <p className="text-2xl font-bold">
                {isLoading ? "—" : inventory.length}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted">
              <Warehouse className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Units on hand</p>
              <p className="text-2xl font-bold">{isLoading ? "—" : totalUnits}</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <Boxes className="h-4 w-4 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Low stock</p>
              <p className="text-2xl font-bold text-orange-500">
                {isLoading ? "—" : lowStockCount}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/20">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Stock value</p>
              <p className="text-2xl font-bold">
                {isLoading ? "—" : `KES ${stockValue.toLocaleString()}`}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20">
              <TrendingDown className="h-4 w-4 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Replenishment alerts</h2>
              <Badge variant="outline" className="text-orange-600 border-orange-400">
                {lowStockItems.length} items
              </Badge>
            </div>

            {isLoading ? (
              <Skeleton className="h-20 w-full rounded-md" />
            ) : lowStockItems.length ? (
              <div className="space-y-2">
                {lowStockItems.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-md border p-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {item.product.sku}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {item.quantity} left
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No replenishment alerts right now.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Fulfillment status</h2>
              <PackageCheck className="h-4 w-4 text-green-600" />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-md border p-2">
                <span className="text-muted-foreground">Out of stock</span>
                <span className="font-semibold text-destructive">
                  {isLoading ? "—" : outOfStockCount}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border p-2">
                <span className="text-muted-foreground">At risk</span>
                <span className="font-semibold text-orange-600">
                  {isLoading ? "—" : lowStockCount}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border p-2">
                <span className="text-muted-foreground">Healthy stock</span>
                <span className="font-semibold text-green-600">
                  {isLoading
                    ? "—"
                    : Math.max(inventory.length - lowStockCount - outOfStockCount, 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <InventoryDataTable data={inventory} columns={inventoryColumns} />
      )}
    </div>
  );
}
