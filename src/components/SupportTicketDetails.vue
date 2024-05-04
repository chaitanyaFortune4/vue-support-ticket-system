<script setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { reactive, ref, watch } from "vue";
import categoriesJson from "../mockData/categories.json";
import { useRoute, useRouter } from "vue-router";
import {
  getTicketByTicketId,
  submitTicketApproval,
} from "@/composables/ticketApis";
import userDataJson from "../mockData/userDetails.json";
import { useGetTicketDetails } from "@/composables/useGetTicketDetails";
import { useUpdateTicket } from "@/composables/useUpdateTicket";

const heading = "Ticket Details";

let router = useRouter();
let route = useRoute();
let { id } = route.params;

const isBtnLoadingWrapper = ref(false);
const isApprovalBtnLoading = ref(false);
const isCloseTicketBtnLoading = ref(false);

const formValues = reactive({
  title: "",
  description: "",
  severity: "",
  category: "",
  subCategory: "",
  assetId: "",
  rootCause: "",
  approvalFor: "",
  remarks: "",
  status: "",
});

const { data, isLoading, error, getTicketDetails } = useGetTicketDetails();
const {
  data: updateTicketData,
  isLoading: updateTicketIsLoading,
  error: updateTicketError,
  updateTicket,
} = useUpdateTicket();

getTicketDetails({ id: id, userId: userDataJson.userId }).then(() => {
  console.log("data", data.value);
  ({
    title: formValues.title,
    description: formValues.description,
    severity: formValues.severity,
    category: formValues.category,
    subCategory: formValues.subCategory,
    assetId: formValues.assetId,
    rootCause: formValues.rootCause,
    approvalFor: formValues.approvalFor,
    remarks: formValues.remarks,
    status: formValues.status,
    assignedTo: formValues.assignedTo,
    createdBy: formValues.createdBy,
    userId: formValues.userId,
  } = data.value);
});

const onSubmitHandler = async (e) => {
  e.preventDefault();
  isBtnLoadingWrapper.value = true; // disable both buttons
  console.log("event", e.submitter.name);

  if (e.submitter.name === "approvalBtn") {
    isApprovalBtnLoading.value = true;
  } else {
    isCloseTicketBtnLoading.value = true;
  }

  const payload = {
    id: id,
    createdBy: formValues.createdBy,
    userId: formValues.userId,
    rootCause: formValues.rootCause,
    approvalFor: formValues.approvalFor,
    remarks: formValues.remarks,
    closeTicket: isCloseTicketBtnLoading.value,
  };

  updateTicket(payload).then(() => {
    if (updateTicketData.value.success) {
      alert(`${updateTicketData.value.message}`);
      isBtnLoadingWrapper.value = false;
      isApprovalBtnLoading.value = false;
      isCloseTicketBtnLoading.value = false;
    }
  });
};
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
        class="p-3 w-100 d-flex flex-column row-gap-2 shadow-lg"
        v-on:submit="onSubmitHandler"
      >
        <div class="d-flex justify-content-end">
          <div
            class="badge rounded-pill customStatus"
            :class="
              formValues.status === 'Closed'
                ? 'text-bg-danger'
                : 'text-bg-warning'
            "
          >
            {{ formValues.status }}
          </div>
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
          <label class="form-label" for="assetId">Asset-Id:</label>
          <input
            class="form-control"
            type="text"
            id="assetId"
            name="assetId"
            v-model="formValues.assetId"
            v-bind:disabled="true"
          />
        </div>

        <template v-if="formValues.assignedTo === userDataJson.userId">
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
            <button
              type="submit"
              name="approvalBtn"
              class="me-2 btn btn-primary"
              :disabled="isBtnLoadingWrapper"
            >
              <span
                v-if="isApprovalBtnLoading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Submit for approval
            </button>

            <button
              type="submit"
              name="closeBtn"
              class="btn btn-primary"
              :disabled="isBtnLoadingWrapper"
            >
              <span
                v-if="isCloseTicketBtnLoading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Close ticket
            </button>
          </div>
        </template>
      </form>
    </div>
  </div>
</template>

<style scoped>
.customStatus {
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
