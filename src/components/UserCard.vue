<script setup lang="ts">
import { computed } from "vue";
import type { User } from "@/types/user.type";
import {
  Mail,
  Briefcase,
  Building2,
  MapPin,
  User as UserIcon,
} from "lucide-vue-next";

const props = defineProps<{
  user: User;
}>();

const fullName = computed(
  () => `${props.user.firstName} ${props.user.lastName}`
);

// Function to generate a consistent color based on the role (hashing)
const getRoleBadgeStyle = (role: string) => {
  const colors = [
    "bg-blue-50 text-blue-700 border-blue-200",
    "bg-purple-50 text-purple-700 border-purple-200",
    "bg-emerald-50 text-emerald-700 border-emerald-200",
    "bg-amber-50 text-amber-700 border-amber-200",
    "bg-rose-50 text-rose-700 border-rose-200",
    "bg-indigo-50 text-indigo-700 border-indigo-200",
  ];
  const index = role.length % colors.length;
  return colors[index];
};
</script>

<template>
  <router-link
    :to="`/users/${user.id}`"
    class="group relative flex flex-col bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:border-gray-300 overflow-hidden"
  >
    <!-- Top Gradient Decoration -->
    <div
      class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    ></div>

    <!-- Header: Avatar + Identity -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <img
            :src="user.image"
            :alt="fullName"
            class="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm bg-gray-50 group-hover:scale-105 transition-transform duration-300"
          />
          <div
            class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"
            title="Active"
          ></div>
        </div>
        <div>
          <h3
            class="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors"
          >
            {{ fullName }}
          </h3>
          <p class="text-sm text-gray-500 mt-0.5 font-medium">
            {{ user.company.title }}
          </p>
        </div>
      </div>
    </div>

    <!-- Role Badge -->
    <div class="mb-4">
      <span
        :class="[
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
          getRoleBadgeStyle(user.role),
        ]"
      >
        {{ user.role }}
      </span>
    </div>

    <!-- Divider -->
    <div class="h-px bg-gray-100 w-full mb-4"></div>

    <!-- Info Grid -->
    <div class="grid grid-cols-1 gap-y-2.5 text-sm text-gray-600">
      <!-- Email -->
      <div class="flex items-center gap-2 group/item">
        <div
          class="p-1.5 rounded-md bg-gray-50 text-gray-400 group-hover/item:bg-blue-50 group-hover/item:text-blue-500 transition-colors"
        >
          <Mail :size="14" />
        </div>
        <span class="truncate">{{ user.email }}</span>
      </div>

      <!-- Company -->
      <div class="flex items-center gap-2 group/item">
        <div
          class="p-1.5 rounded-md bg-gray-50 text-gray-400 group-hover/item:bg-purple-50 group-hover/item:text-purple-500 transition-colors"
        >
          <Building2 :size="14" />
        </div>
        <span class="truncate">{{ user.company.name }}</span>
      </div>

      <!-- Department -->
      <div class="flex items-center gap-2 group/item">
        <div
          class="p-1.5 rounded-md bg-gray-50 text-gray-400 group-hover/item:bg-amber-50 group-hover/item:text-amber-500 transition-colors"
        >
          <Briefcase :size="14" />
        </div>
        <span class="truncate">{{ user.company.department }}</span>
      </div>

      <!-- Location (City, Country) -->
      <!-- Note used optional chaining/fallback if address is missing in some data, based on type check it should be there inside company -->
      <div class="flex items-center gap-2 group/item">
        <div
          class="p-1.5 rounded-md bg-gray-50 text-gray-400 group-hover/item:bg-emerald-50 group-hover/item:text-emerald-500 transition-colors"
        >
          <MapPin :size="14" />
        </div>
        <span class="truncate">
          {{ user.company.address.city }}, {{ user.company.address.country }}
        </span>
      </div>

      <!-- Meta (Age, Gender) -->
      <div class="flex items-center gap-2 mt-1">
        <div
          class="flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full"
        >
          <UserIcon :size="12" />
          <span>{{ user.age }} Yrs • {{ user.gender }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>
