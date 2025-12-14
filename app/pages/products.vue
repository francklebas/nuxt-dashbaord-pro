<script setup lang="ts">
import type {
  ColumnDef,
  PaginationState,
  SortingState,
} from "@tanstack/vue-table";
import { h, resolveComponent } from "vue";
import type { Product } from "~/layers/core/types/database";
import {
  createCurrencyColumn,
  createDateColumn,
  createImageColumn,
  createSelectionColumn,
} from "@ui/utils/dataTableColumns";

// const { t } = useI18n(); // not used currently
const Icon = resolveComponent("Icon");

useHead({
  title: "Products - Data Table Demo",
  meta: [
    {
      name: "description",
      content:
        "Interactive data table with CRUD operations, search, filters, sorting, and pagination. Built with TanStack Table and Nuxt 4.",
    },
  ],
});

// Data fetching
const {
  data: products,
  loading,
  total,
  // queryParams,
  pageCount,
  setPage,
  setLimit,
  setSearch,
  setSort,
  setFilters,
  clearFilters,
  refresh,
} = useDataTable<Product>("/api/products");

// Modal state
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedProduct = ref<Product | null>(null);

// Define table columns
const columns: ColumnDef<Product, unknown>[] = [
  createSelectionColumn<Product>(),
  createImageColumn<Product>(
    "image_url",
    "Image",
    "https://via.placeholder.com/40",
  ),
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => {
      const product = row.original;
      return h("div", { class: "flex flex-col" }, [
        h("span", { class: "font-medium text-foreground" }, product.name),
        h(
          "span",
          { class: "text-sm text-muted-foreground" },
          product.description || "—",
        ),
      ]);
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  createCurrencyColumn<Product>("price", "Price"),
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ getValue }) => {
      const stock = getValue() as number;
      return h(
        "span",
        {
          class:
            stock > 0
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400",
        },
        stock > 0 ? stock.toString() : "Out of stock",
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
        discontinued:
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
  createDateColumn<Product>("created_at", "Created", "short"),
  {
    id: "actions",
    header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) => {
      const product = row.original;
      return h("div", { class: "flex items-center justify-end gap-2" }, [
        h(
          "button",
          {
            onClick: () => handleEdit(product),
            class: "p-2 hover:bg-muted rounded-md transition-colors",
            title: "Edit",
          },
          [h(Icon, { name: "lucide:pencil", class: "w-4 h-4" })],
        ),
        h(
          "button",
          {
            onClick: () => handleDelete(product),
            class:
              "p-2 hover:bg-destructive/10 text-destructive rounded-md transition-colors",
            title: "Delete",
          },
          [h(Icon, { name: "lucide:trash-2", class: "w-4 h-4" })],
        ),
      ]);
    },
    enableSorting: false,
  },
];

// Filters configuration
const filters = [
  {
    key: "category",
    label: "Category",
    type: "select" as const,
    options: [
      { label: "Electronics", value: "Electronics" },
      { label: "Accessories", value: "Accessories" },
      { label: "Furniture", value: "Furniture" },
      { label: "Storage", value: "Storage" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select" as const,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Discontinued", value: "discontinued" },
    ],
  },
  {
    key: "inStock",
    label: "In Stock Only",
    type: "checkbox" as const,
    placeholder: "Show only products in stock",
  },
  {
    key: "Price",
    label: "Price Range",
    type: "number-range" as const,
  },
  {
    key: "created",
    label: "Created Date",
    type: "date-range" as const,
  },
];

// Handlers
const handleEdit = (product: Product) => {
  selectedProduct.value = product;
  showEditModal.value = true;
};

const handleDelete = (product: Product) => {
  selectedProduct.value = product;
  showDeleteModal.value = true;
};

const handleCreate = () => {
  selectedProduct.value = null;
  showCreateModal.value = true;
};

