<script setup lang="ts">
import DpTabs from "@ui/components/DpTabs.vue";

definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "Settings - Dashboard Pro",
  meta: [
    {
      name: "description",
      content: "Manage your account settings, preferences, billing, and team.",
    },
  ],
});

const { t, locale, setLocale } = useI18n();
const route = useRoute();
const router = useRouter();
const { user } = useAuth();

// Get initial tab from query param
const activeTabValue = ref((route.query.tab as string) || "profile");

// Define tabs
const tabs = computed(() => [
  {
    id: "profile",
    label: t("settings.tabs.profile"),
    icon: "lucide:user",
  },
  {
    id: "account",
    label: t("settings.tabs.account"),
    icon: "lucide:shield",
  },
  {
    id: "preferences",
    label: t("settings.tabs.preferences"),
    icon: "lucide:settings",
  },
  {
    id: "billing",
    label: t("settings.tabs.billing"),
    icon: "lucide:credit-card",
  },
  {
    id: "team",
    label: t("settings.tabs.team"),
    icon: "lucide:users",
  },
]);

// Update URL when tab changes
const handleTabChange = (value: string) => {
  activeTabValue.value = value;
  router.push({ query: { tab: value } });
};

// Profile form state
const profileForm = ref({
  name: user.value?.name || "Demo User",
  bio: "",
  avatar: user.value?.avatar || "",
});

const profileSaving = ref(false);
const profileSuccess = ref(false);
const avatarError = ref("");

// File input ref
const fileInputRef = ref<HTMLInputElement | null>(null);

// Trigger file input click
const triggerFileUpload = () => {
  fileInputRef.value?.click();
};

