<script setup>
import { getAllTicket } from "@/composables/ticketApis";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import userData from "../mockData/userDetails.json";
import { useGetTicketList } from "@/composables/useGetTicketList";

let router = useRouter();
const heading = "Tickets List";
const {
  data: ticketList,
  isLoading,
  error,
  getTicketList,
} = useGetTicketList();

getTicketList({ userId: userData.userId }).then(() => {
  console.log("data", ticketList.value);
});

function viewDetails(ticketId) {
  router.push({ name: "ticket-details", params: { id: ticketId } });
}

const handleCreateTicket = () => {
  router.push({ name: "create-ticket" });
};

const handleAllUsers = () => {
  router.push({ name: "user-list" });
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
        <div class="d-flex gap-2">
          <button class="btn btn-primary" @click="handleAllUsers">
            All Users
          </button>
          <button class="btn btn-primary" @click="handleCreateTicket">
            Create ticket
          </button>
        </div>
      </div>
      <table class="table table-striped text-center border">
        <thead class="border-bottom border-black">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Severity</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in ticketList" :key="ticket.id">
            <td>{{ ticket.id }}</td>
            <td>{{ ticket.title }}</td>
            <td>{{ ticket.category }}</td>
            <td>{{ ticket.severity }}</td>
            <td>{{ ticket.status }}</td>

            <td>
              <button class="btn btn-primary" @click="viewDetails(ticket.id)">
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
