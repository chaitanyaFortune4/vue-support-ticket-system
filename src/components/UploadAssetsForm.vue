<script setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive, ref, watch } from "vue";
import categoriesJson from "../mockData/categories.json";
import {
  bulkAllocateAsset,
  createTicket,
  getAllAssets,
  getAllUsers,
} from "@/composables/ticketApis";
import userDataJson from "../mockData/userDetails.json";
import Papa from "papaparse";

const heading = "Upload Assets";
const error = ref(null);
const uploadedFileName = ref("");
const fileData = ref([]);
const isLoading = ref(false);

const transformDataForAPI = (fileData) => {
  const groupedData = {};
  for (let i = 1; i < fileData.length; i++) {
    const entry = fileData[i];
    const { UserId, Name, AssetId } = entry;
    if (!groupedData[UserId]) {
      groupedData[UserId] = {
        userId: UserId,
        assetNames: [],
      };
    }
    groupedData[UserId].assetNames.push(AssetId);
  }
  return Object.values(groupedData);
};

const handleBulkSubmit = async (e) => {
  e.preventDefault();
  isLoading.value = true;
  try {
    const formattedData = transformDataForAPI(fileData.value);
    console.log("Data to send to API:", formattedData);
    const payload = {
      allocationData: formattedData,
    };
    const bulkAllocateAssetRes = await bulkAllocateAsset(payload);
    console.log("bulkAllocateAssetRes", bulkAllocateAssetRes);
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading.value = false;
  }
};

function handleBulkUpload() {
  // Trigger file input click when "Upload CSV file" button is clicked
  const fileInput = fileInputRef.value;
  if (fileInput) {
    fileInput.click();
  }
}

const fileInputRef = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (!file) return;
  uploadedFileName.value = file.name;
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    // transformHeader: (header) => {
    //   return header.toLowerCase();
    // },
    complete: (results) => {
      console.log("Parsed CSV data:", results.data);
      // Handle the parsed CSV data here
      fileData.value = results.data;
    },
    error: (error) => {
      console.error("CSV parsing error:", error);
      // Handle parsing error
    },
  });
};
</script>

<template>
  <div
    class="container-xxl d-flex flex-column align-items-center row-gap-3 formContainer"
  >
    <div>
      <h1>{{ heading }}</h1>
    </div>
    <div class="w-100">
      <div class="mb-2">Bulk Upload using CSV file</div>
      <div class="w-100 d-flex gap-3">
        <div class="d-flex align-items-center gap-1">
          <button class="btn btn-outline-primary" @click="handleBulkUpload">
            Browse CSV file
          </button>
          <div>
            {{ uploadedFileName }}
          </div>
          <input
            type="file"
            ref="fileInputRef"
            style="display: none"
            accept=".csv"
            @change="handleFileChange"
          />
        </div>
        <div>
          <button
            class="btn btn-primary"
            :disabled="!uploadedFileName || isLoading"
            @click="handleBulkSubmit"
          >
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