// Handle file selection
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    avatarError.value = "Please upload a valid image file (JPG, PNG, GIF, or WebP)";
    return;
  }

  // Validate file size (2MB max)
  const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  if (file.size > maxSize) {
    avatarError.value = "Image size must be less than 2MB";
    return;
  }

  // Clear any previous errors
  avatarError.value = "";

  // Create preview URL
  const reader = new FileReader();
  reader.onload = (e) => {
    profileForm.value.avatar = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const saveProfile = async () => {
  profileSaving.value = true;
  profileSuccess.value = false;

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  profileSaving.value = false;
  profileSuccess.value = true;

  setTimeout(() => {
    profileSuccess.value = false;
  }, 3000);
};

// Account form state
const passwordForm = ref({
  current: "",
  new: "",
  confirm: "",
});

const passwordSaving = ref(false);
const passwordSuccess = ref(false);
const passwordError = ref("");

const updatePassword = async () => {
  passwordError.value = "";

  if (passwordForm.value.new !== passwordForm.value.confirm) {
    passwordError.value = t("auth.validation.passwordMismatch");
    return;
  }

  if (passwordForm.value.new.length < 8) {
    passwordError.value = t("auth.validation.passwordTooShort");
    return;
  }

  passwordSaving.value = true;
  passwordSuccess.value = false;

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  passwordSaving.value = false;
  passwordSuccess.value = true;

  // Clear form
  passwordForm.value = { current: "", new: "", confirm: "" };

  setTimeout(() => {
    passwordSuccess.value = false;
  }, 3000);
};

// Preferences form state
const preferencesForm = ref({
  language: locale.value,
  timezone: "UTC",
  emailUpdates: true,
  emailMarketing: true,
});

const preferencesSaving = ref(false);
const preferencesSuccess = ref(false);

const savePreferences = async () => {
  preferencesSaving.value = true;
  preferencesSuccess.value = false;

  // Update language if changed
  if (preferencesForm.value.language !== locale.value) {
    setLocale(preferencesForm.value.language);
  }

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  preferencesSaving.value = false;
  preferencesSuccess.value = true;

  setTimeout(() => {
    preferencesSuccess.value = false;
  }, 3000);
};

// Team members state
const teamMembers = ref([
  { id: 1, name: "Demo User", email: "demo@example.com", role: "admin" },
  { id: 2, name: "User 1", email: "user1@example.com", role: "member" },
  { id: 3, name: "User 2", email: "user2@example.com", role: "viewer" },
]);

const removeMember = (id: number) => {
  if (confirm(t("settings.team.confirmRemove"))) {
    teamMembers.value = teamMembers.value.filter(m => m.id !== id);
  }
};

const invitingMember = ref(false);

const inviteMember = async () => {
  invitingMember.value = true;
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  invitingMember.value = false;
  alert(t("settings.team.inviteSuccess"));
};
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h1 class="text-3xl font-bold text-foreground">
          {{ $t("settings.title") }}
        </h1>
        <p class="mt-2 text-muted-foreground">
          {{ $t("settings.description") }}
        </p>
      </div>

      <!-- Tabs -->
      <DpTabs
        v-model="activeTabValue"
        :tabs="tabs"
        @update:model-value="handleTabChange"
      >
        <!-- Profile Tab -->
        <template #profile>
          <form @submit.prevent="saveProfile" class="space-y-6">
            <div
              class="bg-background border border-border rounded-lg p-6 space-y-6"
            >
              <div>
                <h2 class="text-xl font-semibold text-foreground">
                  {{ $t("settings.profile.title") }}
                </h2>
                <p class="text-sm text-muted-foreground mt-1">
                  {{ $t("settings.profile.description") }}
                </p>
              </div>

              <!-- Success Message -->
              <div
                v-if="profileSuccess"
                class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md"
              >
                <p class="text-sm text-green-800 dark:text-green-200">
                  {{ $t("settings.profile.saved") }}
                </p>
              </div>

              <!-- Photo Upload -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-foreground">
                  {{ $t("settings.profile.photo") }}
                </label>
                <div class="flex items-center gap-4">
                  <!-- Avatar display -->
                  <div
                    class="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 flex items-center justify-center text-2xl font-semibold overflow-hidden"
                  >
                    <img
                      v-if="profileForm.avatar"
                      :src="profileForm.avatar"
                      :alt="profileForm.name"
                      class="w-full h-full object-cover"
                    />
                    <span v-else>
                      {{ profileForm.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) }}
                    </span>
                  </div>
                  <div class="space-y-2">
                    <!-- Hidden file input -->
                    <input
                      ref="fileInputRef"
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      class="hidden"
                      @change="handleFileChange"
                    />
                    <!-- Upload button -->
                    <button
                      type="button"
                      @click="triggerFileUpload"
                      class="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                    >
                      {{ $t("settings.profile.uploadPhoto") }}
                    </button>
                    <p class="text-xs text-muted-foreground">
                      {{ $t("settings.profile.photoHint") }}
                    </p>
                    <!-- Error message -->
                    <p v-if="avatarError" class="text-xs text-red-600 dark:text-red-400">
                      {{ avatarError }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Name -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-foreground">
                  {{ $t("settings.profile.name") }}
                </label>
                <input
                  v-model="profileForm.name"
                  type="text"
                  class="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-foreground">
                  {{ $t("settings.profile.email") }}
                </label>
                <input
                  type="email"
                  :value="user?.email"
                  disabled
                  class="w-full px-4 py-2 border border-border rounded-md bg-muted text-muted-foreground cursor-not-allowed"
                />
                <p class="text-xs text-muted-foreground">
                  {{ $t("settings.profile.emailHint") }}
                </p>
              </div>

              <!-- Bio -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-foreground">
                  {{ $t("settings.profile.bio") }}
                </label>
                <textarea
                  v-model="profileForm.bio"
                  rows="4"
                  maxlength="160"
                  :placeholder="$t('settings.profile.bioPlaceholder')"
                  class="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                ></textarea>
                <p class="text-xs text-muted-foreground">
                  {{ profileForm.bio.length }}/160 - {{ $t("settings.profile.bioHint") }}
                </p>
              </div>

              <!-- Save Button -->
              <div class="flex justify-end pt-4 border-t border-border">
                <button
                  type="submit"
                  :disabled="profileSaving"
                  class="px-6 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ profileSaving ? $t("settings.saving") : $t("settings.save") }}
                </button>
              </div>
            </div>
          </form>
        </template>

        <!-- Account Tab -->
        <template #account>
          <div class="space-y-6">
            <!-- Change Password -->
            <form @submit.prevent="updatePassword">
              <div
                class="bg-background border border-border rounded-lg p-6 space-y-6"
              >
                <div>
                  <h2 class="text-xl font-semibold text-foreground">
                    {{ $t("settings.account.password.title") }}
                  </h2>
                  <p class="text-sm text-muted-foreground mt-1">
                    {{ $t("settings.account.password.description") }}
                  </p>
                </div>

                <!-- Success/Error Messages -->
                <div
                  v-if="passwordSuccess"
                  class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md"
                >
                  <p class="text-sm text-green-800 dark:text-green-200">
                    {{ $t("settings.account.password.updated") }}
                  </p>
                </div>
                <div
                  v-if="passwordError"
                  class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
                >
                  <p class="text-sm text-red-800 dark:text-red-200">
                    {{ passwordError }}
                  </p>
                </div>

                <div class="space-y-4">
                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-foreground">
                      {{ $t("settings.account.password.current") }}
                    </label>
                    <input
                      v-model="passwordForm.current"
                      type="password"
                      required
                      class="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-foreground">
                      {{ $t("settings.account.password.new") }}
                    </label>
                    <input
                      v-model="passwordForm.new"
                      type="password"
                      required
                      minlength="8"
                      class="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-sm font-medium text-foreground">
                      {{ $t("settings.account.password.confirm") }}
                    </label>
                    <input
                      v-model="passwordForm.confirm"
                      type="password"
                      required
                      class="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                </div>

                <div class="flex justify-end pt-4 border-t border-border">
                  <button
                    type="submit"
                    :disabled="passwordSaving"
                    class="px-6 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ passwordSaving ? $t("settings.saving") : $t("settings.account.password.update") }}
                  </button>
                </div>
              </div>
            </form>

            <!-- Two-Factor Authentication -->
            <div
              class="bg-background border border-border rounded-lg p-6 space-y-6"
            >
              <div>
                <h2 class="text-xl font-semibold text-foreground">
                  {{ $t("settings.account.twoFactor.title") }}
                </h2>
                <p class="text-sm text-muted-foreground mt-1">
                  {{ $t("settings.account.twoFactor.description") }}
                </p>
              </div>

              <div
                class="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div class="space-y-1">
                  <p class="text-sm font-medium text-foreground">
                    {{ $t("settings.account.twoFactor.status") }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ $t("settings.account.twoFactor.statusDesc") }}
                  </p>
                </div>
                <button
                  type="button"
                  class="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  {{ $t("settings.account.twoFactor.enable") }}
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- Preferences Tab -->
        <template #preferences>
          <form @submit.prevent="savePreferences" class="space-y-6">
            <div
              class="bg-background border border-border rounded-lg p-6 space-y-6"
            >
              <div>
                <h2 class="text-xl font-semibold text-foreground">
                  {{ $t("settings.preferences.title") }}
                </h2>
                <p class="text-sm text-muted-foreground mt-1">
                  {{ $t("settings.preferences.description") }}
                </p>
              </div>

              <!-- Success Message -->
              <div
                v-if="preferencesSuccess"
                class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md"
              >
                <p class="text-sm text-green-800 dark:text-green-200">
                  {{ $t("settings.preferences.saved") }}
                </p>
              </div>

              <!-- Language -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-foreground">
                  {{ $t("settings.preferences.language") }}
                </label>
                <select
                  v-model="preferencesForm.language"
                  class="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              <!-- Timezone -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-foreground">
                  {{ $t("settings.preferences.timezone") }}
                </label>
                <select
                  v-model="preferencesForm.timezone"
                  class="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="UTC">UTC (GMT+0)</option>
                  <option value="America/New_York">
                    Eastern Time (GMT-5)
                  </option>
                  <option value="Europe/Paris">Paris (GMT+1)</option>
                  <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                </select>
              </div>

              <!-- Email Notifications -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-foreground">
                  {{ $t("settings.preferences.notifications.email") }}
                </label>
                <div class="space-y-3">
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      v-model="preferencesForm.emailUpdates"
                      type="checkbox"
                      class="w-4 h-4 rounded border-border text-primary-600 focus:ring-2 focus:ring-ring focus:ring-offset-0"
                    />
                    <div>
                      <p class="text-sm font-medium text-foreground">
                        {{ $t("settings.preferences.notifications.updates") }}
                      </p>
                      <p class="text-xs text-muted-foreground">
                        {{
                          $t("settings.preferences.notifications.updatesDesc")
                        }}
                      </p>
                    </div>
                  </label>
                  <label class="flex items-center gap-3 cursor-pointer">
                    <input
                      v-model="preferencesForm.emailMarketing"
                      type="checkbox"
                      class="w-4 h-4 rounded border-border text-primary-600 focus:ring-2 focus:ring-ring focus:ring-offset-0"
                    />
                    <div>
                      <p class="text-sm font-medium text-foreground">
                        {{
                          $t("settings.preferences.notifications.marketing")
                        }}
                      </p>
                      <p class="text-xs text-muted-foreground">
                        {{
                          $t(
                            "settings.preferences.notifications.marketingDesc",
                          )
                        }}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div class="flex justify-end pt-4 border-t border-border">
                <button
                  type="submit"
                  :disabled="preferencesSaving"
                  class="px-6 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ preferencesSaving ? $t("settings.saving") : $t("settings.save") }}
                </button>
              </div>
            </div>
          </form>
        </template>

        <!-- Billing Tab -->
        <template #billing>
          <div class="space-y-6">
            <!-- Current Plan -->
            <div
              class="bg-background border border-border rounded-lg p-6 space-y-6"
            >
              <div>
                <h2 class="text-xl font-semibold text-foreground">
                  {{ $t("settings.billing.plan.title") }}
                </h2>
                <p class="text-sm text-muted-foreground mt-1">
                  {{ $t("settings.billing.plan.description") }}
                </p>
              </div>

              <div class="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div class="flex items-start justify-between">
                  <div class="space-y-1">
                    <p class="text-lg font-semibold text-foreground">
                      {{ $t("settings.billing.plan.current") }}
                    </p>
                    <p class="text-sm text-muted-foreground">
                      {{ $t("settings.billing.plan.currentDesc") }}
                    </p>
                  </div>
                  <NuxtLink
                    to="/pricing"
                    class="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    {{ $t("settings.billing.plan.upgrade") }}
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div
              class="bg-background border border-border rounded-lg p-6 space-y-6"
            >
              <div>
                <h2 class="text-xl font-semibold text-foreground">
                  {{ $t("settings.billing.payment.title") }}
                </h2>
                <p class="text-sm text-muted-foreground mt-1">
                  {{ $t("settings.billing.payment.description") }}
                </p>
              </div>

              <div
                class="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-8 flex items-center justify-center bg-muted rounded border border-border"
                  >
                    <Icon name="lucide:credit-card" class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-foreground">
                      •••• •••• •••• 4242
                    </p>
                    <p class="text-xs text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
                <button
                  type="button"
                  class="px-4 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {{ $t("settings.billing.payment.update") }}
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- Team Tab -->
        <template #team>
          <div class="space-y-6">
            <div
              class="bg-background border border-border rounded-lg p-6 space-y-6"
            >
              <div class="flex items-start justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-foreground">
                    {{ $t("settings.team.title") }}
                  </h2>
                  <p class="text-sm text-muted-foreground mt-1">
                    {{ $t("settings.team.description") }}
                  </p>
                </div>
                <button
                  type="button"
                  :disabled="invitingMember"
                  @click="inviteMember"
                  class="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {{ invitingMember ? $t("settings.saving") : $t("settings.team.invite") }}
                </button>
              </div>

              <!-- Team Members List -->
              <div class="space-y-3">
                <div
                  v-for="member in teamMembers"
                  :key="member.id"
                  class="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 flex items-center justify-center text-sm font-semibold"
                    >
                      {{ member.name.split(' ').map(n => n[0]).join('').toUpperCase() }}
                    </div>
                    <div>
                      <p class="text-sm font-medium text-foreground">
                        {{ member.name }}
                      </p>
                      <p class="text-xs text-muted-foreground">
                        {{ member.email }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <select
                      v-model="member.role"
                      class="px-3 py-1.5 border border-border rounded-md text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                      <option value="viewer">Viewer</option>
                    </select>
                    <button
                      type="button"
                      @click="removeMember(member.id)"
                      :disabled="member.id === 1"
                      class="p-2 text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="lucide:trash-2" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DpTabs>
    </div>
  </main>
</template>
