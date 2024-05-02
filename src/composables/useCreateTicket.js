import { readonly, ref } from "vue";
import axios from "axios";
import { apiList } from "@/utils/constants";

export const useCreateTicket = () => {
  const data = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  const createTicket = async (payload) => {
    isLoading.value = true;
    try {
      const response = await axios.post(`${apiList.createTicket}`, payload);
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
    createTicket,
  };
};
