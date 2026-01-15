<script setup lang="ts">
import { computed } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

// 1. Định nghĩa Props chặt chẽ
interface Props {
  modelValue: number; // Trang hiện tại (v-model)
  total: number; // Tổng số items
  limit: number; // Số item mỗi trang
}

const props = defineProps<Props>();

// 2. Định nghĩa Events
const emit = defineEmits<{
  (e: "update:modelValue", value: number): void; // Để support v-model
  (e: "change", page: number): void; // Sự kiện báo ra ngoài
}>();

// 3. Computed Logic
const totalPages = computed(() => Math.ceil(props.total / props.limit));

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const total = totalPages.value;
  const current = props.modelValue;

  // Case 1: Ít trang -> Hiện hết
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  // Luôn hiện trang đầu
  pages.push(1);

  // Case 2: Ở đầu (1 2 3 4 5 ...)
  if (current <= 4) {
    for (let i = 2; i <= 5; i++) pages.push(i);
    pages.push("...");
  }
  // Case 3: Ở cuối (... 16 17 18 19 20)
  else if (current >= total - 3) {
    pages.push("...");
    for (let i = total - 4; i < total; i++) pages.push(i);
  }
  // Case 4: Ở giữa ( ... 4 5 6 ... )
  else {
    pages.push("...");
    pages.push(current - 1);
    pages.push(current);
    pages.push(current + 1);
    pages.push("...");
  }

  // Luôn hiện trang cuối
  pages.push(total);
  return pages;
});

// 4. Action Handlers
const onPageChange = (page: number) => {
  if (page < 1 || page > totalPages.value || page === props.modelValue) return;

  emit("update:modelValue", page);
  emit("change", page);
};
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 bg-white"
  >
    <!-- Mobile: Simple View -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="onPageChange(modelValue - 1)"
        :disabled="modelValue === 1"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        Previous
      </button>
      <button
        @click="onPageChange(modelValue + 1)"
        :disabled="modelValue === totalPages"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      >
        Next
      </button>
    </div>

    <!-- Desktop: Full View -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ (modelValue - 1) * limit + 1 }}</span>
          to
          <span class="font-medium">{{
            Math.min(modelValue * limit, total)
          }}</span>
          of
          <span class="font-medium">{{ total }}</span>
          results
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <!-- Prev Button -->
          <button
            @click="onPageChange(modelValue - 1)"
            :disabled="modelValue === 1"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeft class="h-5 w-5" />
          </button>

          <!-- Page Numbers -->
          <template v-for="(page, index) in visiblePages" :key="index">
            <!-- Dấu ... -->
            <span
              v-if="page === '...'"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
            >
              ...
            </span>

            <!-- Số trang -->
            <button
              v-else
              @click="onPageChange(page as number)"
              :class="[
                page === modelValue
                  ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
              ]"
            >
              {{ page }}
            </button>
          </template>

          <!-- Next Button -->
          <button
            @click="onPageChange(modelValue + 1)"
            :disabled="modelValue === totalPages"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
          >
            <span class="sr-only">Next</span>
            <ChevronRight class="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
