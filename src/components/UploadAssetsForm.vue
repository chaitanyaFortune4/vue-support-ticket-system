<script setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive, ref, watch } from "vue";
import categoriesJson from "../mockData/categories.json";
import { createTicket, getAllUsers } from "@/composables/ticketApis";
import userDataJson from "../mockData/userDetails.json";
import Papa from "papaparse";

const heading = "Upload Assets";
const formValues = reactive({
  name: "",
  id: "",
  assets: [],
});
const error = ref(null);
const usersList = ref([]);
const showUserList = ref(false);
const selectedUser = ref(null);
const uploadedFileName = ref("");
const fileData = ref([]);
const isLoading = ref(false);

async function fetchData() {
  isLoading.value = true;
  try {
    const getAllUsersRes = await getAllUsers();
    console.log("getAllUsersRes", getAllUsersRes);
    if (getAllUsersRes.data.success) {
      usersList.value = getAllUsersRes.data.data;
    } else {
      error.value =
        getAllUsersRes.data.message ||
        getAllUsersRes.data.error ||
        "Something went wrong, Please try again later";
    }
  } catch (error) {
    error.value = error.message || "Error fetching ticket data";
  } finally {
    isLoading.value = false;
  }
}

fetchData();

const transformDataForAPI = (fileData) => {
  const groupedData = {};
  fileData.forEach((entry) => {
    console.log("ENTRY", entry);
    const { UserId, Name, AssetId } = entry;
    if (!groupedData[Name]) {
      groupedData[Name] = {
        userId: UserId,
        name: Name,
        assetsId: [],
      };
    }
    groupedData[Name].assetsId.push(AssetId);
  });

  return Object.values(groupedData);
};
async function handleBulkSubmit(e) {
  e.preventDefault();
  const formattedData = transformDataForAPI(fileData.value);
  console.log("Data to send to API:", formattedData);
}

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

const handleInputName = (e) => {
  console.log("here", selectedUser.value);
  // const selectedUser = e.target.value;
  formValues.name = selectedUser.value.firstName;
  formValues.id = selectedUser.value.id;
  console.log("FV", formValues.name);
};

const handleSelectUser = (user) => {
  console.log("USEr", user);
  formValues.name = user.firstName;
  formValues.id = user.userId;
  // showUserList.value = false;
};

const filteredUsers = computed(() => {
  console.log("here");
  // showUserList.value = true;
  const text = formValues.name.toLowerCase();
  return usersList.value.filter((user) => {
    const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
    return fullName.includes(text);
  });
});
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
            :disabled="!uploadedFileName"
            @click="handleBulkSubmit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    <div style="border: 1px solid black; width: 100%"></div>
    <div class="w-100">
      <div class="mb-2">Individual upload form</div>

      <div>
        <label class="form-label" for="name">Name:</label>
        <!-- <input
          class="form-control"
          autocomplete="off"
          name="name"
          v-model="formValues.name"
        /> -->
        <!-- <div v-if="formValues.name" style="background-color: grey">
          <div
            v-for="user in filteredUsers"
            :key="user.id"
            class="test"
            @click="() => handleSelectUser(user)"
          >
            {{ user.firstName }} {{ user.lastName }}
          </div>
        </div> -->
        <select
          class="form-select"
          id="name"
          v-model="selectedUser"
          @change="handleInputName"
        >
          <option disabled value="">Please select one</option>
          <option v-for="user in usersList" :key="user.id" :value="user">
            {{ user.firstName + user.lastName }}
          </option>
        </select>
      </div>

      <div>
        <label class="form-label" for="userId">Id:</label>
        <input
          class="form-control"
          autocomplete="off"
          name="userId"
          v-model="formValues.id"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.test:hover {
  border: 1px solid black;
}
</style>
