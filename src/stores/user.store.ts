import { defineStore } from "pinia";
import { getUsers } from "@/api/user.api";
import type { User } from "@/types/user.type";

// export store
export const useUserStore = defineStore("user", {
  // state
  state: () => ({
    // danh sách user
    users: [] as User[],
    // loading
    loading: false,
    // trang hiện tại
    page: 1,
    // số lượng user mỗi trang
    limit: 12,
    // tổng số user
    total: 0,
  }),

  actions: {
    // fetch user (pagination)
    async fetchUsers(params: { page?: number; limit?: number } = {}) {
      /** nếu có params.page thì lấy params.page, không có thì lấy this.page */
      const targetPage = params.page || this.page;
      // đặt loading = true để hiện skeleton
      this.loading = true;

      // gọi api và đưa data vào store
      try {
        /** tính skip (bỏ qua bao nhiêu user) */
        const skip = (targetPage - 1) * this.limit;

        /** gọi api */
        const res = await getUsers({
          limit: this.limit,
          skip,
        });

        // gán data
        // lưu danh sách user vào store
        this.users = res.data.users;
        // lưu tổng số user
        this.total = res.data.total;
        // lưu trang hiện tại
        this.page = targetPage;
      } finally {
        // tắt loading
        this.loading = false;
      }
    },

    /** thêm user vào store */
    addUserToStore(user: User) {
      /** tìm user có tồn tại trong store không */
      const exists = this.users.some((u) => u.id === user.id);
      // nếu không tồn tại thì thêm vào
      if (!exists) {
        // thêm user vào cuối mảng
        this.users.push(user);
      }
    },
  },
});
