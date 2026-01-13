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
      <p>Age: {{ user.age }}</p>
      <p>Gender: {{ user.gender }}</p>
      <p>Birthdate: {{ user.birthDate }}</p>
      <p>Address: {{ user.address.address }}</p>
      <p>City: {{ user.address.city }}</p>
      <p>State: {{ user.address.state }}</p>
      <p>Postal Code: {{ user.address.postalCode }}</p>
      <p>Country: {{ user.address.country }}</p>
      <p>Phone: {{ user.phone }}</p>
      <p>Height: {{ user.height }}</p>
      <p>Weight: {{ user.weight }}</p>
    </div>
  </div>
</template>
