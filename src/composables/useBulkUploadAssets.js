import { readonly, ref } from "vue";
import axios from "axios";
import { apiList } from "@/utils/constants";

export const useBulkUploadAssets = () => {
  const data = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  const bulkUploadAssets = async (payload) => {
    isLoading.value = true;
    try {
      const response = await axios.post(
        `${apiList.bulkAllocateAsset}`,
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
    bulkUploadAssets,
  };
};
