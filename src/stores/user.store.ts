import { defineStore } from "pinia";
import { getUsers } from "@/api/user.api";
import type { User } from "@/types/user.type";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [] as User[],
    loading: false,
    loadingMore: false,
    page: 1,
    limit: 10,
    total: 0,
  }),

  actions: {
    // fetch user (pagination)
    async fetchUsers() {
      this.loading = true;

      try {
        const skip = (this.page - 1) * this.limit;

        const res = await getUsers({
          limit: this.limit,
          skip,
        });

        // gán data
        this.users = res.data.users;
        this.total = res.data.total;
      } finally {
        this.loading = false;
      }
    },

    // infinite scroll
    async loadMore() {
      if (this.users.length >= this.total) return;
      if (this.loading || this.loadingMore) return;

      this.loadingMore = true;

      try {
        this.page++;

        const skip = (this.page - 1) * this.limit;

        const res = await getUsers({
          limit: this.limit,
          skip,
        });

        // nối mảng
        this.users.push(...res.data.users);
      } finally {
        this.loadingMore = false;
      }
    },
  },
});
