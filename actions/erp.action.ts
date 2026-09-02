"use server";

import { auth } from "@/lib/auth";
import { ERP_MODULES, ERPModuleStatus, ERP_MODULE_STATUS_LABELS } from "@/lib/erp-modules";
import { headers } from "next/headers";

export async function getErpSummaryAction() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return {
      isAuthenticated: false,
      modules: [],
      total: 0,
      ready: 0,
      inProgress: 0,
      planned: 0,
    };
  }

  const grouped = ERP_MODULES.reduce(
    (acc, module) => {
      acc[module.status] += 1;
      return acc;
    },
    { ready: 0, "in-progress": 0, planned: 0 } as Record<ERPModuleStatus, number>,
  );

  return {
    isAuthenticated: true,
    modules: ERP_MODULES.map((module) => ({
      ...module,
      statusLabel: ERP_MODULE_STATUS_LABELS[module.status],
    })),
    total: ERP_MODULES.length,
    ready: grouped.ready,
    inProgress: grouped["in-progress"],
    planned: grouped.planned,
  };
}
