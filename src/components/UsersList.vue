<script setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { computed, reactive, ref, watch } from "vue";
import categoriesJson from "../mockData/categories.json";

import userDataJson from "../mockData/userDetails.json";
import { useRouter } from "vue-router";
import { getAllUsers } from "@/composables/ticketApis";

let router = useRouter();
const heading = "Users List";
const error = ref(null);
const usersList = ref([]);
const selectedUser = ref(null);
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
    error.value = error.message || "Error fetching user data";
  } finally {
    isLoading.value = false;
  }
}

fetchData();

const handleViewUserDetails = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  router.push({ name: "user-details", params: { id: user.id } });
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
    <div class="container-xxl p-5 formContainer">
      <div class="mb-5 d-flex justify-content-between">
        <h1>{{ heading }}</h1>
        <!-- <button class="btn btn-primary" @click="handleViewUserDetails">
          Create user
        </button> -->
      </div>

      <table class="table table-striped text-center border">
        <thead class="border-bottom border-black">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">UserId</th>
            <th scope="col">Name</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usersList" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.userId }}</td>
            <td>{{ user.firstName }}</td>

            <td>
              <button
                class="btn btn-primary"
                @click="handleViewUserDetails(user)"
              >
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
