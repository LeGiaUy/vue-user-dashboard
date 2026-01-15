<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user.store";
import UserCard from "@/components/UserCard.vue";
import UserSkeleton from "@/components/UserSkeleton.vue";

const store = useUserStore();

onMounted(() => {
  store.fetchUsers();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50/50">
    <div class="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
      <!-- Title Section (Optional but looks professional) -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Team Members</h1>
        <p class="text-sm text-gray-500 mt-1">
          Manage your team members and their account permissions here.
        </p>
      </div>

      <!-- Grid Layout -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 lg:gap-6"
      >
        <!-- skeleton -->
        <template v-if="store.loading">
          <UserSkeleton v-for="i in 12" :key="i" />
        </template>

        <!-- user list -->
        <template v-else>
          <UserCard v-for="user in store.users" :key="user.id" :user="user" />
        </template>
      </div>
    </div>
  </div>
</template>
