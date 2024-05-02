<script setup>
import {
  allocateAssetbyId,
  getAllAssets,
  getAllUnallocatedAssets,
  getUserById,
} from "@/composables/ticketApis";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, ref, toValue, unref, watch } from "vue";
import Multiselect from "vue-multiselect";

import { useRoute, useRouter } from "vue-router";

let router = useRouter();
let route = useRoute();
const { id } = route.params;

const formValues = reactive({
  id: "",
  userId: "",
  name: "",
  assets: [],
});

const getUserDetails = async () => {
  try {
    const getUserDetailsRes = await getUserById(id);
    console.log("getUserDetailsRes", getUserDetailsRes);
    formValues.id = getUserDetailsRes.data.data.id;
    formValues.name = getUserDetailsRes.data.data.name;
    formValues.userId = getUserDetailsRes.data.data.userId;
    formValues.assets = getUserDetailsRes.data.data.assets;
  } catch (error) {
    console.log("error", error);
  } finally {
  }
};
getUserDetails();

const options = ref([]);
const heading = "User Details";
const isBtnLoading = ref(false);
const isLoading = ref(false);
const error = ref(null);

async function fetchAllUnallocatedAssets() {
  isLoading.value = true;
  try {
    const getAllUnallocatedAssetsRes = await getAllUnallocatedAssets();
    console.log("getAllUnallocatedAssetsRes", getAllUnallocatedAssetsRes);
    if (getAllUnallocatedAssetsRes.data.success) {
      options.value = getAllUnallocatedAssetsRes.data.data;
    } else {
      error.value =
        getAllUnallocatedAssetsRes.data.message ||
        getAllUnallocatedAssetsRes.data.error ||
        "Something went wrong, Please try again later";
    }
  } catch (error) {
    error.value = error.message || "Error fetching user data";
  } finally {
    isLoading.value = false;
  }
}
fetchAllUnallocatedAssets();

async function onSubmitHandler(e) {
  e.preventDefault();
  isBtnLoading.value = true;
  try {
    const selectedV = formValues.assets;
    const payload = {
      userId: formValues.userId,
      assetIds: selectedV.map((asset) => asset.id),
    };
    console.log("Payload:", payload);
    const allocateAssetByIdRes = await allocateAssetbyId(payload);
    console.log("allocateAssetByIdRes", allocateAssetByIdRes);
  } catch (error) {
    console.log("error", error);
  } finally {
    isBtnLoading.value = false;
  }
}
</script>

<template>
  <div v-if="isLoading">
    <div class="d-flex justify-content-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div v-else-if="error">{{ error }}</div>

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
        <button type="submit" class="btn btn-primary" :disabled="isBtnLoading">
          <span
            v-if="isBtnLoading"
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
