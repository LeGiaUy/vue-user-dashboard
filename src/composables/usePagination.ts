import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// định nghĩa kiểu cho callback function nhận vào page và limit nhưng không trả về gì cả
type FetchCallback = (page: number, limit: number) => Promise<void> | void;

/**
 *
 * @param fetchDataCallBack - callback function nhận vào page và limit nhưng không trả về gì cả
 * @param defaultLimit - số lượng user mỗi trang
 */
export function usePagination(
  fetchDataCallBack: FetchCallback,
  defaultLimit = 12
) {
  // định nghĩa route và router
  const route = useRoute();
  const router = useRouter();

  // state
  const currentPage = ref(1);
  const limit = ref(defaultLimit);

  // function get page from url
  const getPageFromUrl = () => {
    // lấy page từ url
    const page = Number(route.query.page);
    // nếu page không phải là số hoặc nhỏ hơn 1 thì trả về 1
    return Number.isNaN(page) || page < 1 ? 1 : page;
  };

  // function change page
  const changePage = (page: number) => {
    // thay đổi page trong url
    router.push({
      // giữ nguyên các query params khác
      query: {
        ...route.query,
        // thay đổi page
        page: page.toString(),
      },
    });

    // cuộn lên đầu trang
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // function sync page with url
  const syncWithUrl = () => {
    // lấy page từ url
    const page = getPageFromUrl();
    // thay đổi page
    currentPage.value = page;

    // gọi callback function
    fetchDataCallBack(page, limit.value);
  };

  // khi component được mount thì gọi syncWithUrl
  onMounted(() => {
    syncWithUrl();
  });

  // khi route.query.page thay đổi thì gọi syncWithUrl
  watch(
    () => route.query.page,
    () => {
      syncWithUrl();
    }
  );

  return {
    currentPage,
    limit,
    changePage,
  };
}