const handleBulkDelete = (selectedRows: unknown[]) => {
  if (confirm(`Delete ${selectedRows.length} products?`)) {
    console.log("Deleting:", selectedRows);
    // In real app: call API to delete multiple products
  }
};

const handleRowClick = (product: Product) => {
  handleEdit(product);
};

// CRUD Actions
const handleSaveProduct = async (productData: Partial<Product>) => {
  try {
    if (selectedProduct.value) {
      // Edit existing product
      await $fetch(`/api/products/${selectedProduct.value.id}`, {
        method: "PUT",
        body: productData,
      });
    } else {
      // Create new product
      await $fetch("/api/products/create", {
        method: "POST",
        body: productData,
      });
    }
    await refresh();
  } catch (error) {
    console.error("Error saving product:", error);
  }
};

const handleConfirmDelete = async () => {
  if (selectedProduct.value) {
    try {
      await $fetch(`/api/products/${selectedProduct.value.id}`, {
        method: "DELETE",
      });
      await refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
};

// Handle sorting from TanStack Table
const handleSortingChange = (sorting: SortingState) => {
  if (sorting.length > 0) {
    const sort = sorting[0];
    setSort(sort.id, sort.desc ? "desc" : "asc");
  }
};

// Handle pagination from TanStack Table
const handlePaginationChange = (pagination: PaginationState) => {
  setPage(pagination.pageIndex + 1);
};
</script>

<template>
  <div class="container mx-auto max-w-7xl px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="mb-2 text-3xl font-bold text-foreground">
        Products Management
      </h1>
      <p class="text-muted-foreground">
        Complete data table with CRUD operations, search, filters, and bulk
        actions
      </p>
    </div>

    <!-- Filters and Search -->
    <DpDataTableFilters
      :filters="filters"
      search-placeholder="Search products..."
      @search="setSearch"
      @filter="setFilters"
      @clear="clearFilters"
    >
      <template #actions>
        <DpButton @click="handleCreate">
          <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
          Add Product
        </DpButton>
      </template>
    </DpDataTableFilters>

    <!-- Data Table -->
    <div class="mt-6">
      <DpDataTable
        :columns="columns"
        :data="products"
        :loading="loading"
        :page-count="pageCount"
        :total="total"
        :enable-row-selection="true"
        :manual-pagination="true"
        :manual-sorting="true"
        @row-click="handleRowClick"
        @sorting-change="handleSortingChange"
        @pagination-change="handlePaginationChange"
        @page-size-change="setLimit"
      >
        <template #bulk-actions="{ selectedRows }">
          <DpButton
            variant="danger"
            size="sm"
            @click="handleBulkDelete(selectedRows)"
          >
            <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" />
            Delete Selected
          </DpButton>
        </template>
      </DpDataTable>
    </div>

    <!-- Stats -->
    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="bg-card rounded-lg border border-border p-4">
        <div class="text-sm text-muted-foreground">Total Products</div>
        <div class="text-2xl font-bold text-foreground">{{ total }}</div>
      </div>
      <div class="bg-card rounded-lg border border-border p-4">
        <div class="text-sm text-muted-foreground">In Stock</div>
        <div class="text-2xl font-bold text-green-600">
          {{ products.filter((p) => p.stock > 0).length }}
        </div>
      </div>
      <div class="bg-card rounded-lg border border-border p-4">
        <div class="text-sm text-muted-foreground">Out of Stock</div>
        <div class="text-2xl font-bold text-red-600">
          {{ products.filter((p) => p.stock === 0).length }}
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ProductFormModal
      v-model:open="showCreateModal"
      mode="create"
      @save="handleSaveProduct"
    />

    <ProductFormModal
      v-model:open="showEditModal"
      mode="edit"
      :product="selectedProduct"
      @save="handleSaveProduct"
    />

    <ConfirmDeleteModal
      v-model:open="showDeleteModal"
      title="Delete Product"
      :message="`Are you sure you want to delete &quot;${selectedProduct?.name}&quot;? This action cannot be undone.`"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>
