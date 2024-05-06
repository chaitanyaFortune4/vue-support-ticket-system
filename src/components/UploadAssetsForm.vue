<script setup>
import { ref } from "vue";
import Papa from "papaparse";
import { useBulkUploadAssets } from "@/composables/useBulkUploadAssets";

const heading = "Upload Assets";
const uploadedFileName = ref("");
const fileData = ref([]);
const fileInputRef = ref(null);

const { data, isLoading, error, bulkUploadAssets } = useBulkUploadAssets();

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

const handleBulkUpload = () => {
  const fileInput = fileInputRef.value;
  if (fileInput) {
    fileInput.click();
  }
};

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

const handleBulkSubmit = async (e) => {
  e.preventDefault();
  const formattedData = transformDataForAPI(fileData.value);
  console.log("Data to send to API:", formattedData);
  const payload = {
    allocationData: formattedData,
  };

  bulkUploadAssets(payload).then(() => {
    console.log("bulkUploadAssets", data.value);
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
