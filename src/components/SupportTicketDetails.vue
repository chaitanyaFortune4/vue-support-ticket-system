<script setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, ref, watch } from "vue";
import categoriesJson from "../mockData/categories.json";

const heading = "Ticket Details";
const formValues = reactive({
  title: "Keyboard not working",
  description: "Keyboard some buttons not working ",
  severity: "Very High",
  category: "Hardware",
  subCategory: "keyboard",
  rootCause: "",
  approvalFor: "",
  remarks: "",
});

// const rules = {
//   title: { required },
//   description: { required },
//   severity: { required },
//   category: { required },
//   subCategory: { required },
// };

// const v$ = useVuelidate(rules, formValues);

// const severityLevels = categoriesJson.severity;
// const categories = ref([]);
// const subCategories = ref([]);

// watch(
//   () => formValues.severity,
//   (newValue, oldValue) => {
//     const selectedSeverity = severityLevels.find(
//       (severity) => severity.name === newValue
//     );
//     if (selectedSeverity) {
//       categories.value = selectedSeverity.categories;
//       formValues.category = ""; // Reset category on severity change
//       formValues.subCategory = ""; // Reset subcategory on severity change
//     }
//   }
// );

// watch(
//   () => formValues.category,
//   (newValue, oldValue) => {
//     const selectedCategory = categories.value.find(
//       (category) => category.name === newValue
//     );
//     if (selectedCategory) {
//       subCategories.value = selectedCategory.subCategories;
//       formValues.subCategory = ""; // Reset subcategory on category change
//     }
//   }
// );

async function onSubmitHandler(e) {
  e.preventDefault();
  // const isFormValid = await v$.value.$validate();

  // if (!isFormValid) {
  //   return;
  // }
  // console.log("Data", formValues);
}
</script>

<template>
  <div class="container-lg d-flex flex-column align-items-center row-gap-3">
    <div>
      <h1>{{ heading }}</h1>
    </div>
    <form
      class="p-3 w-100 d-flex flex-column row-gap-2 shadow-lg"
      v-on:submit="onSubmitHandler"
    >
      <div class="d-flex justify-content-end">
        <!-- <input
          class="form-control"
          type="text"
          id="title"
          name="title"
          v-model="formValues.title"
          v-bind:disabled="true"
        /> -->
        <button class="btn btn-danger">Open</button>
      </div>
      <div>
        <label class="form-label" for="title">Title:</label>
        <input
          class="form-control"
          type="text"
          id="title"
          name="title"
          v-model="formValues.title"
          v-bind:disabled="true"
        />
      </div>

      <div>
        <label class="form-label" for="description">Description:</label>
        <textarea
          class="form-control"
          id="description"
          name="description"
          rows="4"
          v-model="formValues.description"
          v-bind:disabled="true"
        >
        </textarea>
      </div>

      <div>
        <label class="form-label" for="severity">Severity:</label>
        <input
          class="form-control"
          type="text"
          id="severity"
          name="severity"
          v-model="formValues.severity"
          v-bind:disabled="true"
        />
      </div>

      <div>
        <label class="form-label" for="category">Category:</label>
        <input
          class="form-control"
          type="text"
          id="category"
          name="category"
          v-model="formValues.category"
          v-bind:disabled="true"
        />
      </div>

      <div>
        <label class="form-label" for="subCategory">Sub-Category:</label>
        <input
          class="form-control"
          type="text"
          id="subCategory"
          name="subCategory"
          v-model="formValues.subCategory"
          v-bind:disabled="true"
        />
      </div>

      <div>
        <label class="form-label" for="rootCause">Root Cause:</label>
        <textarea
          class="form-control"
          type="text"
          id="rootCause"
          name="rootCause"
          rows="2"
          v-model="formValues.rootCause"
        ></textarea>
      </div>

      <div>
        <label class="form-label" for="rootCause">Approval for:</label>
        <input
          class="form-control"
          type="text"
          id="approvalFor"
          name="approvalFor"
          v-model="formValues.approvalFor"
        />
      </div>
      <div>
        <label class="form-label" for="rootCause">Remarks:</label>
        <textarea
          class="form-control"
          type="text"
          id="remarks"
          name="remarks"
          rows="2"
          v-model="formValues.remarks"
        ></textarea>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="me-2 btn btn-primary">
          Submit for approval
        </button>
        <button type="submit" class="btn btn-primary">Close ticket</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.formContainer {
  /* border: 1px solid red; */
  max-width: 500px;
}
</style>
