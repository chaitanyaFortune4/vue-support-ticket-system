<script setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, ref, watch } from "vue";
import categoriesJson from "../mockData/categories.json";

const heading = "Support Ticket Form";
const formValues = reactive({
  title: "",
  description: "",
  severity: "",
  category: "",
  subCategory: "",
});

const rules = {
  title: { required },
  description: { required },
  severity: { required },
  category: { required },
  subCategory: { required },
};

const v$ = useVuelidate(rules, formValues);

const severityLevels = categoriesJson.severity;
const categories = ref([]);
const subCategories = ref([]);

watch(
  () => formValues.severity,
  (newValue, oldValue) => {
    const selectedSeverity = severityLevels.find(
      (severity) => severity.name === newValue
    );
    if (selectedSeverity) {
      categories.value = selectedSeverity.categories;
      formValues.category = ""; // Reset category on severity change
      formValues.subCategory = ""; // Reset subcategory on severity change
    }
  }
);

watch(
  () => formValues.category,
  (newValue, oldValue) => {
    const selectedCategory = categories.value.find(
      (category) => category.name === newValue
    );
    if (selectedCategory) {
      subCategories.value = selectedCategory.subCategories;
      formValues.subCategory = ""; // Reset subcategory on category change
    }
  }
);

async function onSubmitHandler(e) {
  e.preventDefault();
  const isFormValid = await v$.value.$validate();

  if (!isFormValid) {
    return;
  }
  console.log("Data", formValues);
}
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

      <button type="submit" class="btn btn-primary">Create</button>
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
