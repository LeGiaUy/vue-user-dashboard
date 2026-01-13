<script setup lang="ts">
import type { User } from "@/types/user.type";

// nhận props
defineProps<{
  user: User;
}>();
</script>

<template>
  <router-link
    :to="`/users/${user.id}`"
    class="block p-4 border rounded hover:bg-gray-50"
  >
    <img :src="user.image" class="w-16 h-16 rounded-full mb-2" />
    <div class="font-semibold">{{ user.firstName }} {{ user.lastName }}</div>
    <div class="text-sm text-gray-500">
      {{ user.email }}
    </div>
  </router-link>
</template>
