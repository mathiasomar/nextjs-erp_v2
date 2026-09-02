import { auth } from "@/lib/auth";
import { ERP_MODULES, ERP_MODULE_STATUS_LABELS } from "@/lib/erp-modules";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const stats = ERP_MODULES.reduce(
    (acc, module) => {
      acc[module.status] += 1;
      return acc;
    },
    { ready: 0, "in-progress": 0, planned: 0 },
  );

  return NextResponse.json({
    modules: ERP_MODULES.map((module) => ({
      ...module,
      statusLabel: ERP_MODULE_STATUS_LABELS[module.status],
    })),
    total: ERP_MODULES.length,
    ready: stats.ready,
    inProgress: stats["in-progress"],
    planned: stats.planned,
  });
}
