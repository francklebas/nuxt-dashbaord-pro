<script setup lang="ts">
import { useRouter } from "nuxt/app";
import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "reka-ui";
import { computed } from "vue";

const { user, logout } = useAuth();
const { t } = useI18n();
const router = useRouter();

// Get user initials for avatar fallback
const userInitials = computed(() => {
  if (user.value?.name) {
    return user.value.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  if (user.value?.email) {
    return user.value.email[0].toUpperCase();
  }
  return "U";
});

const handleLogout = async () => {
  await logout();
};

// Handle navigation with force refresh
const handleNavigate = (path: string) => {
  router.push(path);
};
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger
      class="flex items-center gap-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <!-- Avatar -->
      <div
        class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800"
      >
        <img
          v-if="user?.avatar"
          :src="user.avatar"
          :alt="user.name || user?.email || 'User'"
          class="h-full w-full rounded-full object-cover"
        />
        <span v-else>{{ userInitials }}</span>
      </div>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        align="end"
        class="w-56 rounded-md border border-border bg-background p-1 shadow-lg"
      >
        <!-- User info -->
        <DropdownMenuLabel class="px-2 py-1.5">
          <div class="flex flex-col space-y-1">
            <p
              v-if="user?.name"
              class="text-sm font-medium leading-none text-foreground"
            >
              {{ user.name }}
            </p>
            <p class="text-xs leading-none text-muted-foreground">
              {{ user?.email }}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator class="my-1 h-px bg-border" />

        <!-- Menu items -->
        <DropdownMenuItem
          class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-foreground outline-none transition-colors hover:bg-muted focus:bg-muted"
          @click="handleNavigate('/settings')"
        >
          <Icon name="lucide:user" class="h-4 w-4" />
          <span>{{ $t("nav.profile") }}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-foreground outline-none transition-colors hover:bg-muted focus:bg-muted"
          @click="handleNavigate('/settings?tab=preferences')"
        >
          <Icon name="lucide:settings" class="h-4 w-4" />
          <span>{{ $t("nav.settings") }}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-foreground outline-none transition-colors hover:bg-muted focus:bg-muted"
          @click="handleNavigate('/settings?tab=billing')"
        >
          <Icon name="lucide:credit-card" class="h-4 w-4" />
          <span>{{ $t("nav.billing") }}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator class="my-1 h-px bg-border" />

        <DropdownMenuItem
          class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-red-600 outline-none transition-colors hover:bg-red-50 focus:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 dark:focus:bg-red-900/20"
          @click="handleLogout"
        >
          <Icon name="lucide:log-out" class="h-4 w-4" />
          <span>{{ $t("nav.logout") }}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
