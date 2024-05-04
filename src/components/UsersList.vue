<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGetUserList } from "@/composables/useUserList";

let router = useRouter();
const heading = "Users List";

const { data: usersList, isLoading, error, getUserList } = useGetUserList();

getUserList();

const handleViewUserDetails = (user) => {
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
