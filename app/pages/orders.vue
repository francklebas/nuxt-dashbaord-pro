<script setup lang="ts">
import type {
  ColumnDef,
  PaginationState,
  SortingState,
} from "@tanstack/vue-table";
import { h } from "vue";
import type { Order } from "~/layers/core/types/database";
import {
  createCurrencyColumn,
  createDateColumn,
  createSelectionColumn,
} from "@ui/utils/dataTableColumns";

useHead({
  title: "Orders - Data Table Demo",
  meta: [
    {
      name: "description",
      content:
        "Order management with data table, search, filters, and sorting.",
    },
  ],
});

const {
  data: orders,
  loading,
  total,
  pageCount,
  setPage,
  setLimit,
  setSearch,
  setSort,
  setFilters,
  clearFilters,
} = useDataTable<Order>("/api/orders");

const columns: ColumnDef<Order, unknown>[] = [
  createSelectionColumn<Order>(),
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ getValue }) => {
      const id = getValue() as string;
      return h("span", { class: "font-mono text-sm" }, id.substring(0, 8));
    },
  },
  {
    accessorKey: "user_email",
    header: "Customer",
    cell: ({ row }) => {
      const order = row.original;
      return h("div", { class: "flex flex-col" }, [
        h(
          "span",
          { class: "font-medium text-foreground" },
          order.user_name || "—",
        ),
        h("span", { class: "text-sm text-muted-foreground" }, order.user_email),
      ]);
    },
  },
  createCurrencyColumn<Order>("total_amount", "Total"),
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const colorMap: Record<string, string> = {
        pending:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        processing:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        shipped:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
        delivered:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        cancelled:
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      };
      return h(
        "span",
        {
          class: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[status]}`,
        },
        status.charAt(0).toUpperCase() + status.slice(1),
      );
    },
  },
  {
    accessorKey: "payment_method",
    header: "Payment",
    cell: ({ getValue }) => {
      const method = getValue() as string;
      return h("span", { class: "text-sm" }, method);
    },
  },
  createDateColumn<Order>("created_at", "Order Date", "short"),
];

const filters = [
  {
    key: "status",
    label: "Status",
    type: "select" as const,
    options: [
      { label: "Pending", value: "pending" },
      { label: "Processing", value: "processing" },
      { label: "Shipped", value: "shipped" },
      { label: "Delivered", value: "delivered" },
      { label: "Cancelled", value: "cancelled" },
    ],
  },
  {
    key: "payment_method",
    label: "Payment Method",
    type: "select" as const,
    options: [
      { label: "Credit Card", value: "credit_card" },
      { label: "PayPal", value: "paypal" },
      { label: "Stripe", value: "stripe" },
    ],
  },
  {
    key: "minAmount",
    label: "Min Amount ($)",
    type: "number-range" as const,
  },
];

const handleSortingChange = (sorting: SortingState) => {
  if (sorting.length > 0) {
    const sort = sorting[0];
    setSort(sort.id, sort.desc ? "desc" : "asc");
  }
};

const handlePaginationChange = (pagination: PaginationState) => {
  setPage(pagination.pageIndex + 1);
};
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 py-8">
    <div class="mb-8">
      <h1 class="mb-2 text-3xl font-bold text-foreground">Order Management</h1>
      <p class="text-muted-foreground">Track and manage customer orders</p>
    </div>

    <DpDataTableFilters
      :filters="filters"
      search-placeholder="Search orders..."
      @search="setSearch"
      @filter="setFilters"
      @clear="clearFilters"
    />

    <div class="mt-6">
      <DpDataTable
        :columns="columns"
        :data="orders"
        :loading="loading"
        :page-count="pageCount"
        :total="total"
        :enable-row-selection="true"
        :manual-pagination="true"
        :manual-sorting="true"
        @sorting-change="handleSortingChange"
        @pagination-change="handlePaginationChange"
        @page-size-change="setLimit"
      />
    </div>

    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
      <div class="bg-card rounded-lg border border-border p-4">
        <div class="text-sm text-muted-foreground">Total Orders</div>
        <div class="text-2xl font-bold text-foreground">{{ total }}</div>
      </div>
      <div class="bg-card rounded-lg border border-border p-4">
        <div class="text-sm text-muted-foreground">Pending</div>
        <div class="text-2xl font-bold text-yellow-600">
          {{ orders.filter((o) => o.status === "pending").length }}
        </div>
      </div>
      <div class="bg-card rounded-lg border border-border p-4">
        <div class="text-sm text-muted-foreground">Delivered</div>
        <div class="text-2xl font-bold text-green-600">
          {{ orders.filter((o) => o.status === "delivered").length }}
        </div>
      </div>
      <div class="bg-card rounded-lg border border-border p-4">
        <div class="text-sm text-muted-foreground">Revenue</div>
        <div class="text-2xl font-bold text-blue-600">
          ${{ orders.reduce((sum, o) => sum + o.total_amount, 0).toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>
