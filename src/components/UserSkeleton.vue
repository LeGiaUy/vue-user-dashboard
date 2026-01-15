<template>
  <div
    class="flex flex-col bg-white border border-gray-200 rounded-2xl p-5 shadow-sm animate-pulse"
  >
    <!-- Header: Avatar + Identity -->
    <div class="flex items-center space-x-4 mb-4">
      <div class="w-14 h-14 rounded-full bg-gray-200 shrink-0"></div>
      <div class="flex-1 space-y-2">
        <div class="h-5 bg-gray-200 rounded w-3/4"></div>
        <div class="h-3 bg-gray-100 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Role Badge -->
    <div class="mb-4">
      <div class="h-6 w-20 bg-gray-100 rounded-full"></div>
    </div>

    <!-- Divider -->
    <div class="h-px bg-gray-100 w-full mb-4"></div>

    <!-- Info Grid -->
    <div class="space-y-3">
      <!-- 4 lines for email, company, dept, location -->
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded bg-gray-100 shrink-0"></div>
        <div class="h-4 bg-gray-100 rounded w-full"></div>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded bg-gray-100 shrink-0"></div>
        <div class="h-4 bg-gray-100 rounded w-2/3"></div>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded bg-gray-100 shrink-0"></div>
        <div class="h-4 bg-gray-100 rounded w-1/2"></div>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded bg-gray-100 shrink-0"></div>
        <div class="h-4 bg-gray-100 rounded w-3/4"></div>
      </div>

      <!-- Meta line -->
      <div class="mt-2 flex items-center gap-2">
        <div class="h-6 w-24 bg-gray-100 rounded-full"></div>
      </div>
    </div>
  </div>
</template>
