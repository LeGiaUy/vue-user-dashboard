<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getUserById } from "@/api/user.api";
import UserDetailSkeleton from "@/components/UserDetailSkeleton.vue";

const route = useRoute();
const user = ref<any>(null);

onMounted(async () => {
  const id = Number(route.params.id); // lấy params
  const res = await getUserById(id);
  user.value = res.data;
});
</script>

<template>
  <div class="p-6">
    <UserDetailSkeleton v-if="!user" />

    <div v-else>
      <img :src="user.image" class="w-32 rounded-full mb-4" />
      <h1 class="text-xl font-bold">
        {{ user.firstName }} {{ user.lastName }}
      </h1>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>
