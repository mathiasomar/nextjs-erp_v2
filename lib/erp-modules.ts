export type ERPModuleStatus = "ready" | "in-progress" | "planned";

export type ERPModule = {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  description: string;
  status: ERPModuleStatus;
  path: string;
  tags: string[];
};

export const ERP_MODULES: ERPModule[] = [
  {
    slug: "organization",
    name: "Organization & Access",
    shortName: "Org",
    summary: "Multi-branch structure, users, roles, permissions and audit trails.",
    description:
      "Shared foundation for authentication, organization setup, branch access, and admin controls.",
    status: "ready",
    path: "/dashboard/branches",
    tags: ["Auth", "Roles", "Branches"],
  },
  {
    slug: "inventory",
    name: "Inventory Management",
    shortName: "Inventory",
    summary: "Products, stock levels, warehouses, batches and stock movement tracking.",
    description:
      "The core of the retail ERP, covering product master data, stock visibility, adjustments, and replenishment workflows.",
    status: "ready",
    path: "/dashboard/inventory",
    tags: ["Products", "Stock", "Warehouse"],
  },
  {
    slug: "sales",
    name: "Sales Management",
    shortName: "Sales",
    summary: "POS transactions, invoices, returns, customers and sales performance.",
    description:
      "Handles order capture, payment flows, customer experience, and sales reporting from POS to invoice completion.",
    status: "ready",
    path: "/dashboard/orders",
    tags: ["POS", "Orders", "Customers"],
  },
  {
    slug: "purchases",
    name: "Purchase Management",
    shortName: "Purchases",
    summary: "Suppliers, purchase orders, GRN, and procurement approvals.",
    description:
      "Coordinates supplier management and incoming stock flow from request to delivery and invoice matching.",
    status: "in-progress",
    path: "/dashboard/purchases",
    tags: ["Suppliers", "Procurement", "Inbound"],
  },
  {
    slug: "accounting",
    name: "Accounting & Finance",
    shortName: "Finance",
    summary: "Ledger, cash movement, expenses, and financial reporting workflows.",
    description:
      "Provides the accounting foundation for journal entries, cash flow, expenses, and profit visibility across the ERP.",
    status: "in-progress",
    path: "/dashboard/expenses",
    tags: ["Ledger", "Expenses", "Reports"],
  },
  {
    slug: "hr",
    name: "Human Resource",
    shortName: "HR",
    summary: "Employees, departments, contract management, leave and attendance.",
    description:
      "Supports people operations, schedules, staffing, and workforce structure for the organization.",
    status: "planned",
    path: "/dashboard/users",
    tags: ["Employees", "Attendance", "Contracts"],
  },
  {
    slug: "payroll",
    name: "Payroll",
    shortName: "Payroll",
    summary: "Salary processing, PAYE, SHIF, NSSF, overtime and payslips.",
    description:
      "Covers payroll computation, statutory deductions, employee pay summary, and payslip generation.",
    status: "planned",
    path: "/dashboard/payroll",
    tags: ["Salary", "Compliance", "Payslips"],
  },
  {
    slug: "warehouse",
    name: "Warehouse Management",
    shortName: "Warehouse",
    summary: "Bin locations, transfers, picking, packing and fulfillment operations.",
    description:
      "Extends stock movement management into warehouse workflows, transfers, and operational allocation.",
    status: "planned",
    path: "/dashboard/warehouse",
    tags: ["Transfers", "Fulfillment", "Picking"],
  },
  {
    slug: "crm",
    name: "CRM & Customer Lifecycle",
    shortName: "CRM",
    summary: "Leads, customer history, loyalty, opportunities and follow-ups.",
    description:
      "Tracks customer relationships, retention programs, and lifecycle events from first touch to repeat business.",
    status: "planned",
    path: "/dashboard/customers",
    tags: ["Customers", "Loyalty", "History"],
  },
  {
    slug: "reports",
    name: "Reports & Analytics",
    shortName: "Reports",
    summary: "Shared dashboards, exportable reports and operational analytics.",
    description:
      "Gives every module access to reporting services, dashboard summaries, and PDF/CSV exports.",
    status: "ready",
    path: "/dashboard/reports",
    tags: ["Analytics", "Exports", "KPIs"],
  },
];

export const ERP_MODULE_STATUS_LABELS: Record<ERPModuleStatus, string> = {
  ready: "Ready",
  "in-progress": "In progress",
  planned: "Planned",
};
