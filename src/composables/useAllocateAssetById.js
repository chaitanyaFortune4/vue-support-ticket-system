import { readonly, ref } from "vue";
import axios from "axios";
import { apiList } from "@/utils/constants";

export const useAllocateAssetById = () => {
  const data = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  const allocateAssetById = async (payload) => {
    isLoading.value = true;
    try {
      const response = await axios.post(
        `${apiList.allocateAssetbyId}`,
        payload
      );
      data.value = response.data;
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
    allocateAssetById,
  };
};
