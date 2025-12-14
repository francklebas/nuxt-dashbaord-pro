<script setup lang="ts" generic="TData extends Record<string, unknown>">
import {
  type ColumnDef,
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  useVueTable,
} from "@tanstack/vue-table";

interface Props {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  loading?: boolean;
  pageCount?: number;
  total?: number;
  manualPagination?: boolean;
  manualSorting?: boolean;
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  onSortingChange?: (sorting: SortingState) => void;
  onPaginationChange?: (pagination: PaginationState) => void;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  pageCount: 0,
  total: 0,
  manualPagination: false,
  manualSorting: false,
  enableRowSelection: false,
  enableMultiRowSelection: true,
  // Provide explicit defaults for optional callback props to satisfy eslint vue/require-default-prop
  onSortingChange: undefined,
  onPaginationChange: undefined,
  onRowSelectionChange: undefined,
  onPageSizeChange: undefined,
});

const emit = defineEmits<{
  rowClick: [row: TData];
}>();

// State
const sorting = ref<SortingState>([]);
const rowSelection = ref<RowSelectionState>({});
const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
});

// Watch for external changes
watch(sorting, (value) => {
  if (props.onSortingChange) {
    props.onSortingChange(value);
  }
});

watch(
  pagination,
  (value) => {
    if (props.onPaginationChange) {
      props.onPaginationChange(value);
    }
  },
  { deep: true },
);

watch(
  rowSelection,
  (value) => {
    if (props.onRowSelectionChange) {
      props.onRowSelectionChange(value);
    }
  },
  { deep: true },
);

watch(
  () => pagination.value.pageSize,
  (newSize, oldSize) => {
    if (newSize !== oldSize && props.onPageSizeChange) {
      props.onPageSizeChange(newSize);
    }
  },
);

// Create table instance
const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() {
      return sorting.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get pagination() {
      return pagination.value;
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting.value)
        : updaterOrValue;
  },
  onRowSelectionChange: (updaterOrValue) => {
    rowSelection.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(rowSelection.value)
        : updaterOrValue;
  },
  onPaginationChange: (updaterOrValue) => {
    pagination.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(pagination.value)
        : updaterOrValue;
  },
  enableRowSelection: props.enableRowSelection,
  enableMultiRowSelection: props.enableMultiRowSelection,
  manualPagination: props.manualPagination,
  manualSorting: props.manualSorting,
  get pageCount() {
    if (!props.manualPagination) return undefined;
    const provided = props.pageCount ?? 0;
    const fromTotal = props.total
      ? Math.ceil(props.total / pagination.value.pageSize)
      : 0;
    const count = provided > 0 ? provided : fromTotal;
    return count > 0 ? count : 1;
  },
});

const selectedRowsCount = computed(() => {
  return Object.keys(rowSelection.value).length;
});
</script>

<template>
  <div class="w-full space-y-4">
    <!-- Selected Rows Info -->
    <div
      v-if="enableRowSelection && selectedRowsCount > 0"
      class="bg-primary/10 border-primary/20 flex items-center justify-between rounded-md border px-4 py-2"
    >
      <span class="text-sm text-foreground">
        {{ selectedRowsCount }} row(s) selected
      </span>
      <slot
        name="bulk-actions"
        :selected-rows="table.getSelectedRowModel().rows"
      />
    </div>

    <!-- Table Container -->
    <div class="relative overflow-x-auto rounded-lg border border-border">
      <table class="w-full text-left text-sm">
        <!-- Table Header -->
        <thead class="border-b border-border bg-muted/50 text-xs uppercase">
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
              scope="col"
              class="px-6 py-3 text-foreground"
              :class="
                header.column.getCanSort()
                  ? 'cursor-pointer select-none hover:bg-muted/80'
                  : ''
              "
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <div v-if="!header.isPlaceholder" class="flex items-center gap-2">
                <FlexRender
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
                <Icon
                  v-if="header.column.getCanSort()"
                  :name="
                    header.column.getIsSorted() === 'desc'
                      ? 'lucide:arrow-down'
                      : header.column.getIsSorted() === 'asc'
                        ? 'lucide:arrow-up'
                        : 'lucide:arrow-up-down'
                  "
                  class="h-4 w-4"
                  :class="
                    header.column.getIsSorted()
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  "
                />
              </div>
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody v-if="!loading && table.getRowModel().rows.length > 0">
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="border-b border-border bg-background transition-colors hover:bg-muted/30"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-6 py-4 text-foreground"
              :class="
                cell.column.id !== 'actions' && cell.column.id !== 'select'
                  ? 'cursor-pointer'
                  : ''
              "
              @click.capture="
                (event) => {
                  // Skip actions and select columns
                  if (
                    cell.column.id === 'actions' ||
                    cell.column.id === 'select'
                  ) {
                    return;
                  }

                  const target = event.target as HTMLElement;

                  // Check if click is on a button or inside a button
                  if (target.closest('button')) {
                    return;
                  }

                  emit('rowClick', row.original);
                }
              "
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>
        </tbody>

        <!-- Loading State -->
        <tbody v-else-if="loading">
          <tr>
            <td
              :colspan="table.getAllColumns().length"
              class="px-6 py-12 text-center"
            >
              <div
                class="flex items-center justify-center gap-2 text-muted-foreground"
              >
                <Icon name="lucide:loader-2" class="h-5 w-5 animate-spin" />
                <span>Loading...</span>
              </div>
            </td>
          </tr>
        </tbody>

        <!-- Empty State -->
        <tbody v-else>
          <tr>
            <td
              :colspan="table.getAllColumns().length"
              class="px-6 py-12 text-center"
            >
              <div
                class="flex flex-col items-center gap-2 text-muted-foreground"
              >
                <Icon name="lucide:inbox" class="h-12 w-12" />
                <p>No data available</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row"
    >
      <div class="flex items-center gap-4">
        <div class="text-sm text-muted-foreground">
          Showing
          {{
            table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
            1
          }}
          to
          {{
            Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              manualPagination
                ? total
                : table.getFilteredRowModel().rows.length,
            )
          }}
          of
          {{
            manualPagination ? total : table.getFilteredRowModel().rows.length
          }}
          results
        </div>

        <!-- Page Size Selector -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground">Show</span>
          <select
            v-model="pagination.pageSize"
            class="focus:ring-primary rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2"
          >
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="30">30</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
          <span class="text-sm text-muted-foreground">per page</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- First Page -->
        <DpButton
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          title="First page"
          @click="table.setPageIndex(0)"
        >
          <Icon name="lucide:chevrons-left" class="h-4 w-4" />
        </DpButton>

        <!-- Previous Page -->
        <DpButton
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          title="Previous page"
          @click="table.previousPage()"
        >
          <Icon name="lucide:chevron-left" class="h-4 w-4" />
        </DpButton>

        <!-- Page Numbers -->
        <div class="flex items-center gap-1">
          <span class="px-2 text-sm text-foreground">
            Page {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </span>
        </div>

        <!-- Next Page -->
        <DpButton
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          title="Next page"
          @click="table.nextPage()"
        >
          <Icon name="lucide:chevron-right" class="h-4 w-4" />
        </DpButton>

        <!-- Last Page -->
        <DpButton
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          title="Last page"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <Icon name="lucide:chevrons-right" class="h-4 w-4" />
        </DpButton>
      </div>
    </div>
  </div>
</template>
