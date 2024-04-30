<script setup>
import { getAllAssets } from "@/composables/ticketApis";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, ref, watch } from "vue";
import Multiselect from "vue-multiselect";

import { useRoute, useRouter } from "vue-router";

const value = ref([]);
const options = ref([]);

const addTag = (newTag) => {};

let router = useRouter();
let route = useRoute();
const heading = "User Details";
const userData = JSON.parse(localStorage.getItem("user"));
const formValues = reactive({
  id: userData.id,
  userId: userData.userId,
  name: userData.firstName,
  assets: ["Mouse", "Keyboard"],
});

const { id } = route.params;

const isLoading = ref(false);
const error = ref(null);

async function fetchTicketData() {
  isLoading.value = true;
  try {
    const getAllAssetsRes = await getAllAssets();
    console.log("getAllAssetsRes", getAllAssetsRes);
    if (getAllAssetsRes.data.success) {
      options.value = getAllAssetsRes.data.data;
    } else {
      error.value =
        getAllAssetsRes.data.message ||
        getAllAssetsRes.data.error ||
        "Something went wrong, Please try again later";
    }
  } catch (error) {
    error.value = error.message || "Error fetching user data";
  } finally {
    isLoading.value = false;
  }
}
fetchTicketData();

async function onSubmitHandler(e) {
  e.preventDefault();
  const selectedV = value.value;
  console.log("VAL", selectedV);
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
    <div
      class="container-lg d-flex flex-column align-items-center row-gap-3 mb-5"
    >
      <div>
        <h1>{{ heading }}</h1>
      </div>
      <form
        class="p-3 w-100 d-flex flex-column row-gap-2 shadow-lg text"
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
          <label class="form-label" for="userId">Assets:</label>
          <input
            class="form-control"
            id="assets"
            name="assets"
            v-model="formValues.assets"
            v-bind:disabled="true"
          />
        </div>
        <div>
          <label class="form-label" for="userId">Add assets:</label>
          <Multiselect
            v-model="value"
            tag-placeholder="Add this as new tag"
            placeholder="Search & add asset"
            label="assetId"
            track-by="id"
            :options="options"
            :multiple="true"
            :close-on-select="false"
            :taggable="false"
          ></Multiselect>
        </div>
        <button type="submit">Submit</button>
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
.text {
  border: 1px solid red;
  height: 800px;
}
</style>
