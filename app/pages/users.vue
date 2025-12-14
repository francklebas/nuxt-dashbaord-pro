<script setup lang="ts">
import type {
  ColumnDef,
  SortingState,
  PaginationState,
} from "@tanstack/vue-table";
import { h } from "vue";
import type { User } from "@core/types/database";
import {
  createSelectionColumn,
  createDateColumn,
} from "@ui/utils/dataTableColumns";

useHead({
  title: "Users - Data Table Demo",
  meta: [
    {
      name: "description",
      content: "User management with data table, search, filters, and sorting.",
    },
  ],
});

const {
  data: users,
  loading,
  total,
  pageCount,
  setPage,
  setLimit,
  setSearch,
  setSort,
  setFilters,
  clearFilters,
} = useDataTable<User>("/api/users");

const columns: ColumnDef<User, unknown>[] = [
  createSelectionColumn<User>(),
  {
    accessorKey: "email",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return h("div", { class: "flex flex-col" }, [
        h("span", { class: "font-medium text-foreground" }, user.email),
        h(
          "span",
          { class: "text-sm text-muted-foreground" },
          user.full_name || "—",
        ),
      ]);
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue }) => {
      const role = getValue() as string;
      const colorMap: Record<string, string> = {
        admin:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
        user: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        guest:
          "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
      };
      return h(
        "span",
        {
          class: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[role] || colorMap.guest}`,
        },
        role.charAt(0).toUpperCase() + role.slice(1),
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const colorMap: Record<string, string> = {
        active:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        inactive:
          "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
        suspended:
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
  createDateColumn<User>("created_at", "Joined", "short"),
];

const filters = [
  {
    key: "role",
    label: "Role",
    type: "select" as const,
    options: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Guest", value: "guest" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select" as const,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Suspended", value: "suspended" },
    ],
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
      <h1 class="mb-2 text-3xl font-bold text-foreground">User Management</h1>
      <p class="text-muted-foreground">Manage users, roles, and permissions</p>
    </div>

    <DpDataTableFilters
      :filters="filters"
      search-placeholder="Search users..."
      @search="setSearch"
      @filter="setFilters"
      @clear="clearFilters"
    />

    <div class="mt-6">
      <DpDataTable
        :columns="columns"
        :data="users"
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

    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="bg-card rounded-lg border border-border p-4">
        <div class="text-sm text-muted-foreground">Total Users</div>
        <div class="text-2xl font-bold text-foreground">{{ total }}</div>
      </div>
      <div class="bg-card rounded-lg border border-border p-4">
        <div class="text-sm text-muted-foreground">Active</div>
        <div class="text-2xl font-bold text-green-600">
          {{ users.filter((u) => u.status === "active").length }}
        </div>
      </div>
      <div class="bg-card rounded-lg border border-border p-4">
        <div class="text-sm text-muted-foreground">Admins</div>
        <div class="text-2xl font-bold text-purple-600">
          {{ users.filter((u) => u.role === "admin").length }}
        </div>
      </div>
    </div>
  </div>
</template>
