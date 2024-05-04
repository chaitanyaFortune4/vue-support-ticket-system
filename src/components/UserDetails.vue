<script setup>
import { useAllocateAssetById } from "@/composables/useAllocateAssetById";
import { useGetUnAllocatedAssets } from "@/composables/useGetUnAllocatedAssets";
import { useGetUserDetails } from "@/composables/useGetUserDetails";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Multiselect from "vue-multiselect";
import { toast } from "vue3-toastify";

let router = useRouter();
let route = useRoute();
const { id } = route.params;

const heading = "User Details";
const isBtnLoading = ref(false);
const options = ref([]);

const formValues = reactive({
  id: "",
  userId: "",
  name: "",
  assets: [],
});

const {
  data: userData,
  isLoading: isUserLoading,
  error: userError,
  getUserDetails,
} = useGetUserDetails();

const {
  data: assetsData,
  isLoading: isAssetsLoading,
  error: assetsError,
  getUnAllocatedAssets,
} = useGetUnAllocatedAssets();

const {
  data: allocationData,
  isLoading: isAllocationLoading,
  error: allocationError,
  allocateAssetById,
} = useAllocateAssetById();

getUserDetails(id).then(() => {
  formValues.id = userData.value.id;
  formValues.name = userData.value.name;
  formValues.userId = userData.value.userId;
  formValues.assets = userData.value.assets;
});

getUnAllocatedAssets().then(() => {
  options.value = assetsData.value;
});

const onSubmitHandler = async (e) => {
  e.preventDefault();

  const selectedV = formValues.assets;
  const payload = {
    userId: formValues.userId,
    assetIds: selectedV.map((asset) => asset.id),
  };

  allocateAssetById(payload).then(() => {
    console.log("allocateAssetById", allocationData.value);

    if (allocationData.value.success) {
      toast.success(`${allocationData.value.message}`);
    }
  });
};
</script>

<template>
  <div v-if="isUserLoading || isAssetsLoading">
    <div class="d-flex justify-content-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div v-else-if="userError || assetsError">{{ error }}</div>

  <div v-else>
    <div class="container d-flex flex-column align-items-center row-gap-3 mb-5">
      <div>
        <h1>{{ heading }}</h1>
      </div>
      <form
        class="p-3 w-100 d-flex flex-column row-gap-2 shadow-lg"
        v-on:submit="onSubmitHandler"
      >
        <div>
          <label class="form-label" for="id">Id:</label>
          <input
            class="form-control"
            type="text"
            id="id"
            name="id"
            v-model="formValues.id"
            v-bind:disabled="true"
          />
        </div>

        <div>
          <label class="form-label" for="userId">UserId:</label>
          <input
            class="form-control"
            id="userId"
            name="userId"
            v-model="formValues.userId"
            v-bind:disabled="true"
          />
        </div>

        <div>
          <label class="form-label" for="userId">Add assets:</label>
          <Multiselect
            v-model="formValues.assets"
            tag-placeholder="Add this as new tag"
            placeholder="Search & add asset"
            label="assetId"
            track-by="id"
            :options="options"
            :multiple="true"
            :close-on-select="false"
            :taggable="false"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isAllocationLoading"
        >
          <span
            v-if="isAllocationLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
.customStatus {
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
