<script setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, ref, watch } from "vue";
import categoriesJson from "../mockData/categories.json";
// import { createTicket } from "@/composables/ticketApis";
import userDataJson from "../mockData/userDetails.json";
import { useCreateTicket } from "@/composables/useCreateTicket";
import { toast } from "vue3-toastify";

const heading = "Support Ticket Form";
const { data, isLoading, error, createTicket } = useCreateTicket();

const initialFormState = {
  userId: userDataJson.userId,
  title: "",
  description: "",
  severity: "",
  category: "",
  subCategory: "",
  assetId: "",
};

const formValues = reactive({ ...initialFormState });
const resetForm = () => {
  Object.assign(formValues, initialFormState);
};

const rules = {
  title: { required },
  description: { required },
  severity: { required },
  category: { required },
  subCategory: { required },
};
const v$ = useVuelidate(rules, formValues);

const severityLevels = categoriesJson.severity;
const assets = userDataJson.assets;
const categories = ref([]);
const subCategories = ref([]);

watch(
  () => formValues.severity,
  (newValue) => {
    const selectedSeverity = severityLevels.find(
      (severity) => severity.name === newValue
    );
    if (selectedSeverity) {
      categories.value = selectedSeverity.categories;
      formValues.category = "";
      formValues.subCategory = "";
    }
  }
);

watch(
  () => formValues.category,
  (newValue) => {
    const selectedCategory = categories.value.find(
      (category) => category.name === newValue
    );
    if (selectedCategory) {
      subCategories.value = selectedCategory.subCategories;
      formValues.subCategory = "";
    }
  }
);

const onSubmitHandler = async (e) => {
  e.preventDefault();
  await createTicket(formValues);
  console.log("data", data.value.success);
  toast.success(`${data.value.message}`);
  resetForm();
};
</script>

<template>
  <div
    class="container d-flex flex-column align-items-center row-gap-3 formContainer"
  >
    <div>
      <h1>{{ heading }}</h1>
    </div>
    <form
      class="p-3 w-100 d-flex flex-column row-gap-2 shadow-lg"
      v-on:submit="onSubmitHandler"
    >
      <div>
        <label class="form-label" for="title">Title:</label>
        <input
          class="form-control"
          type="text"
          id="title"
          name="title"
          v-model="formValues.title"
        />
        <span class="font" v-if="v$.title.$error">Title is required</span>
      </div>

      <div>
        <label class="form-label" for="description">Description:</label>
        <textarea
          class="form-control"
          id="description"
          name="description"
          rows="4"
          v-model="formValues.description"
        >
        </textarea>
        <span class="font" v-if="v$.description.$error"
          >Description is required</span
        >
      </div>

      <div>
        <label class="form-label" for="severity">Severity:</label>
        <select class="form-select" id="severity" v-model="formValues.severity">
          <option disabled value="">Please select one</option>
          <option
            v-for="severityLevel in severityLevels"
            :key="severityLevel.name"
          >
            {{ severityLevel.name }}
          </option>
        </select>
        <span class="font" v-if="v$.severity.$error">Severity is required</span>
      </div>

      <div>
        <label class="form-label" for="category">Category:</label>
        <select class="form-select" id="category" v-model="formValues.category">
          <option disabled value="">Please select one</option>
          <option v-for="category in categories" :key="category.name">
            {{ category.name }}
          </option>
        </select>
        <span class="font" v-if="v$.category.$error">Category is required</span>
      </div>

      <div>
        <label class="form-label" for="subCategory">Sub-Category:</label>
        <select
          class="form-select"
          id="subCategory"
          v-model="formValues.subCategory"
        >
          <option disabled value="">Please select one</option>
          <option v-for="subCategory in subCategories" :key="subCategory">
            {{ subCategory }}
          </option>
        </select>
        <span class="font" v-if="v$.subCategory.$error"
          >Sub-Category is required</span
        >
      </div>

      <div>
        <label class="form-label" for="title">Asset-Id:</label>
        <select class="form-select" id="assetId" v-model="formValues.assetId">
          <option disabled value="">Please select one</option>
          <option v-for="asset in assets" :key="asset.assetId">
            {{ asset.assetId }}
          </option>
        </select>
        <!-- <span class="font" v-if="v$.title.$error">Title is required</span> -->
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        <span
          v-if="isLoading"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Create
      </button>
    </form>
  </div>
</template>

<style scoped>
.formContainer {
  /* border: 1px solid red; */
  max-width: 500px;
}
.font {
  color: red;
}
</style>
