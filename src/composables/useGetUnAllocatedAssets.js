import { readonly, ref } from "vue";
import axios from "axios";
import { apiList } from "@/utils/constants";

export const useGetUnAllocatedAssets = () => {
  const data = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  const getUnAllocatedAssets = async (payload) => {
    isLoading.value = true;
    try {
      const response = await axios.get(`${apiList.getAllUnallocatedAssets}`);
      data.value = response.data.data;
    } catch (err) {
      console.log("error", error);
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data,
    isLoading,
    error,
    getUnAllocatedAssets,
  };
};
