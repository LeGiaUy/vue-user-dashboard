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
  <div class="h-screen overflow-y-auto p-6 grid grid-cols-1 gap-4">
    <!-- skeleton -->
    <UserSkeleton v-if="store.loading" v-for="i in 5" :key="i" />

    <!-- user list -->
    <UserCard v-for="user in store.users" :key="user.id" :user="user" />
  </div>
</template>
