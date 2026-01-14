<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getUserById } from "@/api/user.api";
import UserDetailSkeleton from "@/components/UserDetailSkeleton.vue";
import type { UserDetail } from "@/types/user.type";
import { useUserStore } from "@/stores/user.store";

const route = useRoute();
const user = ref<UserDetail | null>(null);
const store = useUserStore();

onMounted(async () => {
  /** lấy id từ query string */
  const id = Number(route.params.id);
  /** tìm kiếm user trong store */
  const cachedUser = store.users.find((u) => u.id === id);

  // nếu tìm thấy user trong store thì lấy ra dùng luôn
  if (cachedUser) {
    // gán user vào state
    user.value = cachedUser as UserDetail;

    // nếu không thấy user trong store thì gọi api
  } else {
    // gọi api lấy user
    const res = await getUserById(id);
    // gán user vào state
    user.value = res.data;
    // lưu user vào store
    store.addUserToStore(res.data);
  }
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
      <p>Height: {{ user.height }}</p>
      <p>Weight: {{ user.weight }}</p>

      <!-- Address -->
      <p>Address: {{ user.address.address }}</p>
      <p>City: {{ user.address.city }}</p>
      <p>State: {{ user.address.state }}</p>
      <p>Postal Code: {{ user.address.postalCode }}</p>
      <p>Country: {{ user.address.country }}</p>

      <!-- Contact -->
      <p>Phone: {{ user.phone }}</p>

      <!-- Company -->
      <p>Company: {{ user.company.name }}</p>
      <p>Department: {{ user.company.department }}</p>
      <p>Title: {{ user.company.title }}</p>
      <p>Address: {{ user.company.address.address }}</p>
      <p>City: {{ user.company.address.city }}</p>
      <p>State: {{ user.company.address.state }}</p>
      <p>Postal Code: {{ user.company.address.postalCode }}</p>
      <p>Country: {{ user.company.address.country }}</p>

      <!-- Role -->
      <p>Role: {{ user.role }}</p>
    </div>
  </div>
</template>
